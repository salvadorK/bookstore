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
  url,
  {
    useNewUrlParser: true
  },
  (err, db) => {
    dbo = db.db("alibay");
  }
);
app.post("/sign-up", upload.none(), (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne(
    {
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
  dbo.collection("users").findOne(
    {
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
  let quantity = req.body.quantity;
  let price = req.body.price;
  let ISBN = req.body.isbn;
  let file = req.file;
  let img = "/uploads/" + file.filename;
  let username = sessions[sessionId];
  dbo.collection("book-data").insertOne({
    booktitle,
    description,
    quantity,
    ISBN,
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
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  let id = req.body.id.toString();
  let img = req.body.img;
  let booktitle = req.body.booktitle;
  let price = req.body.price;
  dbo.collection("purchase").findOne(
    {
      username: username
    },
    (err, purc) => {
      if (purc.booktitle === booktitle) {
        dbo.collection("purchase").updateOne(
          {
            _id: ObjectID(id)
          },
          {
            $set: {
              qty: purc.qty + 1
            }
          }
        );
        return;
      }
      dbo.collection("purchase").insertOne({
        username,
        booktitle,
        img,
        price,
        quantity: 1
      });
    }
  );
  res.send(
    JSON.stringify({
      success: true
    })
  );
});

app.post("/save-stripe-token", upload.none(), (req, res) => {
  let token = req.body.token;
  res.send(JSON.stringify(token));
  // dbo.collection("card-purchase").insertOne({
  //     test
  // })
  // dbo.collection("card-purchase").find({}).toArray((err, card) => {
  //     res.send(JSON.stringify(card))
  // })
});
app.get("/user-prepurchase", (req, res) => {
  // let sessionId = req.cookies.sid
  // let username = sessions[sessionId]
  dbo
    .collection("purchase")
    .find({})
    .toArray((err, results) => {
      res.send(JSON.stringify(results));
    });
});
app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
