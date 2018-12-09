import React, { Component } from 'react';
import Books from './Books'
class BookShelfType extends Component {
  passBackToApp(book, newShelf, prevShelf)
  {
    if(this.props.onShelfChange)
    {
      this.props.onShelfChange(book, newShelf, prevShelf);
    }
  }
  render(){
    var list = this.props.bookList;
    var shelfType = this.props.shelfType;
    var shelfVal = this.props.shelfVal;
     return (
       <div className="bookshelf">
         <h2 className="bookshelf-title">{shelfType}</h2>
         <div className="bookshelf-books">
             <ol className="books-grid">
                 {Array.isArray(list)  && list.length > 0 && list.map((book)=>(
                    <Books onChangeBookCategory= {
                      (book, prevShelf, newShelf)=>
                      {this.passBackToApp(book, prevShelf, newShelf)
                      }
                  } book={book} shelfVal={shelfVal}/>))}
             </ol>
        </div>
      </div>
     );
  }
}

export default BookShelfType
