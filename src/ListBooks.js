import React, { Component } from 'react'
import sortBy from 'sort-by'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'
import BOOK_SHELF_DATA from './BookShelfData'

class ListBooks extends Component {
	render() {
    	const { books, location } = this.props

	    books.sort(sortBy('shelf'))

	    let sortedBookShelves = BOOK_SHELF_DATA.filter((shelf) => shelf.key !== 'moveTo' && shelf.key !== 'none').map((shelf) => {
	     	return Object.assign({
	     		books: books.filter((book) => book.shelf === shelf.key)
	     	}, shelf)
	     })

		return (
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

              	{sortedBookShelves.map(shelves => (
					<div key={shelves.key} className="bookshelf">
	                  <h2 className="bookshelf-title">{shelves.text}</h2>
	                  <div className="bookshelf-books">
	                    <ol className="books-grid">
						{shelves.books.map((book) => (
							<BookItem key={book.id} book={book} onChangeBookShelf={this.props.onChangeBookShelf} />
						))}
	                    </ol>
	                  </div>
	                </div>
                ))}

              </div>
            </div>

            {(location.pathname !== '/search' &&
            	<div className="open-search">
               		<Link to="/search">Add a book</Link>
             	</div>
            )}

          </div>
	)}

}

export default ListBooks