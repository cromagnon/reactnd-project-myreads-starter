import React, { Component } from 'react';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';

class ListBooks extends Component {
	render() {
    	const { books, location, bookShelves, shelfOptions } = this.props;

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
						{shelf.books.map((book) => (
							<BookItem key={book.id} book={book} shelfOptions={shelfOptions} onChangeBookShelf={this.props.onChangeBookShelf} />
						))}
	                    </ol>
	                  </div>
	                </div>
                ))}

              </div>
            </div>

            {(location.pathname !== '/search' &&
            	<div className="open-search">
               		<Link to="/search">Add a book</Link>
             	</div>
            )}

          </div>
		);
	}
}

export default ListBooks;