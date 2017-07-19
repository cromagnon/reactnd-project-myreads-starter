import React, { Component } from 'react'
import sortBy from 'sort-by'
import Book from './Book'


class ListBooks extends Component {
	render() {
    	const { books } = this.props

	    books.sort(sortBy('shelf'))

	    let currentlyReadingBooks
	    currentlyReadingBooks = books.filter((book) => book.shelf === 'currentlyReading')

	    let readBooks
	    readBooks = books.filter((book) => book.shelf === 'read')

		let wantToReadBooks
	    wantToReadBooks = books.filter((book) => book.shelf === 'wantToRead')

		return (
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
					{currentlyReadingBooks.map((book) => (
						<Book key={book.id} book={book} />
					))}
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
					{wantToReadBooks.map((book) => (
						<Book key={book.id} book={book} />
					))}
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
					{readBooks.map((book) => (
						<Book key={book.id} book={book} />
					))}
                    </ol>
                  </div>
                </div>

              </div>
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>

          </div>
	)}

}

export default ListBooks