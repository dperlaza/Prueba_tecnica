import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Character } from '../types/character';

interface ICharacterCard {
  character: Character;
  onPress: () => void;
}

const CharacterCard = ({ character, onPress }:ICharacterCard) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        style={styles.detailImage}
        source={{
          uri: character.image,
        }}
      />
      <Text style={styles.name}>{character.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
  }
});

export default CharacterCard;

