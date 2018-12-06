import React, { Component } from 'react';
import BookShelfType from './components/BookShelfType'
import Search from './components/Search'
import * as BooksAPI from './components/BooksAPI'
class BooksApp extends Component {
  state = {
    CurrentlyReading: [],
    WantToRead: [],
    Read: [],
    showSearchPage: false
   }
  componentDidMount() {
      BooksAPI.getAll().then((books) => {
      this.setState({
        CurrentlyReading : books.filter((b)=> b.shelf === "currentlyReading"),
        WantToRead : books.filter((b)=> b.shelf === "wantToRead"),
        Read : books.filter((b)=> b.shelf === "read")
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
  updateShelf= (book, newShelf, prevShelf)=> {
    this.removeFromShelf(book, prevShelf);
    this.addToShelf(book, newShelf);
    BooksAPI.update(book, newShelf);
  }
  render() {
    var { CurrentlyReading } = this.state
    var { WantToRead } = this.state
    var { Read } = this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search/>
        ) : (
          <div className="list-books">
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
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
