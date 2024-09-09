import axios from 'axios'
import { useEffect, useState } from 'react'


const BookList = ({ books }) => {
  return (
    <div className="booklist">
      {books.map((book) => (
        <div className="book-view" key={book.id}>
          <h2>{ book.title }</h2>
          <p>Written by { book.author }</p>
        </div>
      ))}
    </div>
  )
}

const BookForm = ({ event, title, handleBookTitleChange, author, handleBookAuthorChange }) => {
  return (
    <div>
      <form onSubmit={event}>
        <div>
          title: <input value={title} onChange={handleBookTitleChange} />
        </div>
        <div>
          author: <input value={author} onChange={handleBookAuthorChange}/>
        </div>
        <div>
          <button type='submit'>save</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [books, setBooks] = useState([])
  const [newBookTitle, setNewBookTitle] = useState('')
  const [newBookAuthor, setNewBookAuthor] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:5001/api/books')
      .then(response => {
        console.log('promise fulfilled')
        setBooks(response.data)
      })
  }, [])

  const addBook = event => {
    event.preventDefault()
    const bookObject = {
      title: newBookTitle,
      author: newBookAuthor
    }

    axios
      .post('http://localhost:5001/api/books', bookObject)
      .then(response => {
        console.log(response)
        setBooks(books.concat(response.data))
        setNewBookTitle('')
        setNewBookAuthor('')
      })
  }

  const handleBookTitleChange = (event) => {
    console.log(event.target.value)
    setNewBookTitle(event.target.value)
  }

  const handleBookAuthorChange = (event) => {
    console.log(event.target.value)
    setNewBookAuthor(event.target.value)
  }


  return (
    <div>
      <h1>Books</h1>
      {books && <BookList books={books} />}
      <BookForm 
        event={addBook}
        title={newBookTitle}
        handleBookTitleChange={handleBookTitleChange}
        author={newBookAuthor}
        handleBookAuthorChange={handleBookAuthorChange}
      />
    </div>
  )

}

export default App