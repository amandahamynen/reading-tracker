//import axios from 'axios'
import { useEffect, useState } from 'react'

// const promise = axios.get('http://localhost:5001/api/books')
// console.log(promise)

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

const App = () => {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5001/api/books')
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
      setBooks(data)
    })
  }, [])

  return (
    <div>
      {books && <BookList books={books} />}
    </div>
  )

}

export default App