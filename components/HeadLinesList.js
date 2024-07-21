import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import { NEWS_API_KEY } from '../constants';
import Article from './Article'

const HeadlineList = ({ headlines, onDelete, onPin }) => {
  const [fetchedHeadlines, setFetchedHeadlines] = useState([]);
  const [totalResults, setTotalResults] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${NEWS_API_KEY}`);
        setFetchedHeadlines(response.data.articles)
        setTotalResults(response.data.totalResults)
        return response.data.articles;
      } catch (error) {
        throw error;
      }
    };
    fetchHeadlines()
  }, [])

  return (
    <FlatList
      data={fetchedHeadlines}
      renderItem={({ item }) => (
        <Article
          headline={item}
          onDelete={() => onDelete(item)}
          onPin={() => onPin(item)}
        />
      )}
      keyExtractor={(item) => item.title}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
});

export default HeadlineList;
