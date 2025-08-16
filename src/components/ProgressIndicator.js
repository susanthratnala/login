import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

const ProgressIndicator = ({ currentStep = 1, totalSteps = 4 }) => {
  const steps = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'Professional' },
    { number: 3, label: 'Services' },
    { number: 4, label: 'Banking' },
  ];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={step.number} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step.number && styles.activeStepCircle,
            currentStep > step.number && styles.completedStepCircle
          ]}>
            <Text style={[
              styles.stepNumber,
              currentStep >= step.number && styles.activeStepNumber
            ]}>
              {currentStep > step.number ? '✓' : step.number}
            </Text>
          </View>
          <Text style={[
            styles.stepLabel,
            currentStep >= step.number && styles.activeStepLabel
          ]}>
            {step.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  activeStepCircle: {
    backgroundColor: theme.colors.primary,
  },
  completedStepCircle: {
    backgroundColor: theme.colors.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.white,
  },
  activeStepNumber: {
    color: theme.colors.white,
  },
  stepLabel: {
    fontSize: 12,
    color: theme.colors.gray500,
    textAlign: 'center',
  },
  activeStepLabel: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default ProgressIndicator;