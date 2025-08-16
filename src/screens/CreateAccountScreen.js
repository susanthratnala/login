import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import ProgressIndicator from '../components/ProgressIndicator';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import LanguageDropdown from '../components/LanguageDropdown';

const CreateAccountScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState('');

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

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const validatePhone = (phoneValue) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneValue);
  };

  const handleCreateAccount = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!validatePhone(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!language) {
      Alert.alert('Error', 'Please select your preferred language');
      return;
    }
    navigation.navigate('ProfessionalInfo');
  };

  const handleImageSelected = () => {
    Alert.alert('Success', 'Profile picture selected successfully!');
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Create Account" 
        onBackPress={() => navigation.goBack()}
      />
      <ProgressIndicator currentStep={1} />
      
      <KeyboardAwareScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Animated.View style={[styles.card, { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }]}>
          <Text style={styles.title}>Create New Account</Text>
          
          <ProfilePictureUpload onImageSelected={handleImageSelected} />
          
          <CustomInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          
          <CustomInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
          
          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <CustomInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <LanguageDropdown
            value={language}
            onSelect={setLanguage}
            placeholder="Your preferred language"
          />
          
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
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: theme.spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.gray800,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  createButton: {
    width: '100%',
    marginTop: theme.spacing.lg,
  },
});

export default CreateAccountScreen;