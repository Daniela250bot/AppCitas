import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './Src/Navigation/AppNavigation';
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
   <>
      <StatusBar style="auto" />
        <FlashMessage position="top" />
      <AppNavigation/>
    </>
  );
}