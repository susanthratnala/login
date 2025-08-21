import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

const ConsultationPricing = ({ onPricingChange }) => {
  const [homeConsultation, setHomeConsultation] = useState(false);
  const [videoConsultation, setVideoConsultation] = useState(false);
  
  // Radio button states
  const [homeOption, setHomeOption] = useState(''); // 'earn' or 'setPrice'
  const [videoOption, setVideoOption] = useState(''); // 'earn' or 'setPrice'
  
  // Input values
  const [homeEarnings, setHomeEarnings] = useState('');
  const [homePatientPrice, setHomePatientPrice] = useState('');
  const [videoEarnings, setVideoEarnings] = useState('');
  const [videoPatientPrice, setVideoPatientPrice] = useState('');

  // Calculate final prices and earnings
  const calculateHomeFinalPrice = (earnings) => {
    const num = parseFloat(earnings) || 0;
    return Math.round(num + (num * 0.20)); // Add 20% platform fee
  };

  const calculateHomeEarnings = (patientPrice) => {
    const num = parseFloat(patientPrice) || 0;
    return Math.round(num - (num * 0.20)); // Subtract 20% platform fee
  };

  const calculateVideoFinalPrice = (earnings) => {
    const num = parseFloat(earnings) || 0;
    return Math.round(num + (num * 0.10)); // Add 10% platform fee
  };

  const calculateVideoEarnings = (patientPrice) => {
    const num = parseFloat(patientPrice) || 0;
    return Math.round(num - (num * 0.10)); // Subtract 10% platform fee
  };

  // Update parent component when pricing changes
  useEffect(() => {
    const pricingData = {
      homeConsultation: {
        enabled: homeConsultation,
        option: homeOption,
        earnings: homeOption === 'earn' ? homeEarnings : calculateHomeEarnings(homePatientPrice),
        patientPrice: homeOption === 'earn' ? calculateHomeFinalPrice(homeEarnings) : homePatientPrice
      },
      videoConsultation: {
        enabled: videoConsultation,
        option: videoOption,
        earnings: videoOption === 'earn' ? videoEarnings : calculateVideoEarnings(videoPatientPrice),
        patientPrice: videoOption === 'earn' ? calculateVideoFinalPrice(videoEarnings) : videoPatientPrice
      }
    };
    
    if (onPricingChange) {
      onPricingChange(pricingData);
    }
  }, [homeConsultation, videoConsultation, homeOption, videoOption, homeEarnings, homePatientPrice, videoEarnings, videoPatientPrice]);

  const CheckBox = ({ checked, onPress, label }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const RadioButton = ({ selected, onPress, label, icon }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{icon} {label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Consultation Pricing</Text>
      
      {/* Home Consultation Section */}
      <CheckBox
        checked={homeConsultation}
        onPress={() => {
          setHomeConsultation(!homeConsultation);
          if (!homeConsultation) {
            setHomeOption('');
            setHomeEarnings('');
            setHomePatientPrice('');
          }
        }}
        label="I am opting Home Consultations"
      />

      {homeConsultation && (
        <View style={styles.optionsContainer}>
          <Text style={styles.feeText}>Platform fee: 20%</Text>
          
          <RadioButton
            selected={homeOption === 'earn'}
            onPress={() => {
              setHomeOption('earn');
              setHomePatientPrice('');
            }}
            label="I want to earn"
           
          />
          
          {homeOption === 'earn' && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your desired earnings (₹)"
                placeholderTextColor="#888"
                value={homeEarnings}
                onChangeText={setHomeEarnings}
                keyboardType="numeric"
              />
              <Text style={styles.calculation}>
                Final price to patient: ₹{calculateHomeFinalPrice(homeEarnings)}
              </Text>
            </View>
          )}

          <RadioButton
            selected={homeOption === 'setPrice'}
            onPress={() => {
              setHomeOption('setPrice');
              setHomeEarnings('');
            }}
            label="I want to set patient price"
            
          />
          
          {homeOption === 'setPrice' && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Set final price to patient (₹)"
                placeholderTextColor="#888"
                value={homePatientPrice}
                onChangeText={setHomePatientPrice}
                keyboardType="numeric"
              />
              <Text style={styles.calculation}>
                You will earn: ₹{calculateHomeEarnings(homePatientPrice)}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Video Consultation Section */}
      <CheckBox
        checked={videoConsultation}
        onPress={() => {
          setVideoConsultation(!videoConsultation);
          if (!videoConsultation) {
            setVideoOption('');
            setVideoEarnings('');
            setVideoPatientPrice('');
          }
        }}
        label="I am opting Video Consultations"
      />

      {videoConsultation && (
        <View style={styles.optionsContainer}>
          <Text style={styles.feeText}>Platform fee: 10%</Text>
          
          <RadioButton
            selected={videoOption === 'earn'}
            onPress={() => {
              setVideoOption('earn');
              setVideoPatientPrice('');
            }}
            label="I want to earn"
            
          />
          
          {videoOption === 'earn' && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your desired earnings (₹)"
                placeholderTextColor="#888"
                value={videoEarnings}
                onChangeText={setVideoEarnings}
                keyboardType="numeric"
              />
              <Text style={styles.calculation}>
                Final price to patient: ₹{calculateVideoFinalPrice(videoEarnings)}
              </Text>
            </View>
          )}

          <RadioButton
            selected={videoOption === 'setPrice'}
            onPress={() => {
              setVideoOption('setPrice');
              setVideoEarnings('');
            }}
            label="I want to set patient price"
            
          />
          
          {videoOption === 'setPrice' && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Set final price to patient (₹)"
                placeholderTextColor="#888"
                value={videoPatientPrice}
                onChangeText={setVideoPatientPrice}
                keyboardType="numeric"
              />
              <Text style={styles.calculation}>
                You will earn: ₹{calculateVideoEarnings(videoPatientPrice)}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.gray800,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    marginRight: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkmark: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: theme.colors.gray700,
    flex: 1,
  },
  optionsContainer: {
    marginLeft: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    paddingLeft: theme.spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.gray300,
  },
  feeText: {
    color: theme.colors.primary,
    fontSize: 14,
    marginBottom: theme.spacing.md,
    fontWeight: '500',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray400,
    marginRight: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  radioLabel: {
    fontSize: 15,
    color: theme.colors.gray700,
    flex: 1,
  },
  inputContainer: {
    marginLeft: 30,
    marginBottom: theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    padding: theme.spacing.sm,
    fontSize: 16,
    color: theme.colors.gray800,
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  calculation: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ConsultationPricing;