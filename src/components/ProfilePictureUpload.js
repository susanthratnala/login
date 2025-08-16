import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { theme } from '../theme';

const ProfilePictureUpload = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    // Basic authorization check - ensure component is properly initialized
    if (!onImageSelected) {
      console.warn('ProfilePictureUpload: No callback provided');
      return;
    }
    
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
        if (onImageSelected) {
          onImageSelected(response.assets[0]);
        }
      }
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={selectImage}>
      <View style={styles.uploadCircle}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.uploadIcon}>
            <Text style={styles.uploadIconText}>+</Text>
          </View>
        )}
      </View>
      <Text style={styles.uploadText}>Upload Profile Picture</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  uploadCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  uploadIconText: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  uploadText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ProfilePictureUpload;