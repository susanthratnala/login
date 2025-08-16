import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../theme';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import ApiService from '../services/api';

const OTPScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const phoneNumber = route?.params?.phoneNumber || '';

  const handleOtpChange = useCallback((value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }, [otp]);

  const handleVerify = useCallback(async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.verifyOTP(phoneNumber, otpCode);
      console.log('OTP Verified:', response);
      navigation.navigate('ThankYou');
    } catch (error) {
      Alert.alert('Error', error.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  }, [otp, phoneNumber, navigation]);

  return (
    <View style={styles.container}>
      <Header 
        title="Verify OTP" 
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      
      <View style={styles.card}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to
        </Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.phoneNumber}>+91 {phoneNumber}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={useCallback(() => navigation.goBack(), [navigation])}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => { inputs.current[index] = ref; }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
        
        <CustomButton
          title={loading ? "Verifying..." : "Verify OTP"}
          onPress={handleVerify}
          style={styles.verifyButton}
          disabled={loading}
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
    alignItems: 'center',
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
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray600,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  phoneNumber: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray800,
    marginRight: theme.spacing.md,
  },
  editButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  editText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    textDecorationLine: 'underline',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  otpInput: {
    width: 50,
    height: 55,
    borderWidth: 2,
    borderColor: theme.colors.gray300,
    borderRadius: 12,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray800,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  verifyButton: {
    width: '100%',
  },
});

export default OTPScreen;