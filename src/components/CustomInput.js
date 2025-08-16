import React, { useState, useRef } from 'react';
import { TextInput, StyleSheet, View, Animated } from 'react-native';
import { theme } from '../theme';

const CustomInput = ({ placeholder, value, onChangeText, style, ...props }) => {
  const focusAnim = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.gray200, theme.colors.primary],
  });

  const shadowOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[
        styles.inputContainer, 
        { 
          borderColor,
          shadowOpacity,
          transform: [{ scale: isFocused ? 1.02 : 1 }]
        }
      ]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray400}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
    width: '100%',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.gray300,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    minHeight: 56,
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray800,
    fontWeight: theme.typography.fontWeight.medium,
    letterSpacing: 0.3,
  },
});

export default CustomInput;