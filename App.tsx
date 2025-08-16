import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { theme } from './src/theme';

import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTPScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import UserInformationScreen from './src/screens/UserInformationScreen';
import ProfessionalInfoScreen from './src/screens/ProfessionalInfoScreen';
import ServiceDetailsScreen from './src/screens/ServiceDetailsScreen';
import BankingDetailsScreen from './src/screens/BankingDetailsScreen';
import ThankYouScreen from './src/screens/ThankYouScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.surface}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 250,
                  useNativeDriver: true,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 200,
                  useNativeDriver: true,
                },
              },
            },
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
          />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="UserInformation" component={UserInformationScreen} />
          <Stack.Screen name="ProfessionalInfo" component={ProfessionalInfoScreen} />
          <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
          <Stack.Screen name="BankingDetails" component={BankingDetailsScreen} />
          <Stack.Screen 
            name="ThankYou" 
            component={ThankYouScreen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;