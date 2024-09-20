import { createContext, useContext, useState, useEffect } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const apiKey = process.env.EUROPEANA_API_KEY;
  const [response, setResponse] = useState(null);
  const [randomPhoto, setRandomPhoto] = useState({ });
  const [revealYear, setRevealYear] = useState(false);

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
      console.log('Items', data.data.items);
      const randomPhotoIndex = Math.floor(Math.random() * items.length);
      console.log('Random Photo Index', randomPhotoIndex);
      const randomPhoto = items[randomPhotoIndex];

      if (!randomPhoto['year']) {
        getPhoto();
        return;
      }

      setRevealYear(false);
      setRandomPhoto({ edmPreview: randomPhoto['edmPreview'][0], year: randomPhoto['year'][0] });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <PhotoContext.Provider value={{ getPhoto, randomPhoto, revealYear, setRevealYear }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhoto = () => useContext(PhotoContext);