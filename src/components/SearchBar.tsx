import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Search from 'src/icons/Search'
import { setFilteredVendors, setSearchQuery } from 'src/vendors/actions'
import { vendorsSelector } from 'src/vendors/selector'

export default function Searchbar() {
  const dispatch = useDispatch()
  const vendors = Object.values(useSelector(vendorsSelector))
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const filteredVendors = vendors.filter(
      (vendor) =>
        vendor.title.toLowerCase().includes(search.toLowerCase()) ||
        _.some(vendor.tags, (tag) => tag.toLowerCase().includes(search.toLowerCase()))
    )
    dispatch(setFilteredVendors(filteredVendors))
  }, [search])

  const handleSearch = (search: string) => {
    setSearch(search)
    dispatch(setSearchQuery(search))
  }

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Search />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={search}
          onChangeText={(e) => handleSearch(e)}
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
    width: 'auto',
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 25,
  },
  searchBox: {
    display: 'flex',
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    flexDirection: 'row',
    width: '100%',
  },
  searchInput: { marginLeft: 10, width: '100%', borderRadius: 25 },
})
