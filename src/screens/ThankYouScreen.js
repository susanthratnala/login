import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme';
import CustomButton from '../components/CustomButton';

const ThankYouScreen = ({ navigation }) => {
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

  const handleContinueToDashboard = () => {
    // Navigate to dashboard (placeholder for now)
    navigation.navigate('Login');
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }]}>
        <View style={styles.iconContainer}>
          <Text style={styles.hourglassIcon}>⏳</Text>
        </View>
        
        <Text style={styles.title}>Account Under Verification</Text>
        <Text style={styles.subtitle}>Welcome to MedGoPlus</Text>
        
        <Text style={styles.successMessage}>
          Your account has been successfully created.
        </Text>
        
        <Text style={styles.message}>
          Our team is reviewing your profile and will update you via email within 7 working days.
        </Text>
        
        <CustomButton
          title="Continue to Dashboard"
          onPress={handleContinueToDashboard}
          style={styles.primaryButton}
        />
        
        <CustomButton
          title="Back to Login"
          onPress={handleBackToLogin}
          variant="secondary"
          style={styles.secondaryButton}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
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
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF9500',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  hourglassIcon: {
    fontSize: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.gray800,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  successMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.gray700,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  message: {
    fontSize: 14,
    color: theme.colors.gray500,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  primaryButton: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  secondaryButton: {
    width: '100%',
  },
});

export default ThankYouScreen;