import helper from '../utils/helper';
import React from 'react';

class Saved extends React.Component {
	constructor(){
		super();

		this.state = {
			savedArticles: []
		}
	}//end of constructor

	
	//displays saved articles after the component mounts
	componentDidMount(){

		helper.loadSavedArt()
		.then(function(response){

			// console.log("RESPONSE FROM SAVED: " + response.data[0].title);
			// console.log("LENGTH " + response.data.length);

			//declare new array of results
			var newResults = [];

			//loops through array of objects from query from database and pushes it to newResults array with key/value pairs
			for (let i = 0; i < response.data.length; i++){
				var id = response.data[i]._id;
				var title = response.data[i].title;
				var url = response.data[i].url;
		
				newResults.push({id: id, title: title, url: url});
				
		}
		// console.log("id: " + id);
		// console.log(this)
		// debugger

		//sets state of saved articles with 'newResults' array
		this.setState({ savedArticles: newResults});

		// console.log(newResults);

			
		}.bind(this))
	}//end of of componentDidMount

	//function that deletes articles with use of helper function
	deleteArticle = (event, id, i) => {
		// console.log("ID FROM DELETED ARTICLE: " + id);
		event.preventDefault();

		//updates state of savedArticle array to delete corresponding article that was deleted from the database
		var updatedArray = this.state.savedArticles.splice(i, 1);
		this.setState({savedArticle: updatedArray});

		//helper function called
		helper.deleteArt(id)
		.then(results => {

			console.log(results);

		})
	}


	render(){

		//goes through each article in 'savedArticles' array and creates a div with delete button
		const sArticles = this.state.savedArticles;
    const listSArticles = sArticles.map((article, i) => 
			(    	
        <div id={article.id} key={article.title} className="results">
	        <a href={article.url} target="_blank">{article.title}</a>

 					<button type="button" onClick={(event) => this.deleteArticle(event, article.id, {i}) }>Delete</button>
        </div>
      )
		);
       
    //what will display on the page
		return(

			<div>
				<h1>SAVED ARTICLES</h1>
					{listSArticles}
					
			</div>

			)
	}

}

export default Saved;