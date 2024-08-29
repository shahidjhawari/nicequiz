import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Pakistan Quizzes</Text>
      <View style={styles.quizSection}>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { quizType: 'Pakistan Quiz 1' })}
        >
          <Text style={styles.quizButtonText}>Pakistan Quiz 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz2', { quizType: 'Pakistan Quiz 2' })}
        >
          <Text style={styles.quizButtonText}>Pakistan Quiz 2</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>World Quizzes</Text>
      <View style={styles.quizSection}>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('WorldQuiz1', { quizType: 'World Quiz 1' })}
        >
          <Text style={styles.quizButtonText}>World Quiz 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { quizType: 'World Quiz 2' })}
        >
          <Text style={styles.quizButtonText}>World Quiz 2</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Islam Quizzes</Text>
      <View style={styles.quizSection}>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { quizType: 'Islam Quiz 1' })}
        >
          <Text style={styles.quizButtonText}>Islam Quiz 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { quizType: 'Islam Quiz 2' })}
        >
          <Text style={styles.quizButtonText}>Islam Quiz 2</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>General Knowledge Quizzes</Text>
      <View style={styles.quizSection}>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { quizType: 'General Knowledge Quiz 1' })}
        >
          <Text style={styles.quizButtonText}>General Knowledge Quiz 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { quizType: 'General Knowledge Quiz 2' })}
        >
          <Text style={styles.quizButtonText}>General Knowledge Quiz 2</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  quizSection: {
    marginBottom: 30,
    width: '100%',
  },
  quizButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
