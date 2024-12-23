import React, { useState } from 'react';
////////////
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '@/components/HomePage/Header';
import Takes from '@/components/HomePage/Takes';
import Posts from '@/components/HomePage/Posts';

const HomePage = () => {
  const [isAnyPostExpanded, setIsAnyPostExpanded] = useState(false);

  const handleAnyPostExpand = (expanded: boolean) => {
    setIsAnyPostExpanded(expanded);
  };

  const handleBackPress = () => {
    setIsAnyPostExpanded(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <Header showBackButton={isAnyPostExpanded} onBackPress={handleBackPress} />

      {/* Content */}
      <ScrollView>
        {!isAnyPostExpanded && <Takes />}
        <Posts onAnyPostExpand={handleAnyPostExpand} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
});

export default HomePage;
  