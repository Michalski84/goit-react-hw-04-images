import React, { useState, useEffect } from 'react';
import './styles.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import axios from 'axios';

const API_KEY = '34999463-77daba834ec561a295c4940af';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (query === '') return;
    fetchImages(query, page);
  }, [query, page]);

  const handleSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const fetchImages = async (query, page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits.map((image) => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error('Error fetching images: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setShowModal(true);
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={loadMoreImages} />}
      {showModal && <Modal imageUrl={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
