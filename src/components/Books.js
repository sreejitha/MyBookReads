import React, {
  Component
} from 'react';
class Books extends Component {

  /*handles moves from one book grid to another*/
  handleChange(book, newShelf, prevShelf) {
    if (this.props.onChangeBookCategory) {
      console.log("book:" + book.title);
      console.log("event target:" + newShelf);
      console.log("prev shelf:" + prevShelf);
      this.props.onChangeBookCategory(book, newShelf, prevShelf);
    }
  }

   render(){
     var bk = this.props.book;
     return(
         <li key={bk.id}>
           <div className="book">
             <div className="book-top">
               <div className="book-cover"
               style={
                 {width: 128, height: 192, backgroundImage: `url(${bk.imageLinks && bk.imageLinks.thumbnail})` }}>
               </div>
               <div className="book-shelf-changer">
                     <select value= {bk.shelf? bk.shelf: "none"} onChange={(event)=>{
                       this.handleChange(bk, event.target.value, bk.shelf)
                     }}>
                        <option value="move" disabled>Move to</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                     </select>
               </div>
             </div>
             <div className="book-title">{bk.title}</div>
             <div className="book-authors">{bk.authors}</div>
           </div>
         </li>
     );
   }
}

export default Books
