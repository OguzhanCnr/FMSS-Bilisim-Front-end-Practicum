import { useContext, useState, useEffect, createContext } from "react"
import PropTypes from "prop-types"
import axios from "axios"


// ** Context
const BookContext = createContext()

const BookProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const getBooks = ({setBookData,keyword}) => {
    setLoading(false)
    //Kitaplar için gelen keywordler ile beraber istek yollanıyor 
    axios.get(`${process.env.REACT_APP_API_URL}/books/v1/volumes?q=${keyword}&key=${process.env.REACT_APP_API_KEY}&maxResults=20`)
      .then((result) => {
        //Gelen verilerimizi de state e kaydediyoruz
        setBookData(result.data.items);
        setLoading(true)
      }).catch(function (error) {
        console.log(error)
      })
  }
  const getBook = ({setBookData,link}) => {
    setLoading(false)
        //Bu kısmı da sadece tek bir kitabın detaylarını çekmek için kullanıyoruz
    axios.get(`${link}`)
      .then((result) => {
        setBookData(result.data.volumeInfo);
        console.log(result.data.volumeInfo)
        setLoading(true)
      }).catch(function (error) {
        console.log(error)
      })
  }
  const values = { getBooks,getBook, loading }
  return <BookContext.Provider value={values}>{children}</BookContext.Provider>
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired
}
const useBook = () => useContext(BookContext)

export { BookProvider, useBook }