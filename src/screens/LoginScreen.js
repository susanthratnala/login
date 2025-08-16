import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ApiService from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('Doctor');
  const [loading, setLoading] = useState(false);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleContinue = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      await ApiService.sendOTP(phoneNumber);
      navigation.navigate('OTP', { phoneNumber, userType });
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>M+</Text>
        </View>
        <Text style={styles.appName}>MedGoPlus</Text>
        <Text style={styles.tagline}>Professional Healthcare Platform</Text>
      </View>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, userType === 'Patient' && styles.activeToggle]}
          onPress={() => setUserType('Patient')}
        >
          <Text style={[styles.toggleText, userType === 'Patient' && styles.activeToggleText]}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, userType === 'Doctor' && styles.activeToggle]}
          onPress={() => setUserType('Doctor')}
        >
          <Text style={[styles.toggleText, userType === 'Doctor' && styles.activeToggleText]}>Doctor</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.title}>Log in with your mobile number</Text>
        
        <CustomInput
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
        
        <CustomButton
          title={loading ? "Sending OTP..." : "Continue"}
          onPress={handleContinue}
          style={styles.continueButton}
          disabled={loading}
        />
        
        <View style={styles.newUserContainer}>
          <Text style={styles.newUserText}>New User? </Text>
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={styles.createAccountText}>Create new account</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service Privacy Policy Contact Policy
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.gray800,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    fontSize: 16,
    color: theme.colors.gray600,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray100,
    borderRadius: 25,
    padding: 4,
    marginBottom: theme.spacing.xl,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: theme.colors.primary,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray600,
  },
  activeToggleText: {
    color: theme.colors.white,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: theme.spacing.xl,
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.gray800,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  continueButton: {
    width: '100%',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  newUserContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  newUserText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray600,
  },
  createAccountText: {
    fontSize: theme.typography.fontSize.base,
    color: '#4ECDC4',
    fontWeight: theme.typography.fontWeight.semibold,
  },
  termsText: {
    fontSize: 12,
    color: theme.colors.gray500,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: theme.spacing.md,
  },
});

export default LoginScreen;