import React, { Component } from 'react'
import BOOK_SHELF_DATA from './BookShelfData'

class BookItem extends Component {
	state = {
		bookShelf: []
	}

	componentDidMount() {
		let bookShelf = BOOK_SHELF_DATA.map((shelf) => {
			return Object.assign({disabled: shelf.key === 'moveTo'}, shelf)
		})
		this.setState({bookShelf: bookShelf})
	}

	render() {

		const { book } = this.props

		return (
          <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e) => this.props.onChangeBookShelf(book, e.target.options[e.target.selectedIndex].value)}>
                    {this.state.bookShelf.map((shelf, index) => (
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