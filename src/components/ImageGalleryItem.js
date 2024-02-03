// ImageGalleryItem.js
import React from 'react';

const ImageGalleryItem = ({ imageUrl, onClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img src={imageUrl} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
