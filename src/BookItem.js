import React, { Component } from 'react'

class BookItem extends Component {
	render() {

		const { book, onChangeBookShelf, shelfOptions } = this.props

		return (
          <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e) => onChangeBookShelf(book, e.target.options[e.target.selectedIndex].value)}>
                    {shelfOptions().map((shelf, index) => (
                    	<option key={index} disabled={shelf.disabled} selected={book.shelf === shelf.key} value={shelf.key}>{shelf.text}</option>
					))}
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors.join(", ")}</div>
            </div>
          </li>
		)
	}
}

export default BookItem