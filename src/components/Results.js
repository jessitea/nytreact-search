import React from 'react';

//functional component, displays search results, passed from Parent/Main component and calls 'saveSearch' function passed from Parent to allow articles to save to database
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