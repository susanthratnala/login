import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { theme } from '../theme';

const CertificateUpload = ({ certificates = [], onUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  
  const defaultCertificates = [
    'MBBS Degree Certificate',
    '1-Year Internship Completion Certificate',
    'NMC Registration Certificate'
  ];

  const handleUpload = async (certificateName) => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      
      setUploadedFiles(prev => ({
        ...prev,
        [certificateName]: result
      }));
      
      if (onUpload) {
        onUpload(certificateName, result);
      }
      
      // File uploaded successfully
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled
      } else {
        Alert.alert('Error', 'Failed to select file');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Required Certificates (PDF only)</Text>
      {defaultCertificates.map((cert, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.certificateItem,
            uploadedFiles[cert] && styles.uploadedItem
          ]}
          onPress={() => handleUpload(cert)}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              {uploadedFiles[cert] ? '✓' : '📄'}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[
              styles.certificateText,
              uploadedFiles[cert] && styles.uploadedText
            ]}>
              {cert}
            </Text>
            {uploadedFiles[cert] && (
              <Text style={styles.fileName}>
                {uploadedFiles[cert].name}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.lg,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray700,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  certificateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  certificateText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  uploadedItem: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primary,
  },
  uploadedText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  fileName: {
    fontSize: 12,
    color: theme.colors.gray600,
    marginTop: 2,
  },
});

export default CertificateUpload;