import './App.css';
import { useState } from "react"
import { useBook } from "./context/BookContext"
import image from "./images/blankImage.jpg"
import { Search } from 'react-bootstrap-icons';
import Footer from './components/Footer/footer';
import BookModal from './components/Modal/BookModal';
function App() {
  const [bookData, setBookData] = useState([]);
  const [keyword, setKeyword] = useState([]);
  //Context tarafından gerekli kısımlar alınıyor
  const { getBooks, loading } = useBook()

  const handleClick = () => {
    //Filtrelenmek istenilen kelimeler ve verilerin kaydedileceği state gönderiliyor
    getBooks({ setBookData, keyword })
  }

  return (
    <div className='WebApp'>
      <div className='header header-image'>
        <div className='container headerContent'>
          <h3>Book Search using React</h3>
          <div class="d-flex headerContent mt-4">
            <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className='form-control searchInput'></input>
            <button  type="button" onClick={handleClick} className='btn btn-info'><Search/></button>
          </div>
        </div>
      </div>
      <div>
        {bookData &&
          <div className='row  mx-auto mt-3 mx-3'>
            {bookData.map((book) => (
              <div className='col-md-4 col-sm-6 col-12 mb-5 '  key={book.id}>
                <div className='d-flex'>
                  <img className="card-img-top" style={{ height: 260, width: 180 }} src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : image} alt={book.id} />
                  <div style={{ color: "red", marginLeft: 5 }}>
                    <p style={{ fontSize: 15, color: "black" }}>{book.volumeInfo.title && book.volumeInfo.title}</p>
                    <p style={{ fontSize: 13 }}>{book.volumeInfo.authors && book.volumeInfo.authors}</p>
                    <div className='d-flex flex-wrap '>
                      <a href={book.volumeInfo.previewLink}><button onClick={handleClick} className='btn btn-sm btn-info' style={{ color: "white" }}>Preview</button></a>
                      <BookModal link={book.selfLink}></BookModal>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
