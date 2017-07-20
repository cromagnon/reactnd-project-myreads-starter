import React, { Component } from 'react'
//import sortBy from 'sort-by'

class BookItem extends Component {
	state = {
		BOOK_SHELF: [{key: 'moveTo', text: 'Move to...', disabled: true},
	 {key: 'currentlyReading', text: 'Currently Reading'},
	 {key: 'wantToRead', text: 'Want to Read'},
	 {key: 'read', text: 'Read'},
	 {key: 'none', text: 'None'}]
	}

	render() {

		const { book } = this.props

		return (
          <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e) => this.props.onChangeBookShelf(book, e.target.options[e.target.selectedIndex].value)} defaultValue="moveTo">
                    {this.state.BOOK_SHELF.map((shelf, index) => (
                    	<option key={index} disabled={shelf.disabled} value={shelf.key}>{shelf.text}</option>
					))}
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
		)
	}
}

export default BookItem