import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  Dimensions,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

import {
  generateRandom,
  getEmptyBoard,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isOver,
} from './GameBoard';
import Cell from './Cell';
import {useSwipe} from './useSwipe';
import {Background} from '../../Components/Background';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const GameController = () => {
  const [board, setBoard] = useState(generateRandom(getEmptyBoard()));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lastAction, setLastAction] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showBackgroundOverlay, setShowBackgroundOverlay] = useState(false);
  const [fireworksCount, setFireworksCount] = useState(0);

  const [onTouchStart, onTouchEnd] = useSwipe(
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  );

  useEffect(() => {
    const loadHighScore = async () => {
      try {
        const storedHighScore = await AsyncStorage.getItem('highScore');
        if (storedHighScore) {
          setHighScore(parseInt(storedHighScore, 10));
        }
      } catch (error) {
        console.error('Error loading high score: ', error);
      }
    };

    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const storedHighScore = await AsyncStorage.getItem('highScore');
      if (storedHighScore) {
        setHighScore(parseInt(storedHighScore, 10));
      }
    } catch (error) {
      console.error('Error loading high score: ', error);
    }
  };

  const saveHighScore = async () => {
    try {
      await AsyncStorage.setItem('highScore', highScore.toString());
    } catch (error) {
      console.error('Error saving high score: ', error);
    }
  };

  const checkEndGame = () => {
    const gameOver = isOver(board);

    if (gameOver && score > highScore) {
      setHighScore(score);
      saveHighScore();
    }

    if (gameOver) {
      if (score >= 2048) {
        // 2048'e ulaşıldığında havaifişekleri patlat
        setShowFireworks(true);
        setShowBackgroundOverlay(true);
        setFireworksCount(prevCount => prevCount + 1);

        setTimeout(() => {
          if (fireworksCount < 2) {
            setShowFireworks(false);
            setShowBackgroundOverlay(false);
            reset();
          }
        }, 5000); // 5000 milisaniye (5 saniye) sonra animasyonu kapat
      } else {
        // 2048'e ulaşılamadı ve tüm kareler dolu, başka bir bildirim veya işlem yapabilirsiniz.
        Alert.alert(
          'Game Over!',
          'Score: ' + score + '\nHigh Score: ' + highScore,
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Play Again',
              onPress: () => reset(),
            },
          ],
          {
            cancelable: true,
            onDismiss: () => {},
          },
        );
      }
    }
  };

  useEffect(() => {
    saveHighScore();
  }, [highScore]);

  function onSwipeLeft() {
    const newBoard = moveLeft(board);
    setBoard(generateRandom(newBoard[0]));
    setScore(prevScore => prevScore + newBoard[1]);
    checkEndGame();
    setLastAction('long-arrow-left');
  }

  function onSwipeRight() {
    const newBoard = moveRight(board);
    setBoard(generateRandom(newBoard[0]));
    setScore(prevScore => prevScore + newBoard[1]);
    checkEndGame();
    setLastAction('long-arrow-right');
  }

  function onSwipeUp() {
    const newBoard = moveUp(board);
    setBoard(generateRandom(newBoard[0]));
    setScore(prevScore => prevScore + newBoard[1]);
    checkEndGame();
    setLastAction('long-arrow-up');
  }

  function onSwipeDown() {
    const newBoard = moveDown(board);
    setBoard(generateRandom(newBoard[0]));
    setScore(prevScore => prevScore + newBoard[1]);
    checkEndGame();
    setLastAction('long-arrow-down');
  }

  const reset = () => {
    setBoard(generateRandom(getEmptyBoard()));
    setScore(0);
    setLastAction(null);
  };

  const shareApp = async () => {
    try {
      const url =
        'https://play.google.com/store/apps/developer?id=DarkSor+Company&hl=en';

      Share.share({
        message: 'Check out this amazing game on Google Play Store: ' + url,
      });
    } catch (error) {
      console.error('Error sharing app: ', error);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.AppBar}>2048</Text>
          <View style={styles.headerHigh}>
            <Text style={{color: '#000000'}}>HIGH SCORE</Text>
            <Text style={{fontSize: 26, color: '#000000'}}>
              {highScore.toString()}
            </Text>
          </View>
        </View>

        <View style={styles.header}>
          <View style={styles.headerRight}>
            <View style={styles.headerElement}>
              <Text style={{color: '#000000'}}>SCORE</Text>
              <Text style={{fontSize: 26, color: '#000000'}}>
                {score.toString()}
              </Text>
            </View>

            <Pressable
              style={({pressed}) => [
                styles.headerElement,
                {
                  paddingTop: 0,
                  backgroundColor: pressed ? '#cccccc' : '#c5c5c5',
                },
              ]}
              onPress={reset}>
              <Ionicons name="sync-outline" size={34} color="#000000" />
              {/* <Text
            style={{
              color: '#f4efe8',
              fontSize: 20,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            New Game
          </Text> */}
            </Pressable>

            <Pressable
              style={({pressed}) => [
                styles.headerElement,
                {
                  paddingTop: 0,
                  backgroundColor: pressed ? '#cccccc' : '#c5c5c5',
                },
              ]}
              onPress={shareApp}>
              <MaterialCommunityIcons name="share" size={34} color="#000000" />
            </Pressable>
          </View>
        </View>
        <View
          onStartShouldSetResponder={onTouchStart}
          onResponderRelease={onTouchEnd}
          style={styles.body}>
          <View style={styles.boardStyle}>
            {board.map((row, rowIndex) => (
              <View key={`cell-${rowIndex}`} style={styles.rowStyle}>
                {row.map((value, cellIndex) => (
                  <Cell key={`cell-${cellIndex}`} value={value} />
                ))}
              </View>
            ))}
          </View>
          {showBackgroundOverlay && <View style={styles.overlay} />}
          {showFireworks && (
            <LottieView
              source={require('../../../assets/karabuk/fireworks.json')}
              autoPlay
              loop={false}
              style={styles.fireworksAnimation}
              onAnimationFinish={() => {
                setShowFireworks(false);
                setShowBackgroundOverlay(false);
                reset();
              }}
            />
          )}
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  AppBar: {
    marginTop: 10,
    paddingHorizontal: 37,
    paddingVertical: 30,
    fontSize: 50,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerHigh: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 5,
    paddingHorizontal: 20,
    width: width * 0.4,
    height: height * 0.1,
    borderRadius: 12,
    backgroundColor: '#c5c5c5',
    marginRight: 12,
  },
  headerElement: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: '#c5c5c5',
    // marginRight: 12,
  },

  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    borderBottomColor: '#000',
  },
  boardStyle: {
    width: width - 20,
    padding: 8,
    backgroundColor: '#ffe413',
  },
  rowStyle: {
    flexDirection: 'row',
    height: (width - 20) / 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 2,
  },
  fireworksAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});

export default GameController;
