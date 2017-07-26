var express = require ("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Article = require("./models/Article");

var app = express();

var PORT = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("build"));

mongoose.connect("mongodb://localhost/reactNYT");
var db = mongoose.connection;

db.on("error", function(err){
	console.log("Mongoose Error: ", err);
});

db.once("open", function(){
	console.log("Mongoose connection successful.");
});

//-----INSERT ROUTES -----
//route to homepage
app.get("/", function(req,res){

	res.sendFile(__dirname + "/build/static/index.html");

});

//route to save a new article
app.post("/save", function(req,res){

	// console.log("REQUEST REQ.BODY: " + req.body.title);

	var savedArticle = new Article(req.body);

	savedArticle.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("It saved!");
		}
	})
});

//route to retrieve saved articles and display it
app.get("/savedArticles", function(req,res){

	Article.find({}).exec(function(err,doc){

		if (err){
			console.log(err);
		}
		else {
			res.send(doc);
		}
	})
});

//route to delete articles
app.post("/delete", function(req, res){

	console.log("DELETE IN SERVER FILE: " + JSON.stringify(req.body));

	Article.remove({"_id": req.body.id}, function(err, doc){

		if(err){
			console.log(err)
		}
		else {
			res.redirect("/savedArticles");
			console.log("Article deleted!");
		}

	})
})

//-----END OF ROUTES -----

app.listen(PORT, function(){
	console.log("App listening on PORT: " + PORT);
});