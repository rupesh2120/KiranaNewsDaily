import React, {useMemo} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Article = ({ headline, onDelete, onPin }) => {
  console.log("Data", headline)
  const {author, formattedDate, description, urlToImage, source} = headline;

  console.log("Length", description.length)

  const truncateDescription = useMemo(() => {
    if (description.length <= 100) {
      return description;
    }
    return `${description.substring(0, 100)}...`;
  }, [description]);

  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <Text style={styles.paperName}>{source.name}</Text>
        <Text style={styles.timeStyle}>{formattedDate}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.descText}>{truncateDescription}</Text>
        <Image source={{uri: urlToImage}} resizeMode='cover' style={styles.imageStyle} />
      </View>
      <View style={styles.header}>
        <Text style={styles.authorName}>{author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    // width: "80%",
    borderTopWidth: 1,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 8
  },
  descText: {
    flex: 3,
    fontSize: 18,
    fontWeight: '700',
    color: "#000000"
  },
  imageStyle: {
    flex: 1,
    width: 77, 
    height: 77,
    borderRadius: 13.8
  },
  paperName: {
    fontSize: 14,
    fontWeight: "400",
    color: "#808080",
    fontFamily: 'santoshi'
  },
  timeStyle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
    fontFamily: 'santoshi'
  },
  authorName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#818181",
    fontFamily: 'santoshi'
  },
});

export default Article;
