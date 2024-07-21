import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import { NEWS_API_KEY } from '../constants';
import Article from './Article';
import useFetchData from '../hooks/useFetchData';

const HeadlineList = ({ headlines, onDelete, onPin }) => {
  const fetchedHeadlines = useFetchData();
  
  if(fetchedHeadlines.length === 0){
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    )
  }
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
