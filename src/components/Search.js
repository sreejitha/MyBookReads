import React, { Component } from 'react';
import Books from './Books'
import '../App.css'
import * as BooksAPI from './BooksAPI'
class Search extends Component {
  state = {
    query: '',
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }



  updateShelfFromSearch= (book, newShelf, prevShelf)=> {
    console.log("Inside updateShelfFromSearch")
    if(this.props.onShelfChange)
    {
      this.props.onShelfChange(book, newShelf, prevShelf);
    }
  }
  render() {
    let filteredBooks
    const { query } = this.state
    var list = this.props.bookList;
    if (query)
    {
      filteredBooks = BooksAPI.search(query).then((b)=>{b.map()});
      console.log("after search:" + filteredBooks)
    }
    else {
      filteredBooks = list
    }
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close it please!</button>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
         <Books onChangeBookCategory= {(book, newShelf, prevShelf)=>{
             this.updateShelfFromSearch(book, newShelf, prevShelf)
           }
         }
          bookList={filteredBooks}/>
        </div>
      </div>
    );
  }
}

export default Search
