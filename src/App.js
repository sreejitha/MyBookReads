import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import BookShelfType from './components/BookShelfType'
import Search from './components/Search'
import * as BooksAPI from './components/BooksAPI'
class BooksApp extends Component {
  state = {
    CurrentlyReading: [],
    WantToRead: [],
    Read: [],
    /*All categories of books present in the shelf, unfiltered by
    shelf category*/
    All:[]
   }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
      this.setState({
        CurrentlyReading : books.filter((b)=> b.shelf === "currentlyReading"),
        WantToRead : books.filter((b)=> b.shelf === "wantToRead"),
        Read : books.filter((b)=> b.shelf === "read"),
        All: books
      })
    })
  }

  removeFromShelf = (book, prevShelf) => {
    switch (prevShelf) {
      case 'currentlyReading':
        this.setState((state) => ({
            CurrentlyReading: state.CurrentlyReading.filter((b) => b.title !== book.title)
          })

        );
        break;
      case 'wantToRead':
        this.setState((state) => ({
          WantToRead: state.WantToRead.filter((b) => b.title !== book.title)
        }));
        break;
      case 'read':
        this.setState((state) => ({
          Read: state.Read.filter((b) => b.title !== book.title)
        }));
        break;
      default:
        break;
    }
  }
  addToShelf = (book, newShelf) => {
    switch (newShelf) {
      case 'currentlyReading':
        this.setState((state) => ({
          CurrentlyReading: state.CurrentlyReading.concat([book])
        }));
        break;
      case 'wantToRead':
        this.setState((state) => ({
          WantToRead: state.WantToRead.concat([book])
        }));
        break;
      case 'read':
        this.setState((state) => ({
          Read: state.Read.concat([book])
        }));
        break;
      default:
        break;
    }
  }

  /*called by child components {BookShelfType, Search}
  when the dropdown to change shelf of book is triggered in respective pages
  */
  updateShelf= (book, prevShelf, newShelf)=> {
    /*Step 1: Remove from old shelf in the Main Page*/
    this.removeFromShelf(book, prevShelf);
    /*Step 2: Add to new shelf in the Main Page*/
    this.addToShelf(book, newShelf);
    /*Step 3: Update shelf val in the All list which
    will update search results in future*/
    var bookId = book.id;
    this.setState((state) => ({
       All: state.All.map((b)=>{
         if(b.id === bookId)
         {
           b.shelf = newShelf;
         }
          return b;
       })

    }));
    /*Step 4: Update shelf val in the API*/
    BooksAPI.update(book, newShelf);
  }
  render() {
    var { CurrentlyReading } = this.state
    var { WantToRead } = this.state
    var { Read } = this.state
    var { All } = this.state
    return (
      <div className="app">
         <Route exact path="/search" render= {()=>
          (<Search onShelfChange = {(book, prevShelf, newShelf) =>{this.updateShelf(book, prevShelf,
           newShelf)} } shelfBooks={All}/>
          )
         }/>
          <Route exact path="/" render = {() =>
          (<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <BookShelfType onShelfChange = {(book, prevShelf, newShelf) =>{this.updateShelf(book, prevShelf,
               newShelf)}}
               bookList={CurrentlyReading} shelfType="Currently Reading" shelfVal ="currentlyReading"/>
              <BookShelfType onShelfChange = {(book, prevShelf, newShelf) =>{this.updateShelf(book, prevShelf,
               newShelf)}}
               bookList={WantToRead} shelfType="Want to Read" shelfVal ="wantToRead"/>
              <BookShelfType onShelfChange = {(book, prevShelf, newShelf) =>{this.updateShelf(book, prevShelf,
               newShelf)}}
               bookList={Read} shelfType="Read" shelfVal ="read"/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
          )
          }/>
       </div>
    )
  }
}

export default BooksApp
