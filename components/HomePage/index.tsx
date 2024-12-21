import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/HomePage/Header';
import Takes from '@/components/HomePage/Takes';
import Posts from '@/components/HomePage/Posts';

const HomePage = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Takes />
      <Posts />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
});

export default HomePage;
