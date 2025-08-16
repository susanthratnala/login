import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../theme';

const PricingCalculator = ({ onPriceChange }) => {
  // State for input values
  const [doctorEarning, setDoctorEarning] = useState('');
  const [patientPrice, setPatientPrice] = useState('');
  
  // State to track which input is being edited
  const [editingField, setEditingField] = useState(null);
  
  // Platform fee constant
  const PLATFORM_FEE = 200;



  // Handle doctor earning input change
  const handleDoctorEarningChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setDoctorEarning(numericValue);
    
    // Only calculate patient price if we have a value
    if (numericValue !== '') {
      const earning = parseFloat(numericValue) || 0;
      const calculatedPatientPrice = earning + PLATFORM_FEE;
      setPatientPrice(calculatedPatientPrice.toString());
    } else {
      setPatientPrice('');
    }
    
    // Notify parent
    if (onPriceChange) {
      onPriceChange({
        doctorEarning: parseFloat(numericValue) || 0,
        patientPrice: numericValue !== '' ? parseFloat(numericValue) + PLATFORM_FEE : 0,
        platformFee: PLATFORM_FEE
      });
    }
  };

  // Handle patient price input change
  const handlePatientPriceChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setPatientPrice(numericValue);
    
    // Only calculate doctor earning if we have a value
    if (numericValue !== '') {
      const price = parseFloat(numericValue) || 0;
      const calculatedDoctorEarning = Math.max(0, price - PLATFORM_FEE);
      setDoctorEarning(calculatedDoctorEarning.toString());
    } else {
      setDoctorEarning('');
    }
    
    // Notify parent
    if (onPriceChange) {
      onPriceChange({
        doctorEarning: numericValue !== '' ? Math.max(0, parseFloat(numericValue) - PLATFORM_FEE) : 0,
        patientPrice: parseFloat(numericValue) || 0,
        platformFee: PLATFORM_FEE
      });
    }
  };

  // Format currency display
  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    return `₹${numAmount}`;
  };

  // Calculate display values
  const patientWillPay = doctorEarning ? parseFloat(doctorEarning) + PLATFORM_FEE : 0;
  const doctorWillEarn = patientPrice ? Math.max(0, parseFloat(patientPrice) - PLATFORM_FEE) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pricing Calculator</Text>
      
      {/* Doctor Earning Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>How much do you want to earn?</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.input}
            value={doctorEarning}
            onChangeText={handleDoctorEarningChange}
            placeholder="0"
            keyboardType="numeric"
            maxLength={6}
            onFocus={() => setEditingField('doctor')}
          />
        </View>
        {/* Display what patient will pay */}
        <Text style={styles.resultText}>
          Patient will pay: {formatCurrency(patientWillPay)}
        </Text>
      </View>

      {/* Platform Fee Display */}
      <View style={styles.feeContainer}>
        <Text style={styles.feeText}>Platform Fee: ₹{PLATFORM_FEE}</Text>
      </View>

      {/* Patient Price Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Set price for patient</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.input}
            value={patientPrice}
            onChangeText={handlePatientPriceChange}
            placeholder="0"
            keyboardType="numeric"
            maxLength={6}
            onFocus={() => setEditingField('patient')}
          />
        </View>
        {/* Display what doctor will earn */}
        <Text style={styles.resultText}>
          You will earn: {formatCurrency(doctorWillEarn)}
        </Text>
      </View>

      {/* Summary */}
      {(doctorEarning || patientPrice) && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Patient pays:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(patientPrice || patientWillPay)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform fee:</Text>
            <Text style={styles.summaryValue}>₹{PLATFORM_FEE}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>You earn:</Text>
            <Text style={styles.summaryTotalValue}>
              {formatCurrency(doctorEarning || doctorWillEarn)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.gray800,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.gray700,
    marginBottom: theme.spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    minHeight: 50,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray600,
    marginRight: theme.spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.gray800,
    paddingVertical: theme.spacing.sm,
  },
  resultText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
    marginTop: theme.spacing.sm,
    textAlign: 'right',
  },
  feeContainer: {
    backgroundColor: theme.colors.primarySoft,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  feeText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  summaryContainer: {
    backgroundColor: theme.colors.gray50,
    borderRadius: 12,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray800,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.gray600,
  },
  summaryValue: {
    fontSize: 14,
    color: theme.colors.gray800,
    fontWeight: '500',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
    marginTop: theme.spacing.xs,
    paddingTop: theme.spacing.sm,
  },
  summaryTotalLabel: {
    fontSize: 16,
    color: theme.colors.gray800,
    fontWeight: '600',
  },
  summaryTotalValue: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '700',
  },
});

export default PricingCalculator;