import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => navigation.navigate('Quiz')}
      >
        <Text style={styles.quizButtonText}>Pakistan Quiz</Text>
      </TouchableOpacity>
      <View style={styles.sideButtonsContainer}>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonText}>Left Button</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonText}>Right Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  quizButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 30,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  sideButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  sideButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sideButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
