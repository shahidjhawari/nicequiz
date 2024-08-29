import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Quiz2({navigation}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const questions = [
    {
      question: 'What is the official name of Pakistan?',
      options: [
        'Islamic Republic of Pakistan',
        'Democratic Republic of Pakistan',
        'Republic of Pakistan',
        'Federal Republic of Pakistan',
      ],
      correctAnswer: 'Islamic Republic of Pakistan',
    },
    {
      question: 'Which mountain range is located in northern Pakistan?',
      options: ['Himalayas', 'Alps', 'Rockies', 'Andes'],
      correctAnswer: 'Himalayas',
    },
    {
      question: 'What is the currency used in Pakistan?',
      options: ['Rupee', 'Dollar', 'Yen', 'Euro'],
      correctAnswer: 'Rupee',
    },
    {
      question:
        'Which famous Pakistani scientist won the Nobel Prize in Physics?',
      options: ['Abdul Salam', 'A.Q. Khan', 'Dr. Ishfaq Ahmad', 'Hadi Sohaib'],
      correctAnswer: 'Abdul Salam',
    },
    {
      question: 'What is the name of Pakistan’s national airline?',
      options: [
        'Pakistan International Airlines',
        'Air Pakistan',
        'National Airlines',
        'Pak Air',
      ],
      correctAnswer: 'Pakistan International Airlines',
    },
    {
      question: 'Which Pakistani city is known as the “City of Gardens”?',
      options: ['Lahore', 'Karachi', 'Rawalpindi', 'Faisalabad'],
      correctAnswer: 'Lahore',
    },
    {
      question:
        'Which famous Pakistani cricketer is known as the “King of Swing”?',
      options: ['Wasim Akram', 'Imran Khan', 'Javed Miandad', 'Shahid Afridi'],
      correctAnswer: 'Wasim Akram',
    },
    {
      question: 'What is the name of the largest dam in Pakistan?',
      options: ['Tarbela Dam', 'Mangla Dam', 'Warsak Dam', 'Chashma Dam'],
      correctAnswer: 'Tarbela Dam',
    },
    {
      question: 'Which historical site is located in the city of Mohenjo-Daro?',
      options: [
        'Indus Valley Civilization',
        'Greek Ruins',
        'Roman Bath',
        'Egyptian Pyramids',
      ],
      correctAnswer: 'Indus Valley Civilization',
    },
    {
      question:
        'What is the name of the famous Pakistani festival celebrated with fireworks and traditional foods?',
      options: ['Eid ul-Fitr', 'Diwali', 'Christmas', 'Holi'],
      correctAnswer: 'Eid ul-Fitr',
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = option => {
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
          <Text style={styles.resultText}>
            Incorrect Answers: {questions.length - score}
          </Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestartQuiz}>
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
                selectedOption === option &&
                option === currentQuestion.correctAnswer
                  ? styles.correctOption
                  : selectedOption === option &&
                    option !== currentQuestion.correctAnswer
                  ? styles.incorrectOption
                  : null,
              ]}
              onPress={() => handleOptionPress(option)}
              disabled={selectedOption !== null}>
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
