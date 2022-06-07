import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import fontStyles from 'src/styles/fonts'
import { Vendor } from 'src/vendors/types'

type Props = {
  key: string
  vendor: Vendor
  onPress: () => void
}

export default function VendorListItem({ vendor, key, onPress }: Props) {
  const { title, logoURI } = vendor
  return (
    <TouchableOpacity key={key} onPress={onPress} testID={`Vendors/VendorItem`}>
      <View style={styles.vendorItem}>
        <Image source={{ uri: logoURI }} style={styles.vendorIcon} />
        <View style={styles.vendorDetails}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  vendorItem: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginVertical: 10,
  },
  vendorIcon: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  vendorDetails: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    ...fontStyles.displayName,
  },
})
