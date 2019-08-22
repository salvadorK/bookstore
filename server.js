let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({
    dest: __dirname + "/uploads/"
});
let sha1 = require("sha1");
let cookieParser = require("cookie-parser");
let sessions = {};
reloadMagic(app);

app.use(cookieParser());
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public")); // Needed for local assets

let dbo = undefined;
let url =
    "mongodb+srv://karlchikc:bobsuekc01@alibay-7bioh.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(
    url, {
        useNewUrlParser: true
    },
    (err, db) => {
        dbo = db.db("alibay");
    }
);
app.get("/get-cookie", (req, res) => {
    console.log(req.cookies.sid)
    console.log(sessions)
    if (sessions[req.cookies.sid]) {
        res.send(JSON.stringify({
            success: true,
            username: sessions[req.cookies.sid]
        }))
        return
    }
    res.send(JSON.stringify({
        success: false
    }))
})
app.post("/sign-up", upload.none(), (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    dbo.collection("users").findOne({
            username
        },
        (err, user) => {
            if (user) {
                res.send(
                    JSON.stringify({
                        success: false
                    })
                );

                return;
            }
            dbo.collection("users").insertOne({
                username,
                password: sha1(password)
            });
            res.send(
                JSON.stringify({
                    success: true
                })
            );
        }
    );
});
app.post("/login", upload.none(), (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    dbo.collection("users").findOne({
            username: username
        },
        (err, user) => {
            if (err) {
                console.log("/login error", err);
                res.send(
                    JSON.stringify({
                        success: false
                    })
                );
                return;
            }
            if (user === null) {
                res.send(
                    JSON.stringify({
                        success: false
                    })
                );
            }
            if (user.password === sha1(password)) {
                let sessionId = "" + Math.floor(Math.random() * 1000000);
                sessions[sessionId] = req.body.username;
                res.cookie("sid", sessionId);
                res.send(
                    JSON.stringify({
                        success: true
                    })
                );
                console.log("session", sessions);
                return;
            }
            res.send(
                JSON.stringify({
                    success: false
                })
            );
        }
    );
});

app.post("/new-post", upload.single("img"), (req, res) => {
    let booktitle = req.body.booktitle;
    let sessionId = req.cookies.sid;
    let description = req.body.description;
    let qty = req.body.qty;
    let price = req.body.price;
    let isbn = req.body.isbn;
    let file = req.file;
    let img = "/uploads/" + file.filename;
    let username = sessions[sessionId];
    dbo.collection("book-data").insertOne({
        booktitle,
        description,
        qty,
        isbn,
        username,
        price,
        img
    });
    res.send(
        JSON.stringify({
            success: true
        })
    );
});
app.get("/all-posts", (req, res) => {
    dbo
        .collection("book-data")
        .find({})
        .toArray((err, bdata) => {
            if (err) {
                console.log("error", err);
                res.send("fail");
                return;
            }

            res.send(JSON.stringify(bdata));
        });
});
app.get("/all-purchase", (req, res) => {
    dbo
        .collection("purchase")
        .find({})
        .toArray((err, purc) => {
            if (err) {
                res.send("fail");
                return;
            }
            res.send(JSON.stringify(purc));
        });
});
app.post("/addcart", upload.none(), (req, res) => {
    let sessionId = req.cookies.sid
    let username = sessions[sessionId]
    let img = req.body.img
    let booktitle = req.body.booktitle
    let price = req.body.price
    let qty = req.body.qty
    let dop = new Date().toLocaleString()
    console.log("TEST", username, booktitle)
    if (username === undefined) {
        res.send(JSON.stringify({
            success: false
        }))
        return
    }
    dbo.collection("purchase").findOne({
        username: username,
        booktitle: booktitle
    }, (err, purc) => {
        if (purc && purc.booktitle === booktitle) {
            dbo.collection("purchase").updateOne({
                booktitle: booktitle,
                username: username
            }, {
                $set: {
                    qty: +purc.qty + 1
                }
            })
            dbo.collection("book-data").updateOne({
                booktitle: booktitle,
            }, {
                $set: {
                    qty: +qty - 1
                }
            })
            res.send(JSON.stringify({
                success: true
            }))
            return
        }
        dbo.collection("purchase").insertOne({
            username,
            booktitle,
            img,
            price: +price,
            qty: 1,
            DOP: dop,
            reviews: []
        })
        dbo.collection("book-data").updateOne({
            booktitle: booktitle
        }, {
            $set: {
                qty: +qty - 1
            }
        })
        res.send(JSON.stringify({
            success: true
        }))

    })
})

app.post("/save-stripe-token", upload.none(), (req, res) => {
    let token = req.body.token;
    let sessionId = req.cookies.sid
    let username = sessions[sessionId]
    dbo.collection("purchase").updateMany({
        username
    }, {
        $set: {
            username: "post" + username
        }
    }, function (err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " document(s) updated");
    })
    res.send(JSON.stringify(token));
    // dbo.collection("card-purchase").insertOne({
    //     test
    // })
    // dbo.collection("card-purchase").find({}).toArray((err, card) => {
    //     res.send(JSON.stringify(card))
    // })
});
app.get("/user-prepurchase", (req, res) => {
    let sessionId = req.cookies.sid
    let username = sessions[sessionId]

    dbo
        .collection("purchase").find({}).toArray(function (err, results) {
            if (username) {
                let books = results.filter(x => (x.username === username))
                res.send(JSON.stringify(books))
                return
            }
            res.send([])
        })
    // .findOne({
    //     username
    // }, (err, results) => {
    //     if (err) {
    //         throw err;
    //     } else if (results) {
    //         res.send(JSON.stringify(results));
    //     } else {
    //         res.send(JSON.stringify(
    //             false
    //         ))
    //     }
    // });
});
app.post("/updatepurchase", upload.none(), (req, res) => {
    let sessionId = req.cookies.sid
    let username = sessions[sessionId]
    let booktitle = req.body.booktitle
    let qty = req.body.qty
    dbo.collection("purchase").findOne({
        username: username,
        booktitle: booktitle
    }, (err, purc) => {
        if (purc && purc.booktitle === booktitle) {
            dbo.collection("purchase").updateOne({
                booktitle: booktitle,
                username: username
            }, {
                $set: {
                    qty: +qty
                }
            })
            dbo.collection("book-data").findOne({
                booktitle
            }, (err, bdata) => {
                console.log("bdata quantity", bdata.qty)
                dbo.collection("book-data").updateOne({
                    booktitle: booktitle
                }, {
                    $set: {
                        qty: +bdata.qty - 1
                    }
                })
            })

        }
    })
})
app.post("/decpurchase", upload.none(), (req, res) => {
    let sessionId = req.cookies.sid
    let username = sessions[sessionId]
    let booktitle = req.body.booktitle
    let qty = req.body.qty
    dbo.collection("purchase").findOne({
        username: username,
        booktitle: booktitle
    }, (err, purc) => {
        if (purc && purc.booktitle === booktitle) {
            dbo.collection("purchase").updateOne({
                booktitle: booktitle,
                username: username
            }, {
                $set: {
                    qty: +qty
                }
            })
            dbo.collection("book-data").findOne({
                booktitle
            }, (err, bdata) => {
                dbo.collection("book-data").updateOne({
                    booktitle: booktitle
                }, {
                    $set: {
                        qty: +bdata.qty + 1
                    }
                })
            })

        }
    })
})
app.post("/deleteOne", upload.none(), (req, res) => {
    let sessionId = req.cookies.sid
    let username = sessions[sessionId]
    let booktitle = req.body.booktitle
    dbo.collection("purchase").deleteOne({
        username,
        booktitle
    }, (err, obj) => {

    })
})
app.post("/clear", upload.none(), (req, res) => {
    let sessionId = req.cookies.sid
    let username = sessions[sessionId]
    dbo.collection("purchase").deleteMany({
        username
    })
})
app.post("/makeReview", upload.none(), (req, res) => {
    let sessionId = req.cookies.sid
    let username = sessions[sessionId]
    let reviews = req.body.reviews
    let booktitle = req.body.booktitle
    dbo.collection("book-data").update({
        booktitle: booktitle
    }, {
        $push: {
            reviews: {
                username: username,
                reviews: reviews
            }
        }
    })
})

app.get("/logout", (req, res) => {
    let sessionId = req.cookies.sid
    delete sessions[sessionId]
    console.log(sessions)
    res.send(JSON.stringify({
        success: true
    }))
})

app.all("/*", (req, res, next) => {
    // needed for react router
    res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
    console.log("Server running on port 4000");
});