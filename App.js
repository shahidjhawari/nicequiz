import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import Quiz from './src/screens/Quiz';
import Quiz2 from './src/screens/Quiz2';
import WorldQuiz1 from './src/screens/WorldQuiz1';
import WorldQuiz2 from './src/screens/WorldQuiz2';
import ScienceQuiz1 from './src/screens/ScienceQuiz1';
import ScienceQuiz2 from './src/screens/ScienceQuiz2';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Quiz2" component={Quiz2} />
        <Stack.Screen name="WorldQuiz1" component={WorldQuiz1} />
        <Stack.Screen name="WorldQuiz2" component={WorldQuiz2} />
        <Stack.Screen name="ScienceQuiz1" component={ScienceQuiz1} />
        <Stack.Screen name="ScienceQuiz2" component={ScienceQuiz2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
