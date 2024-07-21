import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Article from './Article';
import useFetchData from '../hooks/useFetchData';
import { storeData, getData } from '../storage/offlineStorageService';
import LoaderBanner from './LoaderBanner';

const HeadlineList = () => {
  const { headlines: fetchedHeadlines, resetHeadlines, loadHeadlines } = useFetchData();
  const [headlines, setHeadlines] = useState([]);
  const [pinnedHeadlines, setPinnedHeadlines] = useState([]);
  const [timer, setTimer] = useState(null);

  const storeRemainingHeadlines = async () => {
    const newBatch = fetchedHeadlines.slice(10);
      await storeData("headlines", newBatch);
  }

  useEffect(() => {
    setHeadlines(fetchedHeadlines.slice(0, 10));
    storeRemainingHeadlines()
  }, []);

  useEffect(() => {
    
    const loadPinnedHeadlines = async () => {
      const storedPinnedHeadlines = await getData("pinned_headlines");
      const uniquePinnedHeadlines = removeDuplicates(storedPinnedHeadlines);
      if (uniquePinnedHeadlines) {
        setPinnedHeadlines(uniquePinnedHeadlines);
      }
    };

    loadPinnedHeadlines();
  }, []);

  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }

    const interval = setInterval(() => {
      updateHeadlines();
    }, 10000);

    setTimer(interval);

    return () => clearInterval(interval);
  }, [headlines]);

  const updateHeadlines = async () => {
    const storedHeadlines = await getData("headlines");
    if (storedHeadlines.length === 0) {
      setHeadlines([])
      await resetHeadlines();
      loadHeadlines();
    } else {
      const newBatch = storedHeadlines.slice(0, 5);
      const remainingHeadlines = storedHeadlines.slice(5);
      const newBatchWithoutPinned = newBatch.filter(item => !isDuplicateHeadline(item, pinnedHeadlines));
      setHeadlines((prev) => [...newBatchWithoutPinned, ...prev]);
      await storeData("headlines", remainingHeadlines);
    }
  };

  const handleDelete = (headline) => {
    setHeadlines((prev) => prev.filter((item) => item.title !== headline.title));
  };

  const removeDuplicates = (headlines) => {
    const uniqueHeadlines = [];
    const titles = new Set();
  
    headlines.forEach((headline) => {
      if (!titles.has(headline.title)) {
        uniqueHeadlines.push(headline);
        titles.add(headline.title);
      }
    });
  
    return uniqueHeadlines;
  };

  const isDuplicateHeadline = (headline, headlines) => {
    return headlines.some(existingHeadline => existingHeadline.title === headline.title);
  };

  const handlePin = async (headline) => {
    handleDelete(headline);
    const updatedHeadline = { ...headline, isPinned: !headline.isPinned };
    if (!isDuplicateHeadline(updatedHeadline, pinnedHeadlines)) {
      // Add the updated headline to the beginning of the pinned headlines list
      const uniquePinnedHeadlines = removeDuplicates(pinnedHeadlines);
      const newPinnedHeadlines = [updatedHeadline, ...uniquePinnedHeadlines];
  
      // Update state and store in local storage
      setHeadlines((prev) => [...newPinnedHeadlines, ...prev])
      setPinnedHeadlines(newPinnedHeadlines);
      await storeData("pinned_headlines", newPinnedHeadlines);
    } else {
      console.log("Duplicate headline, not adding to pinned headlines");
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
          <Image source={require('../images/loader.png')} style={styles.headerLogo} />
          <TouchableOpacity onPress={updateHeadlines}>
            <Image source={require('../images/Refresh.png')} resizeMode='contain' style={styles.refreshLogo} />
          </TouchableOpacity>
        </View>
    )
  }

  if(headlines.length === 0){
    return (
      <View style={styles.bannerContainer}>
       <LoaderBanner />
      </View>
    )
  }

  return (
    <FlatList
      data={[...pinnedHeadlines, ...headlines]}
      renderItem={({ item }) => (
        <Article
          headline={item}
          onDelete={() => handleDelete(item)}
          onPin={() => handlePin(item)}
        />
      )}
      ListHeaderComponent={renderHeader}
      keyExtractor={(item) => item.title}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 1,
    marginTop: 30
  },
  bannerContainer: {
    marginTop: "40%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10
  },
  headerLogo: {
    width: 150,
    height: 40
  },
  refreshLogo: {
    width: 28,
    height: 28
  }
});

export default HeadlineList;
