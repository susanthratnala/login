import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import ProgressIndicator from '../components/ProgressIndicator';

const BankingDetailsScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('banking'); // 'banking' or 'upi'
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscNumber, setIfscNumber] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
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

  const handleVerifyUPI = () => {
    if (!upiId.trim()) {
      Alert.alert('Error', 'Please enter UPI ID');
      return;
    }
    setIsUpiVerified(true);
    Alert.alert('Success', 'UPI ID verified successfully!');
  };

  const validateInputs = () => {
    if (!termsAccepted) {
      Alert.alert('Error', 'Please accept terms and conditions');
      return false;
    }

    if (paymentMethod === 'banking') {
      if (!bankName.trim() || !accountNumber.trim() || !ifscNumber.trim()) {
        Alert.alert('Error', 'Please fill all banking details');
        return false;
      }
      if (!/^\d+$/.test(accountNumber) || accountNumber.length < 9) {
        Alert.alert('Error', 'Please enter a valid account number');
        return false;
      }
      if (ifscNumber.length !== 11) {
        Alert.alert('Error', 'Please enter a valid IFSC code');
        return false;
      }
    } else {
      if (!upiId.trim() || !isUpiVerified) {
        Alert.alert('Error', 'Please enter and verify UPI ID');
        return false;
      }
    }
    return true;
  };

  const handleCreateAccount = () => {
    if (validateInputs()) {
      navigation.navigate('ThankYou');
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Service Details" 
        onBackPress={() => navigation.goBack()}
      />
      <ProgressIndicator currentStep={4} />
      
      <KeyboardAwareScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Animated.View style={[styles.card, { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }]}>
          <Text style={styles.title}>Service Details</Text>
          <Text style={styles.subtitle}>Banking Details</Text>
          
          {/* Payment Method Selection */}
          <View style={styles.paymentMethodContainer}>
            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setPaymentMethod('banking')}
            >
              <View style={[
                styles.radioButton,
                paymentMethod === 'banking' && styles.radioButtonSelected
              ]}>
                {paymentMethod === 'banking' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.paymentOptionText}>Select banking as preferred payment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setPaymentMethod('upi')}
            >
              <View style={[
                styles.radioButton,
                paymentMethod === 'upi' && styles.radioButtonSelected
              ]}>
                {paymentMethod === 'upi' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.paymentOptionText}>Select UPI as preferred payment</Text>
            </TouchableOpacity>
          </View>

          {/* Banking Details Form */}
          {paymentMethod === 'banking' && (
            <View style={styles.formContainer}>
              <CustomInput
                placeholder="Name as per Bank Account"
                value={bankName}
                onChangeText={setBankName}
              />
              
              <CustomInput
                placeholder="Bank Account Number"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
              />
              
              <CustomInput
                placeholder="IFSC Number"
                value={ifscNumber}
                onChangeText={(text) => setIfscNumber(text.toUpperCase())}
              />
            </View>
          )}

          {/* UPI Details Form */}
          {paymentMethod === 'upi' && (
            <View style={styles.formContainer}>
              <View style={styles.upiContainer}>
                <CustomInput
                  placeholder="UPI ID"
                  value={upiId}
                  onChangeText={setUpiId}
                  style={styles.upiInput}
                />
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    isUpiVerified && styles.verifiedButton
                  ]}
                  onPress={handleVerifyUPI}
                  disabled={isUpiVerified}
                >
                  <Text style={[
                    styles.verifyButtonText,
                    isUpiVerified && styles.verifiedButtonText
                  ]}>
                    {isUpiVerified ? '✓' : 'Verify'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Terms and Conditions */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setTermsAccepted(!termsAccepted)}
            >
              <View style={[
                styles.checkboxBox,
                termsAccepted && styles.checkboxBoxSelected
              ]}>
                {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to Terms & Conditions and Privacy Policy of the app
            </Text>
          </View>
          
          <CustomButton
            title="Create Account"
            onPress={handleCreateAccount}
            style={styles.createButton}
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
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.gray600,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  paymentMethodContainer: {
    marginBottom: theme.spacing.xl,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray300,
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  paymentOptionText: {
    fontSize: 14,
    color: theme.colors.gray700,
    flex: 1,
  },
  formContainer: {
    marginBottom: theme.spacing.lg,
  },
  upiContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
  },
  upiInput: {
    flex: 1,
    marginVertical: 0,
  },
  verifyButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  verifiedButton: {
    backgroundColor: theme.colors.success,
  },
  verifyButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedButtonText: {
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  checkbox: {
    marginRight: theme.spacing.sm,
    marginTop: 2,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: theme.colors.gray300,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkmark: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.gray600,
    lineHeight: 16,
  },
  createButton: {
    width: '100%',
    marginTop: theme.spacing.md,
  },
});

export default BankingDetailsScreen;