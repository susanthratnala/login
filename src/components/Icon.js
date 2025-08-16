import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Icon = ({ name, size = 20, color = '#000' }) => {
  const icons = {
    attachment: '📎',
    user: '👤',
    checkmark: '✓',
    arrow: '→',
  };

  return (
    <Text style={[styles.icon, { fontSize: size, color }]}>
      {icons[name] || '?'}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
});

export default Icon;