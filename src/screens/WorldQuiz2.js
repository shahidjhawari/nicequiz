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
      question: 'Which country has the most official languages?',
      options: ['South Africa', 'India', 'Switzerland', 'Canada'],
      correctAnswer: 'South Africa',
    },
    {
      question: 'Which mountain is the highest in the world?',
      options: ['K2', 'Mount Kilimanjaro', 'Mount Everest', 'Mount Fuji'],
      correctAnswer: 'Mount Everest',
    },
    {
      question:
        'Which country gifted the Statue of Liberty to the United States?',
      options: ['France', 'Germany', 'United Kingdom', 'Spain'],
      correctAnswer: 'France',
    },
    {
      question: 'Which ocean is the Bermuda Triangle located in?',
      options: [
        'Pacific Ocean',
        'Indian Ocean',
        'Atlantic Ocean',
        'Arctic Ocean',
      ],
      correctAnswer: 'Atlantic Ocean',
    },
    {
      question: 'Which country is home to the Great Barrier Reef?',
      options: ['Brazil', 'Australia', 'Indonesia', 'South Africa'],
      correctAnswer: 'Australia',
    },
    {
      question: 'Which desert is the largest in the world?',
      options: [
        'Gobi Desert',
        'Arabian Desert',
        'Sahara Desert',
        'Antarctic Desert',
      ],
      correctAnswer: 'Antarctic Desert',
    },
    {
      question: 'Which country is famous for its maple syrup?',
      options: ['United States', 'Canada', 'Norway', 'Finland'],
      correctAnswer: 'Canada',
    },
    {
      question: 'Which city is known as the "Eternal City"?',
      options: ['Athens', 'Cairo', 'Rome', 'Jerusalem'],
      correctAnswer: 'Rome',
    },
    {
      question: 'Which country is known for the carnival in Rio de Janeiro?',
      options: ['Mexico', 'Argentina', 'Cuba', 'Brazil'],
      correctAnswer: 'Brazil',
    },
    {
      question: 'Which river flows through Paris?',
      options: ['Danube', 'Thames', 'Seine', 'Tiber'],
      correctAnswer: 'Seine',
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
