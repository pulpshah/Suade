import React, { useState } from 'react';
//////////////
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

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
      {
        id: '1',
        type: 'Question',
        content:
          'Should AI be allowed to make decisions in life-critical situations, like surgeries or autonomous driving?',
      },
      {
        id: '2',
        type: 'Text',
        content:
          'With the rapid development of AI, its inevitable that well encounter situations where machines are trusted with life-critical decisions. But can we fully trust an AI system when it comes to moral dilemmas or unpredictable human behavior? How do we ensure accountability if something goes wrong?',
      },
    ],
    likes: 1200,
    comments: 152,
    shares: 1200,
    image: require('./assets/images/post_image1.jpg'),
    highlightedComments: [
      {
        id: '1',
        username: 'thedebateguy12',
        content:
          'What if someone accidentally changes the whole future? Too risky IMO...',
      },
      {
        id: '2',
        username: 'anotheruser',
        content:
          '"Totally agree! Time travel should be allowed—imagine all the amazing things we could fix or learn from the past!"',
      },
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
      {
        id: '1',
        type: 'Claim',
        content: 'Time travel would be more of a curse than a blessing.',
      },
      {
        id: '2',
        type: 'Text',
        content:
          'Imagine the chaos if people could rewrite history at will—wars, political decisions, personal grudges. Even the smallest change could ripple into unforeseen consequences for millions of lives. While its a fascinating concept, time travel could destabilize society in ways we cant even predict.',
      },
    ],
    likes: 1200,
    comments: 152,
    shares: 1200,
    image: require('./assets/images/post_image2.jpg'),
    highlightedComments: [
      {
        id: '1',
        username: 'thedebateguy12',
        content:
          'What if someone accidentally changes the whole future? Too risky IMO...',
      },
      {
        id: '2',
        username: 'anotheruser',
        content:
          '"Totally agree! Time travel should be allowed—imagine all the amazing things we could fix or learn from the past!"',
      },
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
      {
        id: '1',
        type: 'Claim',
        content:
          'The 4-day work week is the key to improving productivity and mental health.',
      },
      {
        id: '2',
        type: 'Text',
        content:
          'Studies have shown that employees who work fewer days are often more productive and happier. A shorter work week could reduce burnout, increase focus, and give people more time to spend with family or pursue hobbies. Why hasnt this been implemented widely yet?',
      },
    ],
    likes: 1200,
    comments: 152,
    shares: 1200,
    image: require('./assets/images/post_image3.jpg'),
    highlightedComments: [
      {
        id: '1',
        username: 'thedebateguy12',
        content:
          'What if someone accidentally changes the whole future? Too risky IMO...',
      },
      {
        id: '2',
        username: 'anotheruser',
        content:
          '"Totally agree! Time travel should be allowed—imagine all the amazing things we could fix or learn from the past!"',
      },
    ],
    upvotes: 1200,
    downvotes: 150,
  },
];

const screenWidth = Dimensions.get('window').width;

// This is the function coming from HomePage
interface PostsProps {
  onAnyPostExpand: (expanded: boolean) => void;
}

// -- PARENT COMPONENT: "Posts" --
const Posts: React.FC<PostsProps> = ({ onAnyPostExpand }) => {
  return (
    <ScrollView contentContainerStyle={styles.postsContainer}>
      {postsData.map((post) => (
        <PostCard key={post.id} post={post} onAnyPostExpand={onAnyPostExpand} />
      ))}
    </ScrollView>
  );
};

// -- CHILD COMPONENT: "PostCard" --
interface PostCardProps {
  post: Post;
  onAnyPostExpand: (expanded: boolean) => void;
}
///
///
const PostCard: React.FC<PostCardProps> = ({ post, onAnyPostExpand }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const slideHeight = useState(new Animated.Value(300))[0];

  const handleSlideChange = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth
    );
    setCurrentSlideIndex(slideIndex);
  };

  const toggleExpansion = () => {
    const nextValue = !isExpanded;
    setIsExpanded(nextValue);
    // Notify parent if we are expanding or unexpanding
    onAnyPostExpand(nextValue);
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
        onScroll={handleSlideChange}
        scrollEventThrottle={16}
      >
        {post.slides.map((slide, index) => (
          <View key={slide.id} style={[styles.slide, { width: screenWidth }]}>
            <Image source={post.image} style={styles.postImage} />
            {/* Top Left Overlay for Slide Type */}
            <Text style={styles.overlayType}>{slide.type}</Text>
            {/* Top Right Overlay for Slide Counter */}
            <Text style={styles.overlayCounter}>
              {`${index + 1}/${post.slides.length}`}
            </Text>

            {/* Center Content Overlay */}
            <View
              style={[
                styles.centerOverlay,
                isExpanded && styles.centerOverlayExpanded,
              ]}
            >
              <ScrollView
                style={styles.contentScrollView}
                showsVerticalScrollIndicator={false}
              >
                <Text
                  style={[
                    styles.overlayContent,
                    isExpanded && styles.overlayContentExpanded,
                  ]}
                >
                  {slide.content}
                </Text>
              </ScrollView>

              {/* Toggle Icon */}
              <TouchableOpacity style={styles.toggleIcon} onPress={toggleExpansion}>
                <Image
                  source={require('@/assets/images/expand-03.png')}
                  style={styles.toggleImage}
                />
              </TouchableOpacity>
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
  {post.highlightedComments.map((comment, index) => (
    <View 
      key={comment.id} 
      style={[
        styles.commentContainer,
        isExpanded ? styles.commentContainerExpanded : styles.commentContainerNormal
      ]}
    >
      {/* Profile Image (Only in Expanded View) */}
      {isExpanded && (
        <Image
          source={
            index % 2 === 0
              ? require('./assets/images/profile1.png')
              : require('./assets/images/profile2.png')
          }
          style={styles.commentProfileImage}
        />
      )}

      {/* Comment Content */}
      <View style={styles.commentContentContainer}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUsername}>{comment.username}</Text>
          <Text style={styles.commentTime}> · 1hr</Text>
        </View>
        <Text style={styles.commentContent}>{comment.content}</Text>

        {/* 15 Replies (Right-Aligned) */}
        <Text style={styles.commentReplies}>15 Replies</Text>
      </View>
    </View>
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
    resizeMode: 'cover',
  },
  overlayType: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    transform: [{ translateX: -(screenWidth * 0.4) }, { translateY: -100 }],
    width: screenWidth * 0.8,
    maxHeight: 200,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  centerOverlayExpanded: {
    height: 'auto',
    maxHeight: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  contentScrollView: {
    flexGrow: 1,
    width: '100%',
    padding: 15,
  },
  overlayContent: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  overlayContentExpanded: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  toggleIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleImage: {
    width: 15,
    height: 15,
    backgroundColor: 'transparent',
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
  // highlightedComments: {
  //   padding: 16,
  //   backgroundColor: '#181818',
  // },
  comment: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  // commentUsername: {
  //   fontWeight: 'bold',
  //   color: '#ffcc00',
  // },
  // Update the commentContainer and related style

  highlightedComments: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#181818',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
    position: 'relative',
    borderRadius: 8,
  },
  // Style for normal (unexpanded) state
  commentContainerNormal: {
    width: '100%',
    marginLeft: 0,
    alignSelf: 'center',
  },
  // Style for expanded state
  commentContainerExpanded: {
    width: '85%',
    marginLeft: 40,
    alignSelf: 'flex-end',
  },
  commentProfileImage: {
    width: 40,
    height: 40,
   
    position: 'absolute',
    bottom: -10,
    left: -50,
    borderWidth: 2,
    borderColor: '#181818',
  },
  commentContentContainer: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffcc00',
  },
  commentTime: {
    fontSize: 12,
    color: '#888',
  },
  commentContent: {
    marginTop: 4,
    fontSize: 14,
    color: '#fff',
    lineHeight: 18,
  },
  commentReplies: {
    marginTop: 4,
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
  }
  
  
  
  
  
  
  
});

// Export the "Posts" component as the default
export default Posts;
