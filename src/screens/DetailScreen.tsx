import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { ICharacter } from '../types/character';

interface DetailScreenProps {
  route: {
    params: {
      character: ICharacter;
    };
  };
}

export default function DetailScreen({ route }: DetailScreenProps) {
  const { character } = route.params;

  const getStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'dead':
        return '#FF0000'; // Red si el personaje esta muerto
      case 'alive':
        return '#008000'; // Verde si el personaje esta vivo 
      default:
        return '#1E90FF'; // Dodger Blue si el estado del personaje es desconocido
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} horizontal={false} scrollEnabled={false}>
      <View style={styles.infoContainer}>
        <Image
          resizeMode='cover'
          style={styles.image}
          source={{
            uri: character.image,
          }}
        />
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Especie:</Text>
          <Text style={styles.value}>{character.species}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Género:</Text>
          <Text style={styles.value}>{character.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, { color: getStatus(character.status) }]}>
            {character.status}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 20
  },
  infoContainer: {
    width: '90%',
  },
  image: {
    width: '100%',
    height: 300,
    marginTop:15,
    marginBottom: 20
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    textAlign:'left'
  },
});

