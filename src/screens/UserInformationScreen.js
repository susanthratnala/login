import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Alert, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import PDFUploadButton from '../components/PDFUploadButton';
import Header from '../components/Header';
import SpecializationModal from '../components/SpecializationModal';
import AreaDropdown from '../components/AreaDropdown';

const UserInformationScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [mbbsFile, setMbbsFile] = useState(null);
  const [internshipFile, setInternshipFile] = useState(null);
  const [nmcFile, setNmcFile] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleNext = () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return;
    }
    if (!mbbsFile || !internshipFile || !nmcFile) {
      Alert.alert('Error', 'Please upload all required certificates');
      return;
    }
    try {
      navigation.navigate('ProfessionalInfo');
    } catch (error) {
      Alert.alert('Error', 'Navigation failed. Please try again.');
    }
  };



  const handleSpecializationSubmit = (specialization) => {
    setSelectedSpecialization(specialization);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Header 
        title="User Information" 
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      
      <Animated.View style={[styles.card, { 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }]}>
        
        <Text style={styles.subtitle}>Professional Information</Text>
        
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => setShowModal(true)}
        >
          <Text style={[styles.dropdownText, selectedSpecialization && styles.selectedText]}>
            {selectedSpecialization ? 
              `${selectedSpecialization.category} - ${selectedSpecialization.specialization}` : 
              'Add Specialization'}
          </Text>
          <Text style={styles.arrow}>+</Text>
        </TouchableOpacity>
        
        <CustomInput
          placeholder="Years of experience"
          value={yearsOfExperience}
          onChangeText={setYearsOfExperience}
          keyboardType="numeric"
        />
        
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>City: Visakhapatnam</Text>
        </View>
        
        <AreaDropdown
          selectedArea={selectedArea}
          onAreaSelect={setSelectedArea}
        />
        
        <CustomInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={3}
          style={styles.addressInput}
        />
        
        <View style={styles.certificatesSection}>
          <Text style={styles.certificatesLabel}>Required Certificates (PDF only)</Text>
          
          <PDFUploadButton
            title="MBBS Degree Certificate"
            uploaded={!!mbbsFile}
            fileName={mbbsFile?.name}
            onPress={setMbbsFile}
          />
          
          <PDFUploadButton
            title="1-Year Internship Completion Certificate"
            uploaded={!!internshipFile}
            fileName={internshipFile?.name}
            onPress={setInternshipFile}
          />
          
          <PDFUploadButton
            title="NMC Registration Certificate"
            uploaded={!!nmcFile}
            fileName={nmcFile?.name}
            onPress={setNmcFile}
          />
        </View>
        
        <CustomButton
          title="Next ->"
          onPress={handleNext}
          style={styles.nextButton}
        />
      </Animated.View>
      </KeyboardAwareScrollView>
      
      <SpecializationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSpecializationSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.lg,
  },

  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: theme.spacing.xl,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray800,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.gray700,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
  },
  dropdownText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray400,
  },
  selectedText: {
    color: theme.colors.gray800,
    fontWeight: theme.typography.fontWeight.medium,
  },
  arrow: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  addressInput: {
    height: 80,
  },
  certificatesSection: {
    marginVertical: theme.spacing.lg,
  },
  certificatesLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.gray700,
    marginBottom: theme.spacing.sm,
  },
  nextButton: {
    width: '100%',
    marginTop: theme.spacing.lg,
  },
});

export default UserInformationScreen;