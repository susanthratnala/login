import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import ProgressIndicator from '../components/ProgressIndicator';
import ConsultationPricing from '../components/ConsultationPricing';


const ServiceDetailsScreen = ({ navigation }) => {
  const [serviceRadius, setServiceRadius] = useState('');
  const [pricingData, setPricingData] = useState({});

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



  const handlePricingChange = (data) => {
    setPricingData(data);
  };

  const validateInputs = () => {
    if (!serviceRadius.trim()) {
      Alert.alert('Error', 'Please enter service radius');
      return false;
    }

    const radius = parseFloat(serviceRadius);
    if (isNaN(radius) || radius <= 0) {
      Alert.alert('Error', 'Please enter a valid service radius');
      return false;
    }

    // Check if at least one consultation type is selected with pricing
    const hasHomePricing = pricingData.homeConsultation?.enabled && 
      (pricingData.homeConsultation?.earnings > 0 || pricingData.homeConsultation?.patientPrice > 0);
    const hasVideoPricing = pricingData.videoConsultation?.enabled && 
      (pricingData.videoConsultation?.earnings > 0 || pricingData.videoConsultation?.patientPrice > 0);
    
    if (!hasHomePricing && !hasVideoPricing) {
      Alert.alert('Error', 'Please set pricing for at least one consultation type');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateInputs()) {
      navigation.navigate('BankingDetails');
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Service Details" 
        onBackPress={() => navigation.goBack()}
      />
      <ProgressIndicator currentStep={3} />
      
      <KeyboardAwareScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Animated.View style={[styles.card, { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }]}>
          <Text style={styles.title}>Service Details</Text>
          
          <CustomInput
            placeholder="Service Radius (km)"
            value={serviceRadius}
            onChangeText={setServiceRadius}
            keyboardType="numeric"
          />
          
          <ConsultationPricing onPricingChange={handlePricingChange} />
          

          
          <CustomButton
            title="Next ->"
            onPress={handleNext}
            style={styles.nextButton}
          />
        </Animated.View>
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
    color: theme.colors.gray800,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  nextButton: {
    width: '100%',
    marginTop: theme.spacing.xl,
  },
});

export default ServiceDetailsScreen;