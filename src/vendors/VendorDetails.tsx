import { map } from 'lodash'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Button, { BtnSizes, BtnTypes } from 'src/components/Button'
import Touchable from 'src/components/Touchable'
import Directions from 'src/icons/Directions'
import Phone from 'src/icons/Phone'
import QRCodeBorderless from 'src/icons/QRCodeBorderless'
import Share from 'src/icons/Share'
import Times from 'src/icons/Times'
import { initiateDirection, initiatePhoneCall, initiateShare } from 'src/map/utils'
import colors, { Colors } from 'src/styles/colors'
import fontStyles from 'src/styles/fonts'
import { Vendor, VendorWithLocation } from 'src/vendors/types'

type Props = {
  vendor: Vendor
  close: () => void
  action: () => void
}

const VendorDetails = ({ vendor, close, action }: Props) => {
  const { title, subtitle, description, tags, logoURI, phoneNumber } = vendor
  const { location } = vendor as VendorWithLocation
  return (
    <View style={styles.container}>
      <View style={styles.sheetHeader}>
        <View style={styles.sheetIcon}>
          <Image source={{ uri: logoURI }} style={styles.vendorIcon} />
        </View>
        <Touchable style={styles.sheetClose} onPress={close}>
          <Times />
        </Touchable>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.contactRow}>
          {phoneNumber && (
            <TouchableOpacity onPress={() => initiatePhoneCall(phoneNumber)}>
              <Phone />
            </TouchableOpacity>
          )}
          {location && (
            <TouchableOpacity onPress={() => initiateDirection({ coordinate: location })}>
              <Directions />
            </TouchableOpacity>
          )}
          {true && (
            <TouchableOpacity onPress={() => initiateShare({ message: title })}>
              <Share />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.tags}>
          {map(tags, (tag) => (
            <Button
              type={BtnTypes.ONBOARDING_SECONDARY}
              size={BtnSizes.TINY}
              text={`${tag}`}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onPress={() => {}}
            />
          ))}
        </View>
        {/* @todo Add Send button */}
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={action}>
            <QRCodeBorderless />
          </TouchableOpacity>
        </View>
        {/* @todo Add QR scanning button, this should utilize deep linking */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '30%',
    paddingBottom: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  innerContainer: {
    marginHorizontal: 20,
  },
  title: {
    ...fontStyles.h2,
    textAlign: 'center',
    paddingHorizontal: 36,
    marginBottom: 16,
  },
  subtitle: {
    ...fontStyles.regular,
    textAlign: 'center',
    color: colors.gray5,
    paddingHorizontal: 36,
    marginBottom: 16,
  },
  description: {
    ...fontStyles.regular,
    textAlign: 'justify',
    fontSize: 14,
  },
  sheetHeader: {
    flexDirection: 'row',
    paddingBottom: 16,
  },
  sheetIcon: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sheetClose: {
    padding: 13,
    position: 'absolute',
    right: 0,
  },
  vendorIcon: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: Colors.gray3,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  actionButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default VendorDetails
