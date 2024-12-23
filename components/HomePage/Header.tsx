import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
////////////
interface HeaderProps {
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Image
            source={require('@/assets/images/flip-backward.png')}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      {/* Header Text */}
      <Text style={styles.headerText}>suade.</Text>

      {/* Placeholder for symmetry */}
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#000',
  },
  backButton: {
    width: 40,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  backButtonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default Header;
