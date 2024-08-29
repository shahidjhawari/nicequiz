import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Quiz2({navigation}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const questions = [
    {
      question: 'Which country has the largest population in the world?',
      options: ['India', 'USA', 'China', 'Russia'],
      correctAnswer: 'China',
    },
    {
      question: 'What is the longest river in the world?',
      options: [
        'Amazon River',
        'Nile River',
        'Yangtze River',
        'Mississippi River',
      ],
      correctAnswer: 'Nile River',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'Which country is known as the Land of the Rising Sun?',
      options: ['China', 'Japan', 'South Korea', 'Thailand'],
      correctAnswer: 'Japan',
    },
    {
      question: 'What is the capital of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
      correctAnswer: 'Canberra',
    },
    {
      question: 'Which is the largest ocean on Earth?',
      options: [
        'Atlantic Ocean',
        'Indian Ocean',
        'Arctic Ocean',
        'Pacific Ocean',
      ],
      correctAnswer: 'Pacific Ocean',
    },
    {
      question: 'Who was the first person to walk on the moon?',
      options: ['Buzz Aldrin', 'Yuri Gagarin', 'Neil Armstrong', 'John Glenn'],
      correctAnswer: 'Neil Armstrong',
    },
    {
      question: 'Which country is the Eiffel Tower located in?',
      options: ['Germany', 'Italy', 'Spain', 'France'],
      correctAnswer: 'France',
    },
    {
      question: 'What is the currency of the United Kingdom?',
      options: ['Euro', 'Dollar', 'Pound Sterling', 'Yen'],
      correctAnswer: 'Pound Sterling',
    },
    {
      question: 'Which continent is the Sahara Desert located on?',
      options: ['Asia', 'Africa', 'Australia', 'South America'],
      correctAnswer: 'Africa',
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
