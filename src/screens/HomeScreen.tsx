import React, { useEffect,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, FlatList, ActivityIndicator,Text,TextInput,TouchableOpacity } from 'react-native';
import { useCharacters } from '../context/CharacterContext';
import CharacterCard from '../components/CharacterCard';
import { ICharacter } from '../types/character';
import Icon from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Details: { character: ICharacter };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {characters,moreCharacters,loading,loadCharacters,searchNameCharacter,searchName} = useCharacters();
  const [searchTerm,setSearchTerm] = useState(searchName);
  

  const renderCard = ({ item }: { item: ICharacter }) => (
    <CharacterCard
      character={item}
      onPress={() => navigation.navigate('Details', { character: item })}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Cargando...</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No existen personajes</Text>
      </View>
    );
  };

  const handleSearch = () => {
    searchNameCharacter(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    searchNameCharacter('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Busca tu personaje favorito"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        {searchTerm ? (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Icon name="close-circle" size={30} color="#666" />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Icon name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={characters}
        initialNumToRender={4}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        onEndReached={() => {
          if(moreCharacters) {
            loadCharacters();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    width: 45,
    height: 45,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: '#0066',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearButton: {
    position: 'absolute',
    right: 60,
    top: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default HomeScreen;

