import helper from '../utils/helper';
import React from 'react';

class Saved extends React.Component {
	constructor(){
		super();

		this.state = {
			savedArticles: []
		}
	}//end of constructor

	

	componentDidMount(){

		helper.loadSavedArt()
		.then(function(response){

			// console.log("RESPONSE FROM SAVED: " + response.data[0].title);
			// console.log("LENGTH " + response.data.length);

			var newResults = [];

			for (let i = 0; i < response.data.length; i++){
				var id = response.data[i]._id;
				var title = response.data[i].title;
				var url = response.data[i].url;
		

				
				newResults.push({id: id, title: title, url: url});
				
		}
		// console.log("id: " + id);
		// console.log(this)
		// debugger
		this.setState({ savedArticles: newResults});

		// console.log(newResults);

			
		}.bind(this))
	}//end of of componentDidMount

	deleteArticle = (event, id, i) => {
		console.log("ID FROM DELETED ARTICLE: " + id);
		event.preventDefault();

		var updatedArray = this.state.savedArticles.splice(i, 1);
		this.setState({savedArticle: updatedArray});

		helper.deleteArt(id)
		.then(results => {

			console.log(results);

		})
	}


	render(){
		const sArticles = this.state.savedArticles;
    const listSArticles = sArticles.map((article, i) => 
			(    	
        <div id={article.id} key={article.title} className="results">
	        <a href={article.url} target="_blank">{article.title}</a>

 					<button type="button" onClick={(event) => this.deleteArticle(event, article.id, {i}) }>Delete</button>
        </div>
      )
		);
       

		return(

			<div>
				<h1>SAVED ARTICLES</h1>
					{listSArticles}
					
			</div>

			)
	}

}

export default Saved;