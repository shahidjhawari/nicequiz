import { AppRegistry } from 'react-native';
import App from './App';  // Ensure the path to your main App component is correct
import { name as appName } from './app.json';  // Ensure the app name is imported correctly

AppRegistry.registerComponent(appName, () => App);
