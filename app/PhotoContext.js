import { createContext, useContext, useState, useEffect } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const apiKey = process.env.EUROPEANA_API_KEY;
  const [response, setResponse] = useState(null);
  const [randomPhoto, setRandomPhoto] = useState({ });

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
      console.log('Items', data.data);
      const randomPhotoIndex = Math.floor(Math.random() * items.length);
      const randomPhoto = items[randomPhotoIndex];

      if (!randomPhoto['year']) {
        getPhoto();
        return;
      }

      setRandomPhoto({ edmPreview: randomPhoto['edmPreview'][0], year: randomPhoto['year'][0] });

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