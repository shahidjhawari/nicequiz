import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-1948175280014202~2536411532';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

export default function Quiz2({navigation}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  const questions = [
    {
      question: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Pb', 'Fe'],
      correctAnswer: 'Au',
    },
    {
      question: 'What is the hardest natural substance on Earth?',
      options: ['Diamond', 'Iron', 'Platinum', 'Gold'],
      correctAnswer: 'Diamond',
    },
    {
      question: 'Which planet is known as the "Red Planet"?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
      correctAnswer: 'Mitochondria',
    },
    {
      question: 'What is the process by which plants make their food?',
      options: [
        'Photosynthesis',
        'Respiration',
        'Transpiration',
        'Fermentation',
      ],
      correctAnswer: 'Photosynthesis',
    },
    {
      question: 'Who is known as the father of modern physics?',
      options: [
        'Isaac Newton',
        'Albert Einstein',
        'Galileo Galilei',
        'Niels Bohr',
      ],
      correctAnswer: 'Albert Einstein',
    },
    {
      question: 'What is the most abundant gas in the Earth’s atmosphere?',
      options: ['Oxygen', 'Hydrogen', 'Carbon Dioxide', 'Nitrogen'],
      correctAnswer: 'Nitrogen',
    },
    {
      question: 'What element has the atomic number 1?',
      options: ['Hydrogen', 'Helium', 'Lithium', 'Oxygen'],
      correctAnswer: 'Hydrogen',
    },
    {
      question:
        'Which organ in the human body is primarily responsible for pumping blood?',
      options: ['Liver', 'Lungs', 'Heart', 'Kidneys'],
      correctAnswer: 'Heart',
    },
    {
      question: 'What is the speed of light in a vacuum?',
      options: [
        '300,000 km/s',
        '150,000 km/s',
        '100,000 km/s',
        '1,000,000 km/s',
      ],
      correctAnswer: '300,000 km/s',
    },
  ];

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
      },
    );

    interstitial.load();

    return () => {
      unsubscribe();
    };
  }, []);

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
      }, 1000);
    } else {
      setIsQuizFinished(true);

      // Show the interstitial ad if loaded
      if (adLoaded) {
        interstitial.show();
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsQuizFinished(false);
    interstitial.load(); // Reload the ad for the next quiz attempt
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
