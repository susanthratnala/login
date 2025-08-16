import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ApiService from '../services/api';
import { testEndpoints, getSwaggerDocs } from '../utils/endpointMapper';

const TestScreen = () => {
  const [result, setResult] = useState('');

  const testConnection = async () => {
    try {
      const response = await fetch('http://13.233.44.42/api/v1/');
      setResult(`Connection: ${response.status}`);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  const testOTP = async () => {
    try {
      const response = await ApiService.sendOTP('9876543210');
      setResult(`OTP: ${JSON.stringify(response)}`);
    } catch (error) {
      setResult(`OTP Error: ${error.message}`);
    }
  };

  const testSwagger = async () => {
    try {
      const docs = await getSwaggerDocs();
      setResult(`Endpoints found: ${Object.keys(docs?.paths || {}).length}`);
    } catch (error) {
      setResult(`Swagger Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test Screen</Text>
      
      <TouchableOpacity style={styles.button} onPress={testConnection}>
        <Text style={styles.buttonText}>Test Connection</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testOTP}>
        <Text style={styles.buttonText}>Test OTP</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testSwagger}>
        <Text style={styles.buttonText}>Get Endpoints</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testEndpoints}>
        <Text style={styles.buttonText}>Test All Endpoints</Text>
      </TouchableOpacity>
      
      <Text style={styles.result}>{result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: '#007AFF', padding: 15, marginVertical: 10, borderRadius: 8 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  result: { marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
});

export default TestScreen;