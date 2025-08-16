import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import ProgressIndicator from '../components/ProgressIndicator';
import SpecializationSelector from '../components/SpecializationSelector';
import AreaDropdown from '../components/AreaDropdown';
import CertificateUpload from '../components/CertificateUpload';

const ProfessionalInfoScreen = ({ navigation }) => {
  const [specializations, setSpecializations] = useState([]);
  const [experience, setExperience] = useState('');
  const [city, setCity] = useState('Visakhapatnam');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [certificates] = useState([]);

  const validateAndNavigate = () => {
    if (specializations.length === 0) {
      Alert.alert('Error', 'Please add at least one specialization');
      return false;
    }
    if (!experience.trim()) {
      Alert.alert('Error', 'Please enter years of experience');
      return false;
    }
    if (!area.trim()) {
      Alert.alert('Error', 'Please select an area');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return false;
    }
    
    const parsedExperience = parseFloat(experience);
    if (isNaN(parsedExperience) || parsedExperience < 0) {
      Alert.alert('Error', 'Please enter valid years of experience');
      return false;
    }
    return true;
  };

  const handleCertificateUpload = (certificateName) => {
    // Certificate upload handled
  };

  const handleNext = () => {
    if (validateAndNavigate()) {
      navigation.navigate('ServiceDetails');
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="User Information" 
        onBackPress={() => navigation.goBack()}
      />
      <ProgressIndicator currentStep={2} />
      
      <KeyboardAwareScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Professional Information</Text>
          
          <SpecializationSelector
            selectedSpecializations={specializations}
            onSelectionChange={setSpecializations}
          />
          
          <CustomInput
            placeholder="Years of experience"
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
          />
          
          <CustomInput
            placeholder="City: Visakhapatnam"
            value={city}
            onChangeText={setCity}
            editable={false}
          />
          
          <AreaDropdown
            selectedArea={area}
            onAreaSelect={setArea}
          />
          
          <CustomInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
          />
          
          <CertificateUpload
            certificates={certificates}
            onUpload={handleCertificateUpload}
          />
          
          <CustomButton
            title="Next ->"
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </KeyboardAwareScrollView>
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
    marginTop: theme.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.gray600,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  nextButton: {
    width: '100%',
    marginTop: theme.spacing.xl,
  },
});

export default ProfessionalInfoScreen;