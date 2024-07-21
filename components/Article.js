import React, {useMemo} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';

const Article = ({ headline, onDelete, onPin }) => {
  const {author, formattedDate, description, urlToImage, source, isPinned} = headline;

  const truncateDescription = useMemo(() => {
    if (description.length <= 100) {
      return description;
    }
    return `${description.substring(0, 100)}...`;
  }, [description]);

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
          <Image source={require('../images/Delete.png')} style={styles.logo} />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onPin}>
          <Image source={require('../images/pin.png')} style={styles.pinlogo} />
          <Text style={styles.actionText}>Pin</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.item}>
        {isPinned ?
          <View style={styles.pinHeader}>
              <Image source={require('../images/pin.png')} style={styles.pinnedlogo} />
              <Text style={styles.pinnedText}>Pinned on top</Text>
          </View>
        : null}
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
    </Swipeable>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 8
  },
  pinHeader: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12
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
  pinnedText: {
    fontSize: 12,
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
  actionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '20%',
    backgroundColor: '#4BBDFC',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#FFFFFF",
    fontFamily: 'santoshi'
  },
  logo: {
    width: 26,
    height: 26
  },
  pinlogo: {
    width: 20,
    height: 20
  },
  pinnedlogo: {
    width: 10,
    height: 10,
    tintColor: '#808080',
    marginRight: 2
  }
});

export default Article;
