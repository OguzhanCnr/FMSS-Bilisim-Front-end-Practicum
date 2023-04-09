import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useBook } from "../../context/BookContext"
import parse from 'html-react-parser';

function BookModal({ link }) {
  const [formModal, setFormModal] = useState(false);
  const [bookData, setBookData] = useState([]);
  const { getBook, loading } = useBook()
  //Butona basılınca modal açılıyor ve kitap detayları API den çekiliyor
  const handleClick = ({ link }) => {
    getBook({ setBookData, link });
    setFormModal(!formModal);
  };
  return !loading ? null : (
    <div>
      <button
        type='button'
        className='btn btn-sm btn-info ms-2'
        onClick={() => handleClick({ link })}
        style={{ color: "white" }}
      >
        Detail
      </button>
      {bookData &&
        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-lg'>
          <ModalHeader toggle={() => setFormModal(!formModal)}>{bookData.title}</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
              {parse(`${bookData.description}`)}
              <div className='d-flex justify-content-between' style={{color:"red"}}>
              <h5>Published Date: {bookData.publishedDate} </h5>
              <h5>Page Count: {bookData.pageCount}</h5>
              
              </div>
                
               
              </div>
            </div>
          </ModalBody>
        </Modal>
      }

    </div>

  );
}

export default BookModal;


