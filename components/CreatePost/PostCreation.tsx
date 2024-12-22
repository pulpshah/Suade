import React from 'react';
import { View, TextInput, StyleSheet, Image, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PostCreation = () => {
  return (
    <View style={styles.createPostContainer}>
      <View style={styles.postPreviewContainer}>
        <Image
          source={require('./assets/images/post_image1.jpg')}
          style={styles.postImage}
        />
        <View style={styles.inputOverlay}>
          <View style={styles.outerFrame}>
            <View style={styles.innerFrame}>
              <TextInput
                style={styles.inputText}
                placeholder="Set title"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
              />
            </View>
          </View>
        </View>
        <View style={styles.diceContainer}>
          <Image
            source={require('./assets/icons/dice-icon.png')}
            style={styles.diceIcon}
          />
        </View>
      </View>
      <View style={styles.postEditorContainer}>
        <ScrollView
          style={styles.editorContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Title Tile */}
          <View style={styles.tileWrapper}>
            <View style={styles.titleTileContainer}>
              <Image 
                source={require('./assets/images/title_preview1.png')}
                style={{ width: 114, height: 114 }}
              />
            </View>
            <Text style={styles.tileText} numberOfLines={1}>
              Title
            </Text>
          </View>

          {/* Slide 1 Tile */}
          <View style={styles.tileWrapper}>
            <LinearGradient
              colors={['rgba(145, 47, 86, 0.60)', 'rgba(113, 128, 185, 0.60)']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.slideTileContainer}
            >
              <Text style={styles.numberText} numberOfLines={1}>
                1
              </Text>
            </LinearGradient>
            <Text style={styles.tileText} numberOfLines={1}>
              Slide 1
            </Text>
          </View>

          {/* New Slide Tile */}
          <View style={styles.tileWrapper}>
            <LinearGradient
              colors={[
                'rgba(145, 47, 86, 0.60)', // Gradient start color
                'rgba(113, 128, 185, 0.60)', // Gradient end color
              ]}
              start={{ x: 1, y: 0 }} // Gradient direction
              end={{ x: 0, y: 0 }}
              style={styles.slideTileContainer}
            >
              <View style={styles.addIconContainer}>
                <Image 
                  source={require('./assets/icons/add-icon.png')}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            </LinearGradient>
            <Text style={styles.tileText} numberOfLines={1}>
              New Slide
            </Text>
          </View>

          {/* Slide 10 Tile */}
          <View style={styles.tileWrapper}>
            <LinearGradient
              colors={['rgba(145, 47, 86, 0.60)', 'rgba(113, 128, 185, 0.60)']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.slideTileContainer}
            >
              <Text style={styles.numberText} numberOfLines={1}>
                10
              </Text>
            </LinearGradient>
            <Text style={styles.tileText} numberOfLines={1}>
              Slide 10
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    createPostContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between', // Adjusts space between child containers
    alignItems: 'center',
    },
    postPreviewContainer: {
        flex: 0, // Prevents stretching
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      },
  postImage: {
    width: 390,
    height: 390,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
  inputOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerFrame: {
    padding: 4,
    borderWidth: 1.03,
    borderColor: 'rgba(255, 255, 255, 0.50)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '80%',
  },
  innerFrame: {
    padding: 10,
    backgroundColor: 'rgba(30, 30, 30, 0.70)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  inputText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.3,
    opacity: 0.6,
    textShadowColor: 'rgba(0, 0, 0, 0.18)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 4,
    width: '100%',
  },
  diceContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 33,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  diceIcon: {
    width: 25,
    height: 27,
  },
  postEditorContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 2,
  },
  editorContainer: {
    flexDirection: 'row',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 114,
    marginBottom: 6
  },
  titleTileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 114,
    height: 114,
  },
  tileText: {
    color: '#FFF',
    fontFamily: 'Noto Sans',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  slideTileContainer: {
    width: 114,
    height: 114.092,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: 'rgba(234, 242, 239, 0.20)',
    shadowColor: 'rgba(0, 0, 0, 0.80)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 11.724,
  },
  numberText: {
    color: 'rgba(234, 242, 239, 0.25)',
    fontFamily: 'Roc Grotesk',
    fontSize: 50,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.80)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1.6,
    letterSpacing: 0.293,
  },
  addIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1.639,
    borderWidth: 1.639,
    borderColor: 'rgba(255, 255, 255, 0.80)',
    shadowOpacity: 1,
    shadowRadius: 6.555,
    elevation: 6,
  },
});

export default PostCreation;
