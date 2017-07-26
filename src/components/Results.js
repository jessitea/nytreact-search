//this is a functional component, it doesn't have state, it is a regular function that 
//returns something

//THIS IS WORKING
import React from 'react';

const Results = (props) => {
    const articles = props.searchResults;
    const listArticles = articles.map((article, i) =>
    	
        <div id={i} key={article.title + i} className="results">
	        <a href={article.url} target="_blank">{article.title}</a>
	        <button type="button" onClick={(event) => props.saveSearch(event, {i})}>Save</button>
        </div>
       

        );

     return(

       <div>
      	<h1>RESULTS</h1>
       {listArticles}
       </div>
      );


    }

export default Results;