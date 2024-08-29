import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questions = [
  {
    question: 'What is the capital of Pakistan?',
    options: ['Karachi', 'Islamabad', 'Lahore', 'Peshawar'],
    correctAnswer: 'Islamabad',
  },
  {
    question: 'Who is the founder of Pakistan?',
    options: ['Allama Iqbal', 'Liaquat Ali Khan', 'Muhammad Ali Jinnah', 'Zulfiqar Ali Bhutto'],
    correctAnswer: 'Muhammad Ali Jinnah',
  },
  // Add more questions here...
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      alert(`Quiz Over! Your Score: ${score}/${questions.length}`);
      // Reset the quiz
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsCorrect(null);
      setScore(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && isCorrect === true
              ? styles.correctOption
              : selectedOption === option && isCorrect === false
              ? styles.incorrectOption
              : null,
          ]}
          onPress={() => handleOptionPress(option)}
          disabled={selectedOption !== null} // Disable other options once one is selected
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      {selectedOption && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
          </Text>
        </TouchableOpacity>
      )}
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
  question: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
