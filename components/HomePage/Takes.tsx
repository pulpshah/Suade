import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const takesData = [
  { id: '1', username: 'Your Take', image: require('./assets/images/yourprofile.png') },
  { id: '2', username: 'profile1', image: require('./assets/images/profile1.png') },
  { id: '3', username: 'profile2', image: require('./assets/images/profile2.png') },
  { id: '4', username: 'profile3', image: require('./assets/images/profile3.png') },
  { id: '5', username: 'profile4', image: require('./assets/images/profile1.png') },
  { id: '6', username: 'profile5', image: require('./assets/images/profile2.png') },
  { id: '7', username: 'profile6', image: require('./assets/images/profile3.png') },
  { id: '8', username: 'profile7', image: require('./assets/images/profile1.png') },
  { id: '9', username: 'profile8', image: require('./assets/images/profile2.png') },
  { id: '10', username: 'profile9', image: require('./assets/images/profile3.png') },
];

const Takes = () => {
  return (
    <View style={styles.takesContainer}>
      <FlatList
        horizontal
        data={takesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.takeItem}>
            <Image source={item.image} style={styles.takeImage} />
            <Text style={styles.takeUsername}>{item.username}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  takesContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingLeft: 8,
  },
  takeItem: {
    alignItems: 'center',
    marginRight: 12,
  },
  takeImage: {
    width: 80,
    height: 80,
    borderRadius: 8, 
    borderWidth: 2,
    borderColor: '#fff',
  },
  takeUsername: {
    marginTop: 8,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    maxWidth: 60,
  },
});

export default Takes;
