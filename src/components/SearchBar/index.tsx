import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./styles"

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

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
          height: '100%'
        }}
      >
        <TextInput
          style={{ flex: 1, height: 40, paddingHorizontal: 10 }}
          placeholder="Quem eu estou procurando?"
          value={searchText}
          onChangeText={setSearchText}
        />

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <View style={styles.searchIconContainer}>
              <Ionicons name="search" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
