import axios from 'axios';


const helper = {

	//executes query to nytimes api 
	searchNews: function(topic, sYear, eYear){
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

		return axios.get(
			url, { params: {
		  'api-key': "f9c8aadb932b46b9b24cabe2b55fcc52",
		  'q': topic,
		  'begin_date': sYear + "0101",
		  'end_date': eYear + "0101"
				}
		})

	},

	//helper function that uses route in server.js page to save article
	savedArticle: function(chosenArticle){

		// console.log("CHOSEN ARTICLE IN HELPER" + chosenArticle.title);

			return axios.post("/save", chosenArticle);

	},

	//helper function that uses route in server.js page to load saved article
	loadSavedArt: function() {

			return axios.get("/savedArticles");
	},

	//helper function that uses route in server.js page to delete articles
	deleteArt: function(idPassed) {

			console.log("ID IN HELPER: " + idPassed);

			return axios.post("/delete", {id :idPassed});
	}

}

export default helper;