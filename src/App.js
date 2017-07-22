import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import { Route, Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import BOOK_SHELF_DATA from './BookShelfData'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: ''
  }

  /**
  * @description Updates query with the user's input. Called each time user
  *              enters text into input box.
  * @param {string} query
  */
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  /**
  * @description Updates books collection with the one fetched from the
  *              backend. Called when component has been mounted.
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.sort(sortBy('title'))
      this.setState({books})
    });
  }

  /**
  * @description Updates the books collection with a re-shelved book.
  *              Takes book to be re-shelved, and shelf to be re-shelved to.
  *              Calls backend to update books collection.
  * @param {string} book
  * @param {string} shelf
  */
  changeBookShelf = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf
        }
        return b
      })
    }))

    BooksAPI.update(book, shelf);
  }

  /**
  * @description Clears the state query variable
  */
  clearQuery = () => {
    this.setState({query: ''})
  }

  getShelfOptions = () => {
    return BOOK_SHELF_DATA.map((shelf) => {
      return Object.assign({disabled: shelf.key === 'moveTo'}, shelf)
    })
  }

  getBookShelves = (books) => {
    return BOOK_SHELF_DATA.filter((shelf) => shelf.key !== 'moveTo' && shelf.key !== 'none').map((shelf) => {
        return Object.assign({
          books: books.filter((book) => book.shelf === shelf.key)
        }, shelf)
    })
  }

  render() {

    const { query, books } = this.state

    let bookResults = books

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      bookResults = books.filter((b) => (
        match.test(b.authors.join()) || match.test(b.title)
      ))
    }

    return (
      <div className="app">
        <Route exact path="/" render={({location}) => (
            <div className="list-books">
              <div className="list-books-results">
                <ListBooks books={bookResults} bookShelves={this.getBookShelves} shelfOptions={this.getShelfOptions} onChangeBookShelf={this.changeBookShelf} location={location} />
              </div>
            </div>
          )}/>

        <Route path="/search" render={({location}) => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search" onClick={this.clearQuery}>Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" value={query} onChange={(e) => (this.updateQuery(e.target.value))} placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                  <ListBooks books={bookResults} bookShelves={this.getBookShelves} shelfOptions={this.getShelfOptions} onChangeBookShelf={this.changeBookShelf} location={location} />
              </div>
            </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
