import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Quiz2({navigation}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const questions = [
    {
      question: 'What is the chemical symbol for iron?',
      options: ['Fe', 'Ir', 'I', 'In'],
      correctAnswer: 'Fe',
    },
    {
      question: 'What is the most abundant element in the universe?',
      options: ['Oxygen', 'Hydrogen', 'Carbon', 'Helium'],
      correctAnswer: 'Hydrogen',
    },
    {
      question: 'What part of the cell contains the genetic material?',
      options: ['Cytoplasm', 'Nucleus', 'Mitochondria', 'Ribosome'],
      correctAnswer: 'Nucleus',
    },
    {
      question: 'Which planet is known for its prominent ring system?',
      options: ['Saturn', 'Jupiter', 'Uranus', 'Neptune'],
      correctAnswer: 'Saturn',
    },
    {
      question: 'What is the chemical formula for table salt?',
      options: ['NaCl', 'KCl', 'CaCO3', 'MgSO4'],
      correctAnswer: 'NaCl',
    },
    {
      question: 'Who developed the theory of general relativity?',
      options: ['Isaac Newton', 'Albert Einstein', 'James Clerk Maxwell', 'Niels Bohr'],
      correctAnswer: 'Albert Einstein',
    },
    {
      question: 'What is the process by which rocks are broken down by physical and chemical means?',
      options: ['Weathering', 'Erosion', 'Sedimentation', 'Metamorphism'],
      correctAnswer: 'Weathering',
    },
    {
      question: 'What is the primary source of energy for the Earth?',
      options: ['The Moon', 'The Sun', 'Wind', 'Geothermal Heat'],
      correctAnswer: 'The Sun',
    },
    {
      question: 'What is the name of the effect that describes the bending of light around massive objects?',
      options: ['Photoelectric Effect', 'Doppler Effect', 'Gravitational Lensing', 'Refraction'],
      correctAnswer: 'Gravitational Lensing',
    },
    {
      question: 'Which gas makes up about 21% of the Earth’s atmosphere?',
      options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
      correctAnswer: 'Oxygen',
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
