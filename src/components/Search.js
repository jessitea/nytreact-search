import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import Results from './Results';
import Saved from './Saved';
const newState = {};


//class component to perform searches for NYT articles
class Search extends React.Component{
		constructor(){
			super();

			this.state = {
				topic: "",
				sYear: "",
				eYear: ""
			} 	

		}

	//sets state of data put in input fields
	handleChange = (event) => {
		
		newState[event.target.id] = event.target.value;
		this.setState(
			newState
		);

	}

	
	//creates display of search form on page
	render(){

		return(
				<div>
				
					<form>
						<FormGroup>
						  
						 <ControlLabel>Topic</ControlLabel>
						  <FormControl id="topic" type="text" value={this.state.topic} onChange={this.handleChange} />

						<ControlLabel>Start Year</ControlLabel>
						  <FormControl type="text" id="sYear" value={this.state.sYear} placeholder="Format: YYYY" onChange={this.handleChange} />

						<ControlLabel>End Year</ControlLabel>
						  <FormControl type="text" id="eYear" value={this.state.eYear} placeholder="Format: YYYY" onChange={this.handleChange} />
						  <FormControl.Feedback />


						  {/* 'Link' and 'Route' are used from react-router-dom package to link to different components and have them render on a single page */}
						  <Button type="submit" className="btn btn-default" onClick={(event) => this.props.handleSubmit(event, this.state.topic, this.state.sYear, this.state.eYear)}>
						  		<Link to="/search">Submit</Link>
						  </Button>

						  <Button type="button" className="btn btn-default"><Link to="/savedArticles">Saved Articles</Link></Button>
							<Route exact path="/savedArticles" component={Saved} />

						  <Route exact path="/search" render={()=> <Results searchResults={this.props.searchResults} saveSearch={this.props.saveSearch} />} />

						  </FormGroup>
						</form>
						
				</div>

			)

	}

}

export default Search;