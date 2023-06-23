import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./styles"

interface SearchBarProps {
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFF7D4',
          borderRadius: 20,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'gray',
          flex: 1,
        }}
      >
        <TextInput
          style={{ flex: 1, height: 40, paddingHorizontal: 10 }}
          placeholder="Pesquisar..."
          // Adicione os outros atributos necessários para o TextInput
        />

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
            <View style={styles.searchIconContainer}>
              <Ionicons name="search" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
