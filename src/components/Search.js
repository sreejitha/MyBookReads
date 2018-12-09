import React, { Component } from 'react';
import Books from './Books'
import '../App.css'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    filteredBooks :[]
  }

  updateQuery = (query) => {
    this.setState({ query})
    if (query)
    {
       BooksAPI.search(query).then((books)=>{
         this.setState({
         filteredBooks : books
         })
      })
    }
    else {
      this.setState({
      filteredBooks : []
      })
    }
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
    console.log("rendering")
    var { filteredBooks } = this.state
    const { query } = this.state
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
           <ol className="books-grid">
                 {Array.isArray(filteredBooks)  && filteredBooks.length > 0 && filteredBooks.map((bk) =>(
                  <Books onChangeBookCategory= {(book, newShelf, prevShelf)=>{
                      this.updateShelfFromSearch(book, newShelf, prevShelf)
                    }}
                   book={bk}/>))
                 }
           </ol>
        </div>
      </div>
    );
  }
}

export default Search
