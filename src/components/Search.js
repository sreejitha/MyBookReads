import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Books from './Books'
import '../App.css'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    filteredBooks :[]
  }

  /*searches for book amongst shelved books and returns the shelf in which
  found*/
  returnShelf = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].title === obj.title) {
            return list[i].shelf;
        }
    }
    return "not found";
  }

  /*
  sets state of query and filteredBooks based on input
  */
  updateQuery = (query) => {
      this.setState({
        query
      })
      this.updateSearchResults(query)
  }
  /*sets state of filtered books based on query*/
  updateSearchResults = (query)=> {
     if (query){

        BooksAPI.search(query).then((books) => {
           if (this.props.shelfBooks) {
             var shelfBooks = this.props.shelfBooks
            for(var i=0; i < books.length; i++)
            {
              /*search for each book in search results in the shelf*/
              var shelf = this.returnShelf(books[i], shelfBooks);
              /*if found add shelf property to the book in search results*/
              if(shelf !== "not found")
              {
                 books[i].shelf =  shelf
              }
            }
          }
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

/*updates shelf of book if changed using dropdown in searched books*/
  updateShelfFromSearch= (book, prevShelf, newShelf)=> {
    /*update shelf of book in search results*/
    this.setState((state) => ({
    filteredBooks: state.filteredBooks.map((b)=>{
         if(b.id === book.id)
         {
           b.shelf = newShelf;
         }
          return b;
       })
    }));
    /*update shelf of book in Main Page using function-callback prop
    provided by App.js*/
    if(this.props.onShelfChange)
    {
      this.props.onShelfChange(book, prevShelf, newShelf);
    }
  }
  render() {
    var { filteredBooks } = this.state
    const { query } = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close it please!</button>
          </Link>
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
                  <Books onChangeBookCategory= {(book, prevShelf, newShelf)=>{
                      this.updateShelfFromSearch(book, prevShelf, newShelf)
                    }}
                   book={bk} key={bk.id}/>))
                 }
           </ol>
        </div>
      </div>
    );
  }
}

export default Search
