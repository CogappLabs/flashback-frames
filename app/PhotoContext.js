import { createContext, useContext, useState, useEffect } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const apiKey = process.env.EUROPEANA_API_KEY;
  const [response, setResponse] = useState(null);
  const [randomPhoto, setRandomPhoto] = useState(null);

  const getPhoto = async () => {
    try {
      const res = await fetch(`/api`, {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data);

      const items = data.data.items;
      const randomPhotoIndex = Math.floor(Math.random() * items.length);
      const randomPhoto = items[randomPhotoIndex];
      setRandomPhoto(randomPhoto);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <PhotoContext.Provider value={{ getPhoto, randomPhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhoto = () => useContext(PhotoContext);