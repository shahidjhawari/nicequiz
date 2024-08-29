import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questions = [
  {
    question: 'Who was the first Prime Minister of Pakistan?',
    options: ['Liaquat Ali Khan', 'Benazir Bhutto', 'Zulfiqar Ali Bhutto', 'Imran Khan'],
    correctAnswer: 'Liaquat Ali Khan',
  },
  {
    question: 'What is the national anthem of Pakistan called?',
    options: ['Pak Sarzameen', 'Qaumi Taranah', 'Jeevay Jeevay Pakistan', 'Sohni Dharti'],
    correctAnswer: 'Qaumi Taranah',
  },
  {
    question: 'Which city is known as the "Heart of Pakistan"?',
    options: ['Islamabad', 'Lahore', 'Karachi', 'Rawalpindi'],
    correctAnswer: 'Lahore',
  },
  {
    question: 'Which Pakistani scientist is known as the father of Pakistan’s nuclear program?',
    options: ['Abdul Qadeer Khan', 'Abdus Salam', 'Ishfaq Ahmad', 'Raziuddin Siddiqui'],
    correctAnswer: 'Abdul Qadeer Khan',
  },
  {
    question: 'Which is the national animal of Pakistan?',
    options: ['Lion', 'Markhor', 'Tiger', 'Elephant'],
    correctAnswer: 'Markhor',
  },
  {
    question: 'What is the highest civilian award in Pakistan?',
    options: ['Nishan-e-Haider', 'Tamgha-e-Imtiaz', 'Sitara-e-Jurat', 'Hilal-e-Pakistan'],
    correctAnswer: 'Nishan-e-Haider',
  },
  {
    question: 'Which desert is located in the southern part of Pakistan?',
    options: ['Sahara', 'Thar', 'Gobi', 'Kalahari'],
    correctAnswer: 'Thar',
  },
  {
    question: 'Who wrote the national anthem of Pakistan?',
    options: ['Allama Iqbal', 'Faiz Ahmed Faiz', 'Hafeez Jalandhari', 'Josh Malihabadi'],
    correctAnswer: 'Hafeez Jalandhari',
  },
  {
    question: 'Which city is known as the "Manchester of Pakistan"?',
    options: ['Sialkot', 'Faisalabad', 'Multan', 'Gujranwala'],
    correctAnswer: 'Faisalabad',
  },
  {
    question: 'Which Pakistani lake is known as the second largest saltwater lake in the world?',
    options: ['Manchar Lake', 'Saif-ul-Malook', 'Haleji Lake', 'Keenjhar Lake'],
    correctAnswer: 'Manchar Lake',
  },
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
