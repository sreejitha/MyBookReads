## My Reads Project

This project attempts at creating a UI for searching and adding books to an online bookshelf. The Project has 2 web pages, Search & Main. Search page as the name suggests is used to search for books from a Books API
which returns books given the search query. Main Page holds the bookshelf comprising all the books added from
search page. User can experiment with changing the shelf of the book from either the Main page or the Search page.

## Instructions to run the project
Clone this repository into a folder say 'MyReads' and cd into that folder. In that folder you will find  a sub-folder named "src" (houses the React, JS, CSS components/files etc for the project). Assuming npm and node are installed, on
the terminal from the MyReads folder type:-
1. npm install
   (This installs all the dependencies of the project)
2. npm start
   (This launches the application)

## About the solution

1. Created Search and BookShelfType component which are called from App.js. Both of these components
create a div like structure to hold the list of books
2. Both Search and BookShelfType components in-turn call the Books component which controls how an individual
book is displayed on the page.
3. For displaying search results on search page:
   1. Query if present or modified, is fed into the BooksAPI
   2. Query if entered then cleared, deletes existing search results
   3. Search Results are intersected with the Shelf books to gather data about the shelf of each book
   4. The search results if non-empty now containing shelf info are displayed on the Search page
      using Books component
4. BookShelfType component's shelf categories are constructed using 3 lists CurrentlyReading, WantToRead, Read.
The results from BooksAPI.getAll() go into these lists on filtering by shelf.
5. BookShelfType component also contains a 4th list 'All' which holds all the books from BooksAPI.getAll() minus
the filtering. This list is used for the process described in Step 3. 3
6. Updating the Bookshelf comprises of 4 steps
   1. Removing from the old shelf (one of the 3 lists CurrentlyReading, WantToRead, Read are modified)
   2. Adding to the new shelf (again, one of the 3 lists CurrentlyReading, WantToRead, Read are modified)
   3. Updating the shelf in BooksAPI
   4. Updating the book in the All list
   This ensures that the state of the book is consistent across pages and refreshes
