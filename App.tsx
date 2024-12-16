import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CharacterContextProvider } from './src/context/CharacterContext';
import NavigationScreen from './src/screens/NavigationScreen';

const App: React.FC = () => {
  return (
    <CharacterContextProvider>
      <NavigationContainer>
        <NavigationScreen />
      </NavigationContainer>
    </CharacterContextProvider>
  );
};

export default App;
