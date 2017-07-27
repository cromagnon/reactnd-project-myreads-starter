import React from 'react';
import PropTypes from 'prop-types';

const BookItem = (props) => {
  const { book, onChangeBookShelf, shelfOptions } = props;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={e =>
                onChangeBookShelf(book, e.target.options[e.target.selectedIndex].value)}
            >
              {shelfOptions().map(shelf => (
                <option
                  key={shelf.key}
                  disabled={shelf.disabled}
                  selected={book.shelf === shelf.key}
                  value={shelf.key}
                >
                  {shelf.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ')}</div>
      </div>
    </li>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired,
  shelfOptions: PropTypes.arrayOf.isRequired,
};

export default BookItem;
