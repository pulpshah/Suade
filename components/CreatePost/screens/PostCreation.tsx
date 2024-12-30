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
import Header from "../Header";
import AddIcon from "../assets/icons/add-icon.svg";
import { RouteProp } from "@react-navigation/native";
import { CreatePostStackParamList } from "../types";

type PostCreationProps = {
  route: RouteProp<CreatePostStackParamList, "PostCreation">;
};

const PostCreation = ({ route }: { route: any }) => {
  const { selectedImages = [] } = route.params;

  // Title slide URI
  const titleSlideURI = require("../assets/images/post_image1.jpg");

  // Initialize previewImage with the title slide
  const [previewImage, setPreviewImage] = useState<string | null>(
    titleSlideURI
  );

  return (
    <View style={styles.createPostContainer}>
      <Header />
      {/* Image Preview */}
      <View style={styles.postPreviewContainer}>
        {previewImage ? (
          <Image
            source={
              typeof previewImage === "string"
                ? { uri: previewImage }
                : previewImage
            }
            style={styles.postImage}
            onError={(e) =>
              console.error("Image Load Error:", e.nativeEvent.error)
            }
          />
        ) : (
          <Text style={styles.noPreviewText}>Select a Slide to Preview</Text>
        )}
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
            source={require("../assets/icons/dice-icon.svg")}
            style={styles.diceIcon}
          />
        </View>
      </View>

      {/* Slides */}
      <View style={styles.postEditorContainer}>
        <ScrollView
          style={styles.editorContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Title Slide */}
          <TouchableOpacity onPress={() => setPreviewImage(titleSlideURI)}>
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
                <Image source={titleSlideURI} style={styles.slideTileImage} />
              </LinearGradient>
              <Text style={styles.tileText} numberOfLines={1}>
                Title
              </Text>
            </View>
          </TouchableOpacity>

          {/* Dynamically Rendered Slides */}
          {selectedImages.map((imageUri: string, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => setPreviewImage(imageUri)}
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

          {/* New Slide Placeholder */}
          <View style={styles.tileWrapper}>
            <LinearGradient
              colors={["rgba(145, 47, 86, 0.60)", "rgba(113, 128, 185, 0.60)"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.slideTileContainer}
            >
              <View style={styles.addIconContainer}>
                <AddIcon height={24} width={24} />
              </View>
            </LinearGradient>
            <Text style={styles.tileText} numberOfLines={1}>
              New Slide
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
    flexDirection: "column",
    justifyContent: "center", // Adjusts space between child containers
    alignItems: "center",
  },
  postPreviewContainer: {
    flex: 0, // Prevents stretching
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  postImage: {
    width: 390,
    height: 390,
    borderRadius: 8,
    backgroundColor: "lightgray",
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
  diceContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 33,
    height: 31,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  diceIcon: {
    width: 25,
    height: 27,
  },
  postEditorContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 2,
  },
  editorContainer: {
    flexDirection: "row",
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
  addIconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1.639,
    borderWidth: 1.639,
    borderColor: "rgba(255, 255, 255, 0.80)",
    shadowOpacity: 1,
    shadowRadius: 6.555,
    elevation: 6,
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
