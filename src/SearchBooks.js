import React from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem';

const SearchBooks = (props) => {
  const { books, shelfOptions, onChangeBookShelf } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <ol className="books-grid">
            {books.map(book => (
              <BookItem
                key={`${book.id}-${Math.random()}`}
                book={book}
                shelfOptions={shelfOptions}
                onChangeBookShelf={onChangeBookShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

SearchBooks.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  shelfOptions: PropTypes.func.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired,
};

SearchBooks.defaultProps = {
  books: [],
};

export default SearchBooks;
