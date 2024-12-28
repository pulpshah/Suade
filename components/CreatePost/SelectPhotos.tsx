import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import CreateNav from "./CreateNav";
import CameraIcon from "./assets/icons/camera-icon.svg";

type PermissionStatus = MediaLibrary.PermissionStatus;
type Asset = MediaLibrary.Asset;

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window"); // Get screen height
const IMAGE_SIZE = 96; // Fixed image size
const PREVIEW_HEIGHT_RATIO = 0.4; // 40% of the screen height for the preview

const SelectPhotos: React.FC = () => {

  const [selectedScreen, setSelectedScreen] = useState("Post");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Asset[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);
  const [resolvedPhotos, setResolvedPhotos] = useState<{ [key: string]: string }>({});

  // Function to resolve ph:// URIs to file:// URIs
  const resolveUri = async (asset: MediaLibrary.Asset): Promise<string> => {
    try {
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);

      if (assetInfo.localUri) {
        return assetInfo.localUri; // Use localUri if available
      }

      // Fallback: Copy the asset to a file system path
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
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setPermissionStatus(status);
        if (status === "granted") {
          const album = await MediaLibrary.getAssetsAsync({
            first: 50,
            mediaType: MediaLibrary.MediaType.photo,
          });

          setPhotos(album.assets);

          // Resolve URIs for all photos in the grid
          const resolvedUris: { [key: string]: string } = {};
          await Promise.all(
            album.assets.map(async (asset) => {
              try {
                resolvedUris[asset.id] = await resolveUri(asset);
              } catch (error) {
                console.error(`Error resolving URI for asset ${asset.id}:`, error);
              }
            })
          );

          setResolvedPhotos(resolvedUris);

          // Set the first image as the preview image
          if (album.assets.length > 0 && resolvedUris[album.assets[0].id]) {
            setSelectedImage(resolvedUris[album.assets[0].id]);
          }
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const handleSelectImage = async (asset: MediaLibrary.Asset) => {
    try {
      const resolvedUri = await resolveUri(asset);
      setSelectedImage(resolvedUri);
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  if (permissionStatus === null) {
    return <Text>Requesting Permissions...</Text>;
  }

  if (permissionStatus !== "granted") {
    return <Text>Permission to access camera roll is required to use this feature.</Text>;
  }

  return (
    <ExpoLinearGradient
      style={styles.gradient}
      colors={["rgba(0, 0, 0, 0.70)", "#4B6897"]}
      locations={[0, 1]}
    >
        {/* CREATE POST Container */}
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
            {selectedImage ? (
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
              <View style={styles.selectTextContainer}>
                <Text style={styles.selectText}>Select</Text>
              </View>
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
                display: 'flex',
                gap: 2,
                alignSelf: 'stretch',
              }}
            >
              {photos.map((photo) => (
                <TouchableOpacity
                  key={photo.id}
                  onPress={() => handleSelectImage(photo)}
                >
                  <Image
                    source={{ uri: resolvedPhotos[photo.id] || "" }}
                    style={styles.photoGridImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </ExpoLinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  outerContainer: {
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
    boxShadow: '0px -10px 48px 0px rgba(226, 193, 157, 0.24), 0px 0px 12px 0px rgba(0, 0, 0, 0.80) inset',
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
  },
});

export default SelectPhotos;
