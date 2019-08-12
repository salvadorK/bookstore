let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.unsubscribe("/uploads", express.static("uploads"));
app.use("/", express.static("public")); // Needed for local assets

let dbo = undefined;
let url =
  "mongodb+srv://karlchikc:bobsuekc01@alibay-7bioh.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("alibay");
});
app.post("/sign-up", upload.none(), (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne({ username }, (err, user) => {
    if (user) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    dbo.collection("users").insertOne({ username, password });
    res.send(JSON.stringify({ success: true }));
  });
});
// Your endpoints go after this line

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
