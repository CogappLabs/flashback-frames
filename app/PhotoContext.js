import { createContext, useContext, useState, useEffect } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const apiKey = process.env.EUROPEANA_API_KEY;
  const [response, setResponse] = useState(null);
  const [randomPhoto, setRandomPhoto] = useState({ });
  const [revealYear, setRevealYear] = useState(false);
  const [photosPlayed, setPhotosPlayed] = useState([]);

  // const getPhoto = async () => {
  //   try {
  //     const res = await fetch(`/api`, {
  //       headers: {
  //         "Authorization": `Bearer ${apiKey}`,
  //       },
  //     });

  //     if (!res.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await res.json();
  //     setResponse(data);

  //     const items = data.data.items;
  //     console.log('Items', data.data.items);
  //     const randomPhotoIndex = Math.floor(Math.random() * items.length);
  //     console.log('Random Photo Index', randomPhotoIndex);
  //     const randomPhoto = items[randomPhotoIndex];

  //     if (!randomPhoto['year']) {
  //       getPhoto();
  //       return;
  //     }

  //     setRevealYear(false);
  //     setRandomPhoto({ edmPreview: randomPhoto['edmPreview'][0], year: randomPhoto['year'][0] });

  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const getPhoto = async () => {
    try {
      const photographs = [
        {
          id: 1,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10026manifest&type=IMAGE',
          year: "1906" 
        },
        {
          id: 2,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10394manifest&type=IMAGE',
          year: "1945" 
        },
        {
          id: 3,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10412manifest&type=IMAGE',
          year: "1995" 
        },
        {
          id: 4,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10241manifest&type=IMAGE',
          year: "1904" 
        },
        {
          id: 5,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10349manifest&type=IMAGE',
          year: "1973" 
        },
        {
          id: 6,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10415manifest&type=IMAGE',
          year: "1999" 
        },
        {
          id: 7,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10432manifest&type=IMAGE',
          year: "2002" 
        },
        {
          id: 8,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10430manifest&type=IMAGE',
          year: "1982" 
        },
        {
          id: 9,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10436manifest&type=IMAGE',
          year: "1994" 
        },
        {
          id: 10,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10550manifest&type=IMAGE',
          year: "2003" 
        },
        {
          id: 11,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10567manifest&type=IMAGE',
          year: "1937" 
        },
        {
          id: 12,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10561manifest&type=IMAGE',
          year: "1995" 
        },
        {
          id: 13,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10574manifest&type=IMAGE',
          year: "1895" 
        },
        {
          id: 14,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10572manifest&type=IMAGE',
          year: "1923" 
        },
        {
          id: 15,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10586manifest&type=IMAGE',
          year: "1999" 
        },
        {
          id: 16,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10596manifest&type=IMAGE',
          year: "1994" 
        },
        {
          id: 17,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10623manifest&type=IMAGE',
          year: "1954" 
        },
        {
          id: 18,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10615manifest&type=IMAGE',
          year: "1983" 
        },
        {
          id: 19,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10632manifest&type=IMAGE',
          year: "1951" 
        },
        {
          id: 20,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10635manifest&type=IMAGE',
          year: "1953" 
        },
        {
          id: 21,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10631manifest&type=IMAGE',
          year: "1955" 
        },
        {
          id: 22,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10639manifest&type=IMAGE',
          year: "1955" 
        },
        {
          id: 23,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10642manifest&type=IMAGE',
          year: "1960" 
        },
        {
          id: 24,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10637manifest&type=IMAGE',
          year: "1951" 
        },
        {
          id: 25,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10652manifest&type=IMAGE',
          year: "1950" 
        },
        {
          id: 26,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10650manifest&type=IMAGE',
          year: "1953" 
        },
        {
          id: 27,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10644manifest&type=IMAGE',
          year: "2005" 
        },
        {
          id: 28,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10656manifest&type=IMAGE',
          year: "1954" 
        },
        {
          id: 29,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10658manifest&type=IMAGE',
          year: "1950" 
        },
        {
          id: 30,
          edmPreview: 'https://api.europeana.eu/thumbnail/v2/url.json?uri=https%3A%2F%2Fwww.searchculture.gr%2Faggregator%2Fthumbnails%2Fedm-record%2Fmedusa%2F000114-3_10659manifest&type=IMAGE',
          year: "1956" 
        },
      ];
  
      // get a random item from photographs and assign to setRandomPhoto
      const randomPhoto = photographs[Math.floor(Math.random() * photographs.length)];
    
      if (photosPlayed.includes(randomPhoto['id'])) {
        console.log('Photo ID already played, fetching another photo...');
        getPhoto();
        return;
      }

      setRandomPhoto({ id: randomPhoto['id'], edmPreview: randomPhoto['edmPreview'], year: randomPhoto['year'] });

      // Update photosPlayed with the new photo ID
      const newPhotosPlayed = [...photosPlayed, randomPhoto['id']];
      if (newPhotosPlayed.length > 5) {
        setPhotosPlayed([randomPhoto['id']]); // Reset array and start again
      } else {
        setPhotosPlayed(newPhotosPlayed);
      }

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