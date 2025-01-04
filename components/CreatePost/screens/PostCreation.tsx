import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AddIcon from "../assets/icons/add-icon.svg";
import DiceIcon from "../assets/icons/dice-icon.svg";
import SaturnIcon from "../assets/icons/saturn-icon.svg"
import AtIcon from "../assets/icons/@-icon.svg"
import ImageIcon from "../assets/icons/image-icon.svg"
import GearIcon from "../assets/icons/gear-icon.svg"
import { RouteProp } from "@react-navigation/native";
import { CreatePostStackParamList } from "../types";
import Layout from "../_layout";

type PostCreationProps = {
  route: RouteProp<CreatePostStackParamList, "PostCreation">;
};

// Define gradient combinations
const gradients: readonly [string, string][] = [
  ["#FF6B6B", "#4ECDC4"],
  ["#A8E6CF", "#DCEDC1"],
  ["#FFD93D", "#FF6B6B"],
  ["#95E1D3", "#EAFFD0"],
  ["#6C5B7B", "#C06C84"],
  ["#7F7FD5", "#86A8E7"],
  ["#654EA3", "#EAAFC8"],
  ["#FF867C", "#FF9F87"],
  ["#42275A", "#734B6D"],
  ["#2F80ED", "#56CCF2"],
] as const;

interface CustomSlide {
  id: string;
  gradientColors: readonly [string, string];
}

const PostCreation = ({ route }: { route: any }) => {
  const { selectedImages = [] } = route.params;
  const titleSlideURI = require("../assets/images/post_image1.jpg");
  const [previewImage, setPreviewImage] = useState<string | null>(titleSlideURI);
  const [customSlides, setCustomSlides] = useState<CustomSlide[]>([]);
  const [selectedCustomSlide, setSelectedCustomSlide] = useState<string | null>(null);

  const isTitleSlide = previewImage === titleSlideURI;
  const totalSlides = selectedImages.length + customSlides.length;

  const handleAddNewSlide = () => {
    if (totalSlides < 10) {
      const newSlide: CustomSlide = {
        id: `custom-${Date.now()}`,
        gradientColors: gradients[customSlides.length % gradients.length],
      };
      setCustomSlides([...customSlides, newSlide]);
      // Automatically select the new slide
      setPreviewImage(null);
      setSelectedCustomSlide(newSlide.id);
    }
  };

  const handleCustomSlideSelect = (slide: CustomSlide) => {
    setPreviewImage(null);
    setSelectedCustomSlide(slide.id);
  };

  const renderPreview = () => {
    if (previewImage) {
      return (
        <Image
          source={
            typeof previewImage === "string"
              ? { uri: previewImage }
              : previewImage
          }
          style={styles.postImage}
          onError={(e) => console.error("Image Load Error:", e.nativeEvent.error)}
        />
      );
    } else if (selectedCustomSlide) {
      const selectedSlide = customSlides.find(slide => slide.id === selectedCustomSlide);
      return (
        <LinearGradient
          colors={selectedSlide?.gradientColors || gradients[0]}
          style={styles.postImage}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      );
    }
    return <Text style={styles.noPreviewText}>Select a Slide to Preview</Text>;
  };

  return (
    <Layout>
      <View style={styles.createPostOuterContainer}>
        <View style={styles.createPostInnerContainer}>
          <View style={styles.postPreviewContainer}>
            <View style={styles.toolbarContainer}>
              <View style={styles.diceDiv}>
                <DiceIcon />
              </View>

              <View style={styles.editingToolbar}>
                {isTitleSlide ? (
                  <>
                    <View style={styles.iconContainer}>
                      <ImageIcon style={styles.icon} />
                    </View>
                    <View style={styles.iconContainer}>
                      <GearIcon style={styles.icon} />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.iconContainer}>
                      <SaturnIcon style={styles.icon} />
                    </View>
                    <View style={styles.iconContainer}>
                      <AtIcon style={styles.icon} />
                    </View>
                    <View style={styles.iconContainer}>
                      <ImageIcon style={styles.icon} />
                    </View>
                    <View style={styles.iconContainer}>
                      <GearIcon style={styles.icon} />
                    </View>
                  </>
                )}
              </View>
            </View>

            {renderPreview()}

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
          </View>

          <View style={styles.postEditorContainer}>
            <ScrollView
              style={styles.editorContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              decelerationRate="normal"
              snapToAlignment="start"
              directionalLockEnabled={true}
              alwaysBounceHorizontal={true}
              pagingEnabled={false}
              scrollEventThrottle={16}
            >
              <TouchableOpacity onPress={() => {
                setPreviewImage(titleSlideURI);
                setSelectedCustomSlide(null);
              }}>
                <View style={styles.tileWrapper}>
                  <LinearGradient
                    colors={[
                      "rgba(145, 47, 86, 0.60)",
                      "rgba(113, 128, 185, 0.60)",
                    ]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.slideTileContainer}
                  >
                    <Image
                      source={titleSlideURI}
                      style={styles.slideTileImage}
                    />
                  </LinearGradient>
                  <Text style={styles.tileText} numberOfLines={1}>
                    Title
                  </Text>
                </View>
              </TouchableOpacity>

              {selectedImages.map((imageUri: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setPreviewImage(imageUri);
                    setSelectedCustomSlide(null);
                  }}
                >
                  <View style={styles.tileWrapper}>
                    <LinearGradient
                      colors={[
                        "rgba(145, 47, 86, 0.60)",
                        "rgba(113, 128, 185, 0.60)",
                      ]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={[
                        styles.slideTileContainer,
                        previewImage === imageUri ? styles.selectedBorder : null,
                      ]}
                    >
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.slideTileImage}
                      />
                    </LinearGradient>
                    <Text style={styles.tileText} numberOfLines={1}>
                      Slide {index + 1}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {customSlides.map((slide, index) => (
                <TouchableOpacity
                  key={slide.id}
                  onPress={() => handleCustomSlideSelect(slide)}
                >
                  <View style={styles.tileWrapper}>
                    <LinearGradient
                      colors={slide.gradientColors}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[
                        styles.slideTileContainer,
                        selectedCustomSlide === slide.id ? styles.selectedBorder : null,
                      ]}
                    />
                    <Text style={styles.tileText} numberOfLines={1}>
                      Slide {selectedImages.length + index + 1}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {totalSlides < 10 && (
                <TouchableOpacity onPress={handleAddNewSlide}>
                  <View style={styles.tileWrapper}>
                    <LinearGradient
                      colors={[
                        "rgba(145, 47, 86, 0.60)",
                        "rgba(113, 128, 185, 0.60)",
                      ]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 0 }}
                      style={styles.slideTileContainer}
                    >
                      <View style={styles.addIconContainerOuter}>
                        <View style={styles.addIconContainerInner}>
                          <AddIcon height={24} width={24} />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text style={styles.tileText} numberOfLines={1}>
                      New Slide
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  createPostOuterContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  createPostInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  postPreviewContainer: {
    position: "relative",
  },
  postImage: {
    width: 390,
    height: 390,
    backgroundColor: "lightgray",
  },
  toolbarContainer: {
    display: "flex",
    flexDirection: "row",
    width: 366,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    left: 12,
    top: 12,
    zIndex: 101,
  },
  diceDiv: {
    display: "flex",
    flexDirection: 'row',
    width: 33,
    height: 31,
    paddingVertical: 2,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    gap: 11.5,
    flexShrink: 0,
    shadowColor: "rgba(13, 9, 10, 0.10)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
    // boxShadow: "0px 0px 4.571px 0px rgba(0, 0, 0, 0.32)",
    // backdropFilter: "blur(13.714px)",
  },
  diceIcon: {
    width: 25,
    height: 25,
    flexShrink: 0,
    shadowColor: "rgba(255, 255, 255, 0.16)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4.571,
    // boxShadow: "0px 0px 2.286px rgba(13, 9, 10, 0.40) inset",
    // filter: "drop-shadow(0px 0px 4.571px rgba(255, 255, 255, 0.16))",
  },
  editingToolbar: {
    display: "flex",
    alignItems: "center",
    gap: 6.4,
    borderRadius: 1.702,
    flexDirection: "row",
  },
  iconContainer: {
    display: "flex",
    width: 32,
    height: 27.2,
    padding: 3.404,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8.511,
    borderRadius: 1.702,
    backgroundColor: "rgba(13, 9, 10, 0.20)",
    boxShadow: "0px 1.702px 3.2px rgba(0, 0, 0, 0.20)",
    backdropFilter: "blur(9.6px)",
  },
  iconInnerContainer: {
    display: "flex",
    flexDirection: 'row',
    height: 18.723,
    alignItems: "center",
    gap: 7.583,
    flexShrink: 0,
    alignSelf: "stretch",
  },
  iconContent: {
    display: "flex",
    height: 22.631,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 22,
    height: 22,
    flexShrink: 0,
  },
  inputOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  outerFrame: {
    padding: 4,
    borderWidth: 1.03,
    borderColor: "rgba(255, 255, 255, 0.50)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "80%",
  },
  innerFrame: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: "rgba(30, 30, 30, 0.70)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  inputText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Noto Sans",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0.3,
    opacity: 0.6,
    textShadowColor: "rgba(0, 0, 0, 0.18)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 4,
    width: "100%",
  },
  postEditorContainer: {
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems: "flex-start",
    paddingTop: 16,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 2,
  },
  editorContainer: {
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 0,
    paddingVertical: 4,
    flex: 1
  },
  tileWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 114,
    marginBottom: 6,
  },
  titleTileContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 114,
    height: 114,
  },
  tileText: {
    color: "#FFF",
    fontFamily: "Noto Sans",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  },
  slideTileContainer: {
    width: 114,
    height: 114.092,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "rgba(234, 242, 239, 0.20)",
    shadowColor: "rgba(0, 0, 0, 0.80)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 11.724,
  },
  numberText: {
    color: "rgba(234, 242, 239, 0.25)",
    fontFamily: "Roc Grotesk",
    fontSize: 50,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(255, 255, 255, 0.80)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1.6,
    letterSpacing: 0.293,
  },
  addIconContainerOuter: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1.639,
    borderWidth: 1.639,
    borderColor: "rgba(255, 255, 255, 0.80)",
    shadowOpacity: 1,
    shadowRadius: 6.555,
    transform: [{ rotate: '45deg' }],
    elevation: 6,
  },
  addIconContainerInner: {
    transform: [{ rotate: "-45deg" }],
  },
  slideTileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 2,
  },
  noPreviewText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: "rgba(234, 242, 239, 0.80)",
    borderRadius: 2,
  },
});

export default PostCreation;
