import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Background} from '../Components/Background';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const games = [
  {id: '1', name: '3x3', root: 'GameController3', color: '#00ff00'},
  {id: '2', name: '4x4', root: 'GameController', color: '#00bfff'},
  {id: '3', name: '5x5', root: 'GameController5', color: '#cf000f'},
  {id: '4', name: '6x6', root: 'GameController6', color: '#ffe413'},
  {id: '5', name: '7x7', root: 'GameController7', color: '#ffffff'},
  {id: '6', name: '8x8', root: 'GameController8', color: '#5733FF'},
];

const MainScreen = ({navigation}) => {
  const renderGameItem = ({item}) => (
    <TouchableOpacity
      style={[styles.gameItem, {backgroundColor: item.color}]}
      onPress={() => navigation.navigate(item.root)}>
      <Text style={styles.gameItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>2048 Colorful 2</Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#ddd',
            width: '100%',
            marginVertical: 0,
          }}
        />
        <Text style={styles.title2}>Select Mode 🎮</Text>
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={renderGameItem}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 10,
    paddingVertical: 10,
    backgroundColor: '#3498db',
    width: width*0.95,
    borderRadius:10,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  title2: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#fff',
  },
  list: {
    width: '80%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  gameItem: {
    backgroundColor: '#3498db',
    width: width * 0.8,
    height: height * 0.085,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    flexDirection: 'row',
    elevation: 3, // veya shadow kullanabilirsiniz
    marginBottom: 15,
  },
  gameItemText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%',
    marginVertical: 5,
  },
});

export default MainScreen;
