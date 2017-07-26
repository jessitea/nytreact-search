import React from 'react';
import Search from './Search';
import helper from '../utils/helper';
// import Results from './Results';
// import Saved from './Saved'; 
// import { Route, Link } from 'react-router-dom';

class Main extends React.Component {
	constructor(){
			super(); //calls the constructor function of 'React.Component' to help override some of the functionality
	
			this.state = {
				searchResults: [],

			}
	}//end of constructor

	handleSubmit = (event, topic, sYear, eYear) => {
		event.preventDefault()
		console.log('Topic: ' + topic);

		helper.searchNews(topic, sYear, eYear)
		.then(results => {
			
			var newResults = [];

			for (let i = 0; i < results.data.response.docs.length; i++){
				var title = results.data.response.docs[i].headline.main;
				var url = results.data.response.docs[i].web_url;
				var date = results.data.response.docs[i].pub_date;

				
				newResults.push({title: title, url: url, date: date});
				
		}

		this.setState({ searchResults: newResults});

		console.log(this.state);

		})
}//end of handleSubmit

	saveSearch = (event, index) => {
		event.preventDefault();
		
		var chosenArticle = this.state.searchResults[index.i];
		// console.log(chosenArticle);

		helper.savedArticle(chosenArticle)
		.then(results => {
			console.log(results)
		})
	}



	componentDidUpdate(prevProps, prevState){

		console.log("Prev state:" + prevState.children);



	}//end of componentDidUpdate


	render(){
		return(//has jsx inside
			<div className="container">

				<div className="jumbotron">
					<h1>NYT React Search</h1>
				</div>

				<div className="row">
					<div className="col-md-12">
						<Search handleSubmit={this.handleSubmit} searchResults={this.state.searchResults} saveSearch={this.saveSearch}/>
						
					</div>
				</div>

				


				<div className="row">
					<div className="col-md-12">
						{/*<Results searchResults={this.state.searchResults} saveSearch={this.saveSearch} />*/}
					</div>
				</div>

			</div>
			);
	}//end of render

}

export default Main;