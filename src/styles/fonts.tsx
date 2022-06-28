import { StyleSheet } from 'react-native'
import colors from 'src/styles/colors'

const Poppins = {
  SemiBold: 'Poppins-SemiBold',
}

const Lato = {
  Regular: 'Lato-Regular',
  Medium: 'Lato-Medium',
  Bold: 'Lato-Bold',
}

export const fontFamily = Poppins.SemiBold

const standards = {
  large: {
    fontSize: 28,
    lineHeight: 32,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  regular: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
}
// Figma Font Styles
const fontStyles = StyleSheet.create({
  h1: {
    fontSize: 26,
    lineHeight: 32,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  sectionHeader: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Lato.Medium,
    color: colors.dark,
  },
  navigationHeader: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  notificationHeadline: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: Lato.Medium,
    color: colors.dark,
  },
  displayName: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Lato.Medium,
    color: colors.dark,
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: Lato.Medium,
    color: colors.dark,
  },
  large: standards.large,
  regular: standards.regular,
  small: standards.small,
  large600: { ...standards.large, fontFamily: Poppins.SemiBold },
  regular600: { ...standards.regular, fontFamily: Poppins.SemiBold },
  small600: { ...standards.small, fontFamily: Poppins.SemiBold },
  large500: { ...standards.large, fontFamily: Poppins.SemiBold },
  regular500: { ...standards.regular, fontFamily: Poppins.SemiBold },
  small500: { ...standards.small, fontFamily: Poppins.SemiBold },
  small400: { ...standards.small, fontFamily: Poppins.SemiBold },
  center: {
    textAlign: 'center',
  },
  mediumNumber: {
    lineHeight: 27,
    fontSize: 24,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  largeNumber: {
    lineHeight: 40,
    fontSize: 32,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  iconText: {
    fontSize: 16,
    fontFamily: Poppins.SemiBold,
    color: colors.light,
  },
  emptyState: {
    ...standards.large,
    color: colors.gray3,
    textAlign: 'center',
  },
})

export default fontStyles

// map of deprecated font names to new font styles.
export const oldFontsStyles = StyleSheet.create({
  body: fontStyles.regular,
  bodySmall: fontStyles.small,
  bodySmallBold: fontStyles.small600,
  bodyBold: fontStyles.regular600,
  bodySmallSemiBold: fontStyles.small600,
  sectionLabel: fontStyles.sectionHeader,
  sectionLabelNew: fontStyles.sectionHeader,
  headerTitle: fontStyles.regular600,
})
