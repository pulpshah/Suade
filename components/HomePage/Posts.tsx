import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

// Define the Post type
interface Slide {
  id: string;
  type: string;
  content: string;
}

interface Comment {
  id: string;
  username: string;
  content: string;
}

interface Post {
  id: string;
  username: string;
  profileImage: any;
  time: string;
  slides: Slide[];
  likes: number;
  comments: number;
  shares: number;
  image: any;
  highlightedComments: Comment[];
  upvotes: number;
  downvotes: number;
}

// Sample post data
const postsData: Post[] = [
  {
    id: '1',
    username: 'non_timetraveller',
    profileImage: require('./assets/images/profile1.png'),
    time: '2 hr',
    slides: [
      { id: '1', type: 'Question', content: 'Should AI be allowed to make decisions in life-critical situations, like surgeries or autonomous driving?' },
      { id: '2', type: 'Text', content: 'With the rapid development of AI, its inevitable that well encounter situations where machines are trusted with life-critical decisions. But can we fully trust an AI system when it comes to moral dilemmas or unpredictable human behavior? How do we ensure accountability if something goes wrong?' },
    ],
    likes: 1200,
    comments: 152,
    shares: 1200,
    image: require('./assets/images/post_image1.jpg'),
    highlightedComments: [
      { id: '1', username: 'thedebateguy12', content: 'What if someone accidentally changes the whole future? Too risky IMO...' },
      { id: '2', username: 'anotheruser', content: '"Totally agree! Time travel should be allowed—imagine all the amazing things we could fix or learn from the past!"' },
    ],
    upvotes: 1200,
    downvotes: 150,
  },
  {
    id: '2',
    username: 'non_timetraveller',
    profileImage: require('./assets/images/profile2.png'),
    time: '2 hr',
    slides: [
      { id: '1', type: 'Claim', content: 'Time travel would be more of a curse than a blessing.' },
      { id: '2', type: 'Text', content: 'Imagine the chaos if people could rewrite history at will—wars, political decisions, personal grudges. Even the smallest change could ripple into unforeseen consequences for millions of lives. While its a fascinating concept, time travel could destabilize society in ways we cant even predict.' },
    ],
    likes: 1200,
    comments: 152,
    shares: 1200,
    image: require('./assets/images/post_image2.jpg'),
    highlightedComments: [
      { id: '1', username: 'thedebateguy12', content: 'What if someone accidentally changes the whole future? Too risky IMO...' },
      { id: '2', username: 'anotheruser', content: '"Totally agree! Time travel should be allowed—imagine all the amazing things we could fix or learn from the past!"' },
    ],
    upvotes: 1200,
    downvotes: 150,
  },
  {
    id: '3',
    username: 'non_timetraveller',
    profileImage: require('./assets/images/profile3.png'),
    time: '2 hr',
    slides: [
      { id: '1', type: 'Claim', content: 'The 4-day work week is the key to improving productivity and mental health.' },
      { id: '2', type: 'Text', content: 'Studies have shown that employees who work fewer days are often more productive and happier. A shorter work week could reduce burnout, increase focus, and give people more time to spend with family or pursue hobbies. Why hasnt this been implemented widely yet?' },
    ],
    likes: 1200,
    comments: 152,
    shares: 1200,
    image: require('./assets/images/post_image3.jpg'),
    highlightedComments: [
      { id: '1', username: 'thedebateguy12', content: 'What if someone accidentally changes the whole future? Too risky IMO...' },
      { id: '2', username: 'anotheruser', content: '"Totally agree! Time travel should be allowed—imagine all the amazing things we could fix or learn from the past!"' },
    ],
    upvotes: 1200,
    downvotes: 150,
  },
];

const screenWidth = Dimensions.get('window').width;

const Posts = () => {
  return (
    <ScrollView contentContainerStyle={styles.postsContainer}>
      {postsData.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ScrollView>
  );
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSlideChange = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentSlideIndex(slideIndex);
  };

  return (
    <View style={styles.postCard}>
      {/* Profile Info */}
      <View style={styles.postHeader}>
        <Image source={post.profileImage} style={styles.profileImage} />
        <View>
          <Text style={styles.postUsername}>{post.username}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
      </View>

      {/* Slider Section */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleSlideChange(event)}
        scrollEventThrottle={16}
      >
        {post.slides.map((slide, index) => (
          <View key={slide.id} style={[styles.slide, { width: screenWidth }]}>
            <Image source={post.image} style={styles.postImage} />
            {/* Top Left Overlay for Slide Type */}
            <Text style={styles.overlayType}>{slide.type}</Text>
            {/* Top Right Overlay for Slide Counter */}
            <Text style={styles.overlayCounter}>{`${index + 1}/${post.slides.length}`}</Text>
            {/* Center Content */}
            <View style={styles.centerOverlay}>
              <Text style={styles.overlayContent}>{slide.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Actions */}
      <View style={styles.postActions}>
        <View style={styles.voteActions}>
          <TouchableOpacity>
            <Text style={styles.upvoteText}>⬆ {post.upvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.downvoteText}>⬇ {post.downvotes}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.shareText}>🔗 {post.shares}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.commentText}>💬 {post.comments}</Text>
        </TouchableOpacity>
      </View>

      {/* Highlighted Comments */}
      <View style={styles.highlightedComments}>
        {post.highlightedComments.map((comment) => (
          <Text key={comment.id} style={styles.comment}>
            <Text style={styles.commentUsername}>{comment.username}: </Text>
            {comment.content}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    backgroundColor: '#181818',
    paddingBottom: 75,
  },
  postCard: {
    marginBottom: 0,
    backgroundColor: '#222',
    borderRadius: 8,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#181818',
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  postUsername: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTime: {
    color: '#888',
    fontSize: 12,
  },
  slide: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  overlayType: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  overlayCounter: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  centerOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -screenWidth * 0.4 }, { translateY: '-50%' }], 
    width: screenWidth * 0.8,
    maxHeight: 200,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContent: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    flexShrink: 1, 
    flexWrap: 'wrap', 
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#181818',
  },
  voteActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvoteText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  downvoteText: {
    color: '#fff',
    fontSize: 14,
  },
  shareText: {
    color: '#fff',
    fontSize: 14,
  },
  commentText: {
    color: '#fff',
    fontSize: 14,
  },
  highlightedComments: {
    padding: 16,
    backgroundColor: '#181818',
  },
  comment: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  commentUsername: {
    fontWeight: 'bold',
    color: '#ffcc00',
  },
});


export default Posts;
