import React from 'react'
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native'
import Search from 'src/icons/Search'

interface Props {
  value?: string
  updateSearch?: (text: string) => void
  style?: ViewStyle
}

export default function Searchbar() {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Search />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          // onChangeText={this.handleSearch}
          placeholder="Search"
          style={styles.searchInput}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchBox: {
    display: 'flex',
    width: '87%',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    flexDirection: 'row',
  },
  searchInput: { marginLeft: 10, width: '100%' },
})
