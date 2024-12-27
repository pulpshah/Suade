import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '@/components/HomePage/Header';
import Takes from '@/components/HomePage/Takes';
import Posts from '@/components/HomePage/Posts';

const HomePage = () => {
  // We'll track which post ID is expanded. null = none expanded.
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  // If any post is expanded, show the back button
  const isAnyPostExpanded = expandedPostId !== null;

  // This is called by the Posts/PostCard to indicate which post is expanded
  const handleExpandPost = (postId: string | null) => {
    setExpandedPostId(postId); // null means collapsed
  };

  // Clicking the back arrow collapses any expanded post
  const handleBackPress = () => {
    setExpandedPostId(null);
  };

  return (
    <View style={styles.container}>
      {/* Header with or without Back Button */}
      <Header showBackButton={isAnyPostExpanded} onBackPress={handleBackPress} />

      {/* Content */}
      <ScrollView nestedScrollEnabled={true}>
        {/* Hide Takes if a post is expanded */}
        {!isAnyPostExpanded && <Takes />}

        {/*
          Pass "expandedPostId" and "handleExpandPost" to the Posts component
          so it knows which post is expanded and can notify us when toggling.
        */}
        <Posts
          expandedPostId={expandedPostId}
          onExpandPost={handleExpandPost}
        />
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
});
