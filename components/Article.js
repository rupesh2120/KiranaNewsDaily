import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Article = ({ headline, onDelete, onPin }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{headline.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPin}>
          <Text style={styles.actionText}>Pin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    color: 'blue',
  },
});

export default Article;
