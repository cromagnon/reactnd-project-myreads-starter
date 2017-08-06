import React from 'react';
import { Route, Link } from 'react-router-dom';
import sortBy from 'sort-by';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import BOOK_SHELF_DATA from './BookShelfData';

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    searchResults: [],
  }

  /**
  * @description Updates books collection with the one fetched from the
  *              backend. Called when component has been mounted.
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.sort(sortBy('title'));
      this.setState({ books });
    });
  }

  /**
  * @description Populates Select dropdown options text and values.
  * @return {array} shelfOptions - Book shelf options
  */
  getShelfOptions = () => BOOK_SHELF_DATA
    .map(shelf => Object.assign({ disabled: shelf.key === 'moveTo' }, shelf))

  /**
  * @description Populates header text for bookshelves and books belonging
                 to the bookshelves. Takes in an unshelved books collection.
  * @param {array} books - Unshelved/uncategorized books collection
  * @return {array} bookShelves - Bookshelves with headers and categorized
                    books
  */
  getBookShelves = books => BOOK_SHELF_DATA
    .filter(shelf => shelf.key !== 'moveTo' && shelf.key !== 'none')
    .map(shelf => Object.assign({
      books: books.filter(book => book.shelf === shelf.key),
    }, shelf))

  /**
  * @description Updates query with the user's input. Called each time user
  *              enters text into input box. Does backend search.
  * @param {string} query - query input from user
  */
  updateQuery = (query) => {
    this.setState({ query: query.trim() });

    BooksAPI.search(query, 0).then((searchResults) => {
      if (searchResults.error || searchResults.items) {
        return;
      }
      if (searchResults !== this.state.searchResults) {
        this.setState({ searchResults });
      }
    });
  };

  /**
  * @description Updates the books collection with a re-shelved book.
  *              Takes book to be re-shelved, and shelf to be re-shelved to.
  *              Calls backend to update books collection.
  * @param {string} book - book to be reshelved
  * @param {string} shelf - shelf to be reshelved to
  */
  changeBookShelf = (book, shelf) => {
    if (shelf === 'none' || shelf === 'moveTo') {
      return;
    }

    this.setState(state => ({
      books: state.books.map((b) => {
        const foundBook = b;
        if (foundBook.id === book.id) {
          foundBook.shelf = shelf;
        }
        return foundBook;
      }),
    }));

    BooksAPI.update(book, shelf);
  }

  /**
  * @description Clears the state query variable, and searchResults
                 Fetches books from the backend.

  */
  clearQuery = () => {
    this.setState({ query: '', searchResults: [] });
    // BooksAPI.getAll().then((books) => {
    //   books.sort(sortBy('title'));
    //   this.setState({ books });
    // });
  }

  render() {
    const { query, books, searchResults } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-results">
                <ListBooks
                  books={books}
                  bookShelves={this.getBookShelves}
                  shelfOptions={this.getShelfOptions}
                  onChangeBookShelf={this.changeBookShelf}
                />
              </div>
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link
                  to="/"
                  className="close-search"
                  onClick={this.clearQuery}
                >
                  Close
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    value={query}
                    autoFocus
                    onChange={e => (this.updateQuery(e.target.value))}
                    placeholder="Search by title or author"
                  />
                </div>
              </div>
              <div className="search-books-results">
                <SearchBooks
                  books={searchResults}
                  bookShelves={this.getBookShelves}
                  shelfOptions={this.getShelfOptions}
                  onChangeBookShelf={this.changeBookShelf}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
