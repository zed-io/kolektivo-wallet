import { StyleSheet } from 'react-native'
import colors from 'src/styles/colors'

const Poppins = {
  SemiBold: 'Lato-Bold',
}

const Lato = {
  Regular: 'Lato-Regular',
  SemiBold: 'Lato-Black',
  Bold: 'Lato-Bold',
}

export const fontFamily = Poppins.SemiBold

const standards = {
  large: {
    fontSize: 20,
    lineHeight: 23,
    color: colors.dark,
  },
  regular: {
    fontSize: 18,
    lineHeight: 21,
    color: colors.dark,
  },
  small: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.dark,
  },
}
// Figma Font Styles
const fontStyles = StyleSheet.create({
  h1: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  h2: {
    ...standards.regular,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  sectionHeader: {
    ...standards.small,
    fontFamily: Lato.Regular,
    color: colors.dark,
  },
  navigationHeader: {
    ...standards.regular,
    fontFamily: Poppins.SemiBold,
    color: colors.dark,
  },
  notificationHeadline: {
    ...standards.large,
    fontFamily: Lato.Regular,
    color: colors.dark,
  },
  displayName: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: Lato.Regular,
    color: colors.dark,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Lato.Regular,
    color: colors.dark,
  },
  large: {
    ...standards.large,
    fontFamily: Lato.Regular,
  },
  regular: {
    ...standards.regular,
    fontFamily: Lato.Regular,
  },
  small: {
    ...standards.small,
    fontFamily: Lato.Regular,
  },
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

// @note buttons on onboarding should use Lato
