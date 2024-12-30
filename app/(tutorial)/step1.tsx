import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function Step1() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/image.png')} // Background image
      style={styles.background}
      resizeMode="cover"
    >
      {/* Top Section */}
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.notificationBadge}>
          <Text style={styles.notificationText}>10 ⚡ 24</Text>
        </TouchableOpacity>
        <View style={styles.topRightContainer}>
          <TouchableOpacity style={styles.avatarBadge}>
            <Text style={styles.avatarText}>W</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarBadge}>
            <Text style={styles.avatarText}>S</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Main Speaker Image */}
        <Image
          source={require('@/assets/images/image.png')} // Placeholder for the speaker image
          style={styles.speakerImage}
        />

        {/* Chat Box */}
        <View style={styles.chatBox}>
          <Text style={styles.chatText}>
            Honestly, I don’t think your point about Suade makes any sense. For example, let’s take
            a look at...
          </Text>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('@/assets/images/microphone-icon.png')} // Correct microphone icon path
            style={styles.actionIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('@/assets/images/chat-icon.png')} // Correct chat icon path
            style={styles.actionIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('@/assets/images/video-icon.png')} // Correct video icon path
            style={styles.actionIcon}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000', // Fallback color
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  notificationBadge: {
    backgroundColor: '#181818',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  notificationText: {
    color: '#FFF',
    fontSize: 14,
  },
  topRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  speakerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  chatBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 10,
  },
  chatText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 18,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#000',
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
});
