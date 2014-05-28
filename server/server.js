var express = require("express");
var http = require('http');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/", express.static("app"));
app.use("/app", express.static("app"));
app.use("/test", express.static("test"));

app.set("port", process.env.PORT || 3000);
var server = http.createServer(app);
server.listen(app.get("port"), function() {
    console.log("server listening on port: " + app.get("port"));
});
