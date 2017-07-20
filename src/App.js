import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import { Route, Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    });
  }

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

  clearQuery = () => {
    this.setState({query: ''})
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
              <ListBooks books={bookResults} onChangeBookShelf={this.changeBookShelf} location={location} />
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
                <ListBooks books={bookResults} onChangeBookShelf={this.changeBookShelf} location={location} />
            </div>
          </div>
      )} />
      </div>
    )
  }
}

export default BooksApp
