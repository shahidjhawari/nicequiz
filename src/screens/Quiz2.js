import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Quiz2({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const questions = [
    {
      question: 'What is the capital of Pakistan?',
      options: ['Karachi', 'Islamabad', 'Lahore', 'Peshawar'],
      correctAnswer: 'Islamabad',
    },
    {
      question: 'Which is the national language of Pakistan?',
      options: ['English', 'Urdu', 'Punjabi', 'Sindhi'],
      correctAnswer: 'Urdu',
    },
    {
      question: 'Who was the first Prime Minister of Pakistan?',
      options: ['Liaquat Ali Khan', 'Zulfikar Ali Bhutto', 'Benazir Bhutto', 'Nawaz Sharif'],
      correctAnswer: 'Liaquat Ali Khan',
    },
    {
      question: 'Which is the largest province of Pakistan by area?',
      options: ['Punjab', 'Sindh', 'Balochistan', 'Khyber Pakhtunkhwa'],
      correctAnswer: 'Balochistan',
    },
    {
      question: 'What is the national flower of Pakistan?',
      options: ['Rose', 'Jasmine', 'Sunflower', 'Tulip'],
      correctAnswer: 'Jasmine',
    },
    {
      question: 'In which year did Pakistan become a republic?',
      options: ['1947', '1956', '1973', '1985'],
      correctAnswer: '1956',
    },
    {
      question: 'Which river is known as the lifeline of Pakistan?',
      options: ['Indus River', 'Chenab River', 'Jhelum River', 'Ravi River'],
      correctAnswer: 'Indus River',
    },
    {
      question: 'Which city is known as the “City of Lights”?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Quetta'],
      correctAnswer: 'Karachi',
    },
    {
      question: 'Who wrote the national anthem of Pakistan?',
      options: ['Faiz Ahmed Faiz', 'Allama Iqbal', 'Hafeez Jalandhari', 'Ahmed Faraz'],
      correctAnswer: 'Hafeez Jalandhari',
    },
    {
      question: 'What is the national sport of Pakistan?',
      options: ['Cricket', 'Hockey', 'Football', 'Squash'],
      correctAnswer: 'Hockey',
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      }, 1000); // Delay to show the selected answer before moving to the next question
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <View style={styles.container}>
      {isQuizFinished ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Quiz Finished!</Text>
          <Text style={styles.resultText}>Correct Answers: {score}</Text>
          <Text style={styles.resultText}>Incorrect Answers: {questions.length - score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestartQuiz}>
            <Text style={styles.restartButtonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option && option === currentQuestion.correctAnswer
                  ? styles.correctOption
                  : selectedOption === option && option !== currentQuestion.correctAnswer
                  ? styles.incorrectOption
                  : null,
              ]}
              onPress={() => handleOptionPress(option)}
              disabled={selectedOption !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </>
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
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 5,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
