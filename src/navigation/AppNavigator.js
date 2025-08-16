import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import UserInformationScreen from '../screens/UserInformationScreen';
import ProfessionalInfoScreen from '../screens/ProfessionalInfoScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="UserInformation" component={UserInformationScreen} />
        <Stack.Screen name="ProfessionalInfo" component={ProfessionalInfoScreen} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;