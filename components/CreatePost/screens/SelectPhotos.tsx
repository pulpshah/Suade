import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import CreateNav from "../CreateNav";
import CameraIcon from "../assets/icons/camera-icon.svg";
import { useNavigation } from "@react-navigation/native";
import { CreatePostStackParamList } from '../types';
import Header from "../Header";
import BottomButtons from "../BottomButtons";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PermissionStatus = MediaLibrary.PermissionStatus;
type Asset = MediaLibrary.Asset;

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");
const IMAGE_SIZE = 96;
const PREVIEW_HEIGHT_RATIO = 0.4;

type SelectPhotosNavigationProp = NativeStackNavigationProp<CreatePostStackParamList, 'SelectPhotos'>;

const SelectPhotos: React.FC = () => {
  const [selectedScreen, setSelectedScreen] = useState<'Post' | 'Take'>('Post');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isMultipleSelection, setIsMultipleSelection] = useState(false);
  const [photos, setPhotos] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus | null>(null);
  const [resolvedPhotos, setResolvedPhotos] = useState<{
    [key: string]: string;
  }>({});

  const navigation = useNavigation<SelectPhotosNavigationProp>();

  const handleNext = () => {
    const imagesToPass = isMultipleSelection
      ? selectedImages
      : selectedImage
      ? [selectedImage]
      : [];

    if (imagesToPass.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    navigation.navigate("PostCreation", { selectedImages: imagesToPass });
  };

  // Function to resolve ph:// URIs to file:// URIs
  const resolveUri = async (asset: MediaLibrary.Asset): Promise<string> => {
    try {
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);

      if (assetInfo.localUri) {
        return assetInfo.localUri;
      }

      const fileUri = `${FileSystem.cacheDirectory}${asset.filename}`;
      await FileSystem.copyAsync({
        from: asset.uri,
        to: fileUri,
      });

      return fileUri;
    } catch (error) {
      console.error("Error resolving URI:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setPermissionStatus(status);
        if (status === "granted") {
          const album = await MediaLibrary.getAssetsAsync({
            first: 50,
            mediaType: MediaLibrary.MediaType.photo,
          });
  
          setPhotos(album.assets);
  
          const resolvedUris: { [key: string]: string } = {};
          await Promise.all(
            album.assets.map(async (asset) => {
              try {
                resolvedUris[asset.id] = await resolveUri(asset);
              } catch (error) {
                console.error(
                  `Error resolving URI for asset ${asset.id}:`,
                  error
                );
              }
            })
          );
  
          setResolvedPhotos(resolvedUris);
  
          if (album.assets.length > 0 && resolvedUris[album.assets[0].id]) {
            setSelectedImage(resolvedUris[album.assets[0].id]);
          }
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPhotos();
  }, []);

  const handleSelectImage = async (asset: MediaLibrary.Asset) => {
    const resolvedUri = await resolveUri(asset);
    if (isMultipleSelection) {
      if (selectedImages.includes(resolvedUri)) {
        const updatedSelection = selectedImages.filter(
          (uri) => uri !== resolvedUri
        );
        setSelectedImages(updatedSelection);
      } else {
        if (selectedImages.length < 10) {
          setSelectedImages([...selectedImages, resolvedUri]);
        }
      }
    } else {
      setSelectedImage(resolvedUri);
    }
  };

  const toggleMultipleSelection = () => {
    setIsMultipleSelection(!isMultipleSelection);
    setSelectedImages([]);
  };

  if (permissionStatus === null) {
    return <Text>Requesting Permissions...</Text>;
  }

  if (permissionStatus !== "granted") {
    return (
      <Text>
        Permission to access camera roll is required to use this feature.
      </Text>
    );
  }

  return (
    <ExpoLinearGradient
      style={styles.gradient}
      colors={["rgba(0, 0, 0, 0.70)", "#4B6897"]}
      locations={[0, 1]}
    >
      {/* CREATE POST Container */}
      <Header />
      <View style={styles.outerContainer}>
        {/* Frame 116 */}
        <CreateNav
          selectedScreen={selectedScreen}
          setSelectedScreen={setSelectedScreen}
        />
        {/* Frame 131 */}
        <View style={styles.selectPhotosOuterContainer}>
          {/* Frame 133 */}
          <View style={styles.photoPreviewContainer}>
            {isMultipleSelection && selectedImages.length > 0 ? (
              <Image
                source={{ uri: selectedImages[selectedImages.length - 1] }}
                style={styles.photoPreviewImage}
              />
            ) : selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.photoPreviewImage}
              />
            ) : (
              <Text style={styles.noImageText}>No Image Selected</Text>
            )}
          </View>
          {/* Frame 134 */}
          <View style={styles.middleContainer}>
            {/* Frame 70 */}
            <View style={styles.recentsTextContainer}>
              <Text style={styles.recentsText}>Recents</Text>
            </View>
            {/* Frame 147 */}
            <View style={styles.selectOrCameraContainer}>
              {/* Frame 71 */}
              <TouchableOpacity
                onPress={toggleMultipleSelection}
                style={styles.selectTextContainer}
              >
                <Text style={styles.selectText}>
                  {isMultipleSelection
                    ? `Select ${selectedImages.length}`
                    : "Select"}
                </Text>
              </TouchableOpacity>
              {/* camera-01 frame */}
              <View style={styles.cameraIconContainer}>
                <CameraIcon width={15} height={12.5} />
              </View>
            </View>
          </View>
          {/* Frame 132 */}
          <View style={styles.photoGridOuterContainer}>
            <ScrollView
              style={styles.photoGridInnerContainer}
              contentContainerStyle={{
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 2,
                alignSelf: "stretch",
                flexGrow: 1,
              }}
            >
              {photos.map((photo) => {
                const resolvedUri = resolvedPhotos[photo.id];
                if (!resolvedUri) return null; // Skip rendering if no URI is available
                
                const selectionIndex = selectedImages.indexOf(resolvedUri) + 1;
                return (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => handleSelectImage(photo)}
                  >
                    <View style={{ position: "relative" }}>
                      <Image
                        source={{ uri: resolvedUri }}
                        style={[
                          styles.photoGridImage,
                          (selectedImage === resolvedUri && !isMultipleSelection) ||
                          (isMultipleSelection && selectedImages.includes(resolvedUri))
                            ? styles.selectedBorder
                            : {},
                        ]}
                      />

                      {/* Black Mask */}
                      {selectionIndex > 0 && isMultipleSelection && (
                        <View style={styles.selectionMask} />
                      )}

                      {/* Selection Number */}
                      {selectionIndex > 0 && isMultipleSelection && (
                        <View style={styles.selectionContainer}>
                          <Text style={styles.selectionOverlay}>
                            {selectionIndex}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <BottomButtons showDrafts={false} onContinue={handleNext} />
      </View>
    </ExpoLinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  outerContainer: {
    position: "relative",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  selectPhotosOuterContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
  },
  photoPreviewContainer: {
    display: "flex",
    height: screenHeight * PREVIEW_HEIGHT_RATIO,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
  },
  photoPreviewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    boxShadow:
      "0px -10px 48px 0px rgba(226, 193, 157, 0.24), 0px 0px 12px 0px rgba(0, 0, 0, 0.80) inset",
    elevation: 10,
  },
  noImageText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  middleContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "rgba(13, 9, 10, 0.60)",
  },
  recentsTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  recentsText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "500",
  },
  selectOrCameraContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
  },
  selectTextContainer: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 2,
    backgroundColor: "rgba(234, 242, 239, 0.25)",
  },
  selectText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "500",
  },
  cameraIconContainer: {
    width: 19,
    height: 16,
  },
  photoGridOuterContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch",
    backgroundColor: "rgba(13, 9, 10, 0.60)",
  },
  photoGridInnerContainer: {},

  photoGridImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 2,
  },

  selectedBorder: {
    borderWidth: 2,
    borderColor: "rgba(234, 242, 239, 0.80)",
    borderRadius: 2,
  },
  selectionMask: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.44,
    borderRadius: 2,
  },
  selectionContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  selectionOverlay: {
    color: "rgba(234, 242, 239, 0.25)",
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Roc Grotesk",
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1.35,
  },

  postCreationNavOuterContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    zIndex: 100,
  },

  postCreationNavInnerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Distributes "Drafts" and "Continue" buttons
    alignItems: "center",
    width: "100%", // Full width for proper spacing
  },

  draftsButtonOuterContainer: {
    display: "flex",
    padding: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
    marginLeft: 12,
  },

  draftsButtonInnerContainer: {
    display: 'flex',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 9, 10, 0.40)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6.221,
  },

  draftsButtonText: {
    color: "white",
    fontFamily: "NotoSans",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0.3,
  },

  continueButtonOuterContainer: {
    display: "flex",
    padding: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
    marginRight: 12,
  },

  continueButtonInnerContainer: {
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(13, 9, 10, 0.7)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6.221,
    elevation: 6,
  },

  continueButtonText: {
    color: "white",
    fontFamily: "NotoSans",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0.3,
  },
});

export default SelectPhotos;
