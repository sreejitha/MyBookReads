import React, { Component } from 'react';

class BookShelfType extends Component {

   render(){
    var list = this.props.bookList;
    var shelfType = this.props.shelfType;
     return (
       <div className="bookshelf">
         <h2 className="bookshelf-title">{shelfType}</h2>
         <div className="bookshelf-books">
        <ol className="books-grid">
        {list.map((book)=>(
          <li key={book.title}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover"
                style={{width: 128, height: 192, backgroundImage: `url(${book.coverUrl})` }}></div>
                <div className="book-shelf-changer">
                  <select>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
        </ol>
        </div>
        </div>
     );
  }
}

export default BookShelfType
