import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import '../App.css'
import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    })
  }

  render() {
    let filteredBooks
    const { books } = this.state
    const { query } = this.state
    if (query)
    {
      const match = new RegExp(escapeRegExp(query))
      filteredBooks = books.filter( (book) => (match.test(book.title) || match.test(book.authors) ))
    }
    else {
      filteredBooks = books
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
         <Books onShelfChange= {
          (book, newShelf)=>
          {this.props.updateShelf(book, newShelf, "search")
          }
         }
         bookList={filteredBooks} shelfType="Book Store" shelfVal ="none"/>
        </div>
      </div>
    );
  }
}

export default Search
