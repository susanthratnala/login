import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import Icon from './Icon';

const UploadButton = ({ title, onPress, style, uploaded = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, uploaded && styles.uploaded, style]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Icon name="attachment" size={20} color={uploaded ? theme.colors.success : theme.colors.primary} />
      </View>
      <Text style={[styles.text, uploaded && styles.uploadedText]}>
        {uploaded ? 'Uploaded' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: theme.colors.primarySoft,
    marginVertical: theme.spacing.sm,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  uploaded: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.successLight,
    borderStyle: 'solid',
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary,
    letterSpacing: 0.3,
  },
  uploadedText: {
    color: theme.colors.success,
  },
});

export default UploadButton;