import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';

const ListBooks = (props) => {
  const { books, bookShelves, shelfOptions } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelves(books).map(shelf => (
            <div key={shelf.key} className="bookshelf">
              <h2 className="bookshelf-title">{shelf.text}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelf.books.map(book => (
                    <BookItem
                      key={book.id}
                      book={book}
                      shelfOptions={shelfOptions}
                      onChangeBookShelf={props.onChangeBookShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  bookShelves: PropTypes.func.isRequired,
  shelfOptions: PropTypes.func.isRequired,
};

ListBooks.defaultProps = {
  books: [],
};

export default ListBooks;
