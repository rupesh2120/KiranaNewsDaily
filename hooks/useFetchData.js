import { useEffect, useState } from 'react';
import { fetchHeadlines } from '../apis/newsApi';
import { storeData, getData } from '../storage/offlineStorageService';

const useFetchData = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const loadHeadlines = async () => {
      const storedHeadlines = await getData("headlines");
      if (storedHeadlines) {
        setHeadlines(storedHeadlines);
      } else {
        const fetchedHeadlines = await fetchHeadlines();
        setHeadlines(fetchedHeadlines);
        await storeData("headlines", fetchedHeadlines);
      }
    };

    loadHeadlines();
  }, []);

  return headlines;
};

export default useFetchData;
