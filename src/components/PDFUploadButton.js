import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { theme } from '../theme';

const PDFUploadButton = ({ title, uploaded, fileName, onPress }) => {
  const handlePress = () => {
    const options = {
      mediaType: 'mixed',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled');
        return;
      }
      
      if (response.errorMessage) {
        console.error('Error:', encodeURIComponent(String(response.errorMessage)));
        Alert.alert('Error', 'Could not select file');
        return;
      }

      if (response.assets && response.assets[0]) {
        const file = response.assets[0];
        console.log('Selected file:', encodeURIComponent(JSON.stringify({name: file.fileName, type: file.type, size: file.fileSize})));
        onPress && onPress(file);
      }
    });
  };

  return (
    <TouchableOpacity 
      style={[styles.button, uploaded && styles.uploadedButton]} 
      onPress={handlePress}
    >
      <View style={styles.buttonContent}>
        <Text style={[styles.buttonText, uploaded && styles.uploadedText]}>
          {uploaded ? '✓ ' : '📄 '}{title}
        </Text>
        {uploaded && fileName && (
          <Text style={styles.fileName} numberOfLines={1}>
            {fileName}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  uploadedButton: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.success + '10',
    borderStyle: 'solid',
  },
  buttonContent: {
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  uploadedText: {
    color: theme.colors.success,
  },
  fileName: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray600,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
});

export default PDFUploadButton;