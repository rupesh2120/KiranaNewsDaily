import { useEffect, useState } from 'react';
import { fetchHeadlines } from '../apis/newsApi';
import { storeData, getData, removeData } from '../storage/offlineStorageService';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);

const formatDate = (dateString) => {
  const date = dayjs(dateString);

  if (date.isToday()) {
    return date.format('h:mm A');
  } else if (date.isYesterday()) {
    return `Yesterday, ${date.format('h:mm A')}`;
  } else {
    return date.format('Do MMMM, h:mm A');
  }
};

const useFetchData = () => {
  const [headlines, setHeadlines] = useState([]);

  const loadHeadlines = async () => {
    const storedHeadlines = await getData("headlines");
    // Filter out items with null description or urlToImage
    if (storedHeadlines) {
      setHeadlines(storedHeadlines);
    } else {
      const fetchedHeadlines = await fetchHeadlines();
      const filteredHeadlines = fetchedHeadlines.slice(0,100).filter(item => item.description !== null && item.urlToImage !== null && item.author !== null);

    // Add isPinned key to each object
    const updatedHeadlines = filteredHeadlines.map(item => ({
      ...item,
      isPinned: false,
      formattedDate: formatDate(item.publishedAt)
    }));
      setHeadlines(updatedHeadlines);
      await storeData("headlines", updatedHeadlines);
    }
  };

  useEffect(() => {
    loadHeadlines();
  }, []);

  const resetHeadlines = async () => {
    await removeData("headlines");
    await loadHeadlines();
  };

  return { headlines, resetHeadlines, loadHeadlines };
};

export default useFetchData;
