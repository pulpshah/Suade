import React, { useState } from 'react';
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

// -------------------
// Types & Mock Data
// -------------------
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

// Sample data (3 posts)
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
          'With the rapid development of AI, its inevitable that we encounter situations where machines are trusted with life-critical decisions...',
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
        content: 'What if someone accidentally changes the whole future?',
      },
      {
        id: '2',
        username: 'anotheruser',
        content:
          'Totally agree! Time travel should be allowed—imagine all the amazing things we could fix...',
      },
      {
        id: '3',
        username: 'Beckham',
        content: 'What if you become a millionaire?',
      },
      {
        id: '4',
        username: 'Football',
        content:
          'I can fix it',
      },
      {
        id: '5',
        username: 'New York',
        content: 'DO you like new york subway?',
      },
      {
        id: '6',
        username: 'Winter',
        content:
          'It is very cold outside',
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
          'Imagine the chaos if people could rewrite history at will—wars, political decisions...',
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
        content: 'Too risky IMO...',
      },
      {
        id: '2',
        username: 'anotheruser',
        content:
          'Totally agree! Time travel should be allowed—imagine all the amazing things...',
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
          'Studies have shown employees who work fewer days are more productive and happier...',
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
        content: 'What if someone accidentally changes the whole future?',
      },
      {
        id: '2',
        username: 'anotheruser',
        content:
          'Totally agree! Time travel should be allowed—imagine the amazing things we could fix...',
      },
    ],
    upvotes: 1200,
    downvotes: 150,
  },
];

// -------------------
// Props
// -------------------
interface PostsProps {
  expandedPostId: string | null;
  onExpandPost: (postId: string | null) => void;
}

const screenWidth = Dimensions.get('window').width;

// -------------------
// Main "Posts" component
// -------------------
const Posts: React.FC<PostsProps> = ({ expandedPostId, onExpandPost }) => {
  return (
    <ScrollView contentContainerStyle={styles.postsContainer} nestedScrollEnabled={true}>
      {postsData.map((post) => {
        // If there's an expanded post, only show that one
        if (expandedPostId && expandedPostId !== post.id) {
          return null;
        }
        // isExpanded = whether THIS post is the expanded one
        const isExpanded = expandedPostId === post.id;

        return (
          <PostCard
            key={post.id}
            post={post}
            isExpanded={isExpanded}
            onToggleExpand={(expand) => {
              // If expand = true, tell parent which post ID
              // If expand = false, collapse to null
              onExpandPost(expand ? post.id : null);
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default Posts;

// -------------------
// Child "PostCard"
// -------------------
interface PostCardProps {
  post: Post;
  isExpanded: boolean;
  onToggleExpand: (shouldExpand: boolean) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  isExpanded,
  onToggleExpand,
}) => {
  // We keep your same styling / layout
  // The parent controls "which post is expanded"
  // so we no longer track local state.

  const [slideHeight] = useState(new Animated.Value(300));

  const handleSlideChange = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    // If you want the current slide index, you can do so here
    // But not required for hiding other posts
  };

  const toggleExpansion = () => {
    onToggleExpand(!isExpanded);
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

            {/* Top Left Overlay */}
            <Text style={styles.overlayType}>{slide.type}</Text>

            {/* Top Right Overlay */}
            <Text style={styles.overlayCounter}>
              {index + 1}/{post.slides.length}
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
                nestedScrollEnabled={true}
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
  {(isExpanded ? post.highlightedComments : post.highlightedComments.slice(0, 2)).map(
    (comment, idx) => {
      // Check if this is the Football comment
      const isFootballComment = comment.username === 'Football';
      const isBeckhamComment = comment.username === 'Beckham';

      if (isBeckhamComment) {
        return (
          <View
            key={comment.id}
            style={[
              styles.commentContainer,
              isExpanded
                ? styles.commentContainerExpanded
                : styles.commentContainerNormal,
            ]}
          >
            {/* Profile Image (visible only when expanded) */}
            {isExpanded && (
              <Image
                source={require('./assets/images/profile1.png')}
                style={styles.commentProfileImage}
              />
            )}

            {/* Comment Content */}
            <View style={styles.commentContentContainer}>
              <View style={styles.commentHeader}>
              <Text
                style={[
                  styles.commentUsername,
                  { color: '#FFD700' }, // Gold color for Beckham
                ]}
              >
                {comment.username}
              </Text>
                
                {/* Diamond Image */}
                <Image
                  source={require('@/assets/images/diamond.png')}
                  style={styles.diamondImage}
                />
                
                <Text style={styles.commentTime}>· 1hr</Text>
              </View>
              <Text style={styles.commentContent}>{comment.content}</Text>

              {isExpanded && (
                <Text style={styles.commentReplies}>15 Replies</Text>
              )}
            </View>
            <View style={styles.commentIconsContainer}>
              <Image
                source={require('@/assets/images/left.png')}
                style={styles.commentBackArrow}
              />
              <Image
                source={require('@/assets/images/smily.png')}
                style={styles.commentSmiley}
              />
            </View>
          </View>
        );
      }

      if (isFootballComment) {
        // Special Football comment style
        return (
          <View key={comment.id} style={styles.footballCommentWrapper}>
          <View style={styles.footballCommentContainer}>
            <View style={styles.commentContentContainer}>
              <View style={styles.commentHeader}>
                <Text style={styles.footballCommentUsername}>
                  {comment.username}
                </Text>
                <Text style={styles.footballCommentTime}>
                  · 1hr
                </Text>
              </View>
              <Text style={styles.footballCommentContent}>
                {comment.content}
              </Text>
              <Text style={styles.footballCommentReplies}>
                15 Replies
              </Text>
            </View>
            
            <View style={styles.commentIconsContainer}>
              <Image
                source={require('@/assets/images/left.png')}
                style={styles.commentBackArrow}
              />
              <Image
                source={require('@/assets/images/smily.png')}
                style={styles.commentSmiley}
              />
            </View>
          </View>
          <Image
            source={require('./assets/images/profile1.png')}
            style={styles.footballProfileImage}
          />
        </View>
        );
      }

      // Regular comment style for all other comments
      return (
        <View
              key={comment.id}
              style={[
                styles.commentContainer,
                isExpanded ? styles.commentContainerExpanded : styles.commentContainerNormal,
              ]}
            >
              {/* Show profile image only if expanded */}
              {isExpanded && (
                <Image
                  source={
                    idx % 3 === 0
                      ? require('./assets/images/profile1.png')
                      : idx % 3 === 1
                      ? require('./assets/images/profile2.png')
                      : require('./assets/images/profile3.png')
                  }
                  style={styles.commentProfileImage}
                />
              )}

              {/* Comment Content */}
              <View style={styles.commentContentContainer}>
                <View style={styles.commentHeader}>
                  <Text
                    style={[
                      styles.commentUsername,
                      { color: '#fff' },
                      !isExpanded && { fontSize: 12 },
                    ]}
                  >
                    {comment.username}
                  </Text>
                  <Text
                    style={[
                      styles.commentTime,
                      !isExpanded && { fontSize: 10, color: '#777' },
                    ]}
                  >
                    · 1hr
                  </Text>
                </View>
                <Text
                  style={[
                    styles.commentContent,
                    !isExpanded && { fontSize: 12, color: '#aaa', lineHeight: 16 },
                  ]}
                >
                  {comment.content}
                </Text>
                {isExpanded && (
                  <Text style={styles.commentReplies}>15 Replies</Text>
                )}
              </View>
              {isExpanded && (
                <View style={styles.commentIconsContainer}>
                  <Image
                    source={require('@/assets/images/left.png')} // Back Arrow
                    style={styles.commentBackArrow}
                  />
                  <Image
                    source={require('@/assets/images/smily.png')} // Smiley
                    style={styles.commentSmiley}
                  />
                </View>
              )}
              
            </View>
      );
    }
  )}
</View>



    </View>
  );
};

// --------------
// Styles (unchanged from your code)
// --------------
const styles = StyleSheet.create({
  postsContainer: {
    backgroundColor: '#181818',
    paddingBottom: 75,
  },
  diamondImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 0, // Spacing between the username and time
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
  commentIconsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    transform: [
      { translateX: -(screenWidth * 0.4) },
      { translateY: -100 },
    ],
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
  commentContainerNormal: {
    width: '100%',
    marginLeft: 0,
    alignSelf: 'center',
  },
  commentContainerExpanded: {
    width: '85%',
    marginLeft: 40,
    alignSelf: 'flex-end',
  },
  commentProfileImage: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 0,
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
    color: '#fff',
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
  },
  footballCommentUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  footballCommentTime: {
    fontSize: 12,
    color: '#666', // Darkened for better contrast on white
    marginLeft: 4,
  },
  footballCommentContent: {
    marginTop: 4,
    fontSize: 14,
    color: '#000', // Changed to black for better contrast on white
    lineHeight: 18,
  },
  footballCommentReplies: {
    marginTop: 4,
    fontSize: 12,
    color: '#666', // Darkened for better contrast on white
    textAlign: 'right',
  },
  commentBackArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#666', // Added tint color for better contrast on white
  },
  commentSmiley: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#666', // Added tint color for better contrast on white
  },
  footballCommentWrapper: {
    position: 'relative',
    marginBottom: 25,
    width: '90%',
  },
  footballCommentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#444',
    position: 'relative',
    borderRadius: 8,
    width: '100%',
  },
  footballProfileImage: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 15,
    right: -40,
    borderWidth: 2,
    borderColor: '#181818',
  },
  diamondBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex: -1, // Ensure it stays behind the comment content
  },
  beckhamCommentContainer: {
    position: 'relative',
    padding: 12,
    backgroundColor: 'transparent', // To let the diamond background show
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  beckhamCommentUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  beckhamCommentTime: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
  beckhamCommentContent: {
    marginTop: 4,
    fontSize: 14,
    color: '#fff',
    lineHeight: 18,
  },
  
});
