import React, {
  Component
} from 'react';

class Books extends Component {

  /*handles moves from one book grid to another*/
  handleChange(book, newShelf, prevShelf) {
    if (this.props.onChangeBookCategory) {
      console.log("book:" + book.title);
      console.log("event target:" + newShelf);
      this.props.onChangeBookCategory(book, newShelf, prevShelf);
    }
  }

   render(){
     var list = this.props.bookList;
     return(
       <ol className="books-grid">
       {
         list.map((book)=>(
         <li key={book.id}>
           <div className="book">
             <div className="book-top">
               <div className="book-cover"
               style={{width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
               </div>
               <div className="book-shelf-changer">
                     <select value={book.shelf} onChange={(event)=>{
                       this.handleChange(book, event.target.value, book.shelf)
                     }}>
                        <option value="move" disabled>Move to</option>
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
     );
   }
}

export default Books
