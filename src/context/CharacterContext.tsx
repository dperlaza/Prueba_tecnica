import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ICharacter, ICharacterContext } from "../types/character";
import api from "../enviroment";

const CharacterContext = createContext<ICharacterContext | undefined>(undefined);

export const CharacterContextProvider = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");

 const getCharactersList = async (page: number = 1, name: string = "") => {
  if (loading || (totalPages > 0 && currentPage > totalPages)) return;
    setLoading(true);
    try {
      const response = await axios.get<{ info: { pages: number, count: number }, results: Character[] }>
      (
        `${api.BASE_URL}/character`,
        { params: { page, name } }
      );
      const newCharacters = response.data.results;
      setCharacters(page === 1 ? newCharacters : prevCharacters => [...prevCharacters, ...newCharacters]);
      setTotalPages(response.data.info.pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Ocurrio un error, intentelo mas tarde!', error);
      setCharacters([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };



  const searchNameCharacter = (term: string) => {
    setSearchName(term);
    setCurrentPage(1);
    getCharactersList(1, term);
  };

  const loadCharacters = () => {
    if (currentPage < totalPages) {
      getCharactersList(currentPage + 1, searchName);
    }
  };

  useEffect(() => {
    getCharactersList();
  }, []);

  const moreCharacters = currentPage <= totalPages;

  return (
    <CharacterContext.Provider value={{
       characters,
       loading,
       getCharactersList,
       moreCharacters,
       loadCharacters,
       searchNameCharacter,
       searchName
     }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('Ocurrio un error con el context');
  }
  return context;
};

