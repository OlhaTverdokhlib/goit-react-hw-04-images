import React, { useState, useEffect } from 'react';
import { getPhotoByName } from 'services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import appStyles from './App.module.css';

const App = () => {
  const [name, setName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');

  const fetchPhotoByName = async () => {
    try {
      setIsLoading(true);
      const photoByName = await getPhotoByName(name, page);
      setPhotos(prevPhotos => [...prevPhotos, ...photoByName]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchPhotoByName();
  }, [name, page]);

  const onSelectName = selectedName => {
    setName(selectedName);
    setPhotos([]);
    setPage(1);
  };

  const onClickBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onClickImage = src => {
    setLargeImage(src);
  };

  const onCloseModal = () => {
    setLargeImage('');
  };

  const minVisibleImages = 12;

  return (
    <div className={appStyles.container}>
      <Searchbar onSubmit={onSelectName} />
      {error.length > 0 && <p>Upss, Some error occurred... {error}</p>}
      {isLoading && <Loader />}
      <ImageGallery photos={photos} onClick={onClickImage} />
      {photos.length > 0 && photos.length >= minVisibleImages && (
        <Button onClick={onClickBtn} />
      )}
      {!!largeImage.length && (
        <Modal onClose={onCloseModal} largeImage={largeImage} />
      )}
    </div>
  );
};

export default App;
