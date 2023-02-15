import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import QRCode from 'src/qrcode/QRGen'
import { SVG } from 'src/send/actions'
import Colors from 'src/styles/colors'

type Props = {
  content: string
  qrSvgReg: React.MutableRefObject<SVG>
}

const SerialisedKeyshare = ({ content, qrSvgReg }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode value={content} svgRef={qrSvgReg} size={300} ecl={'L'} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light,
  },
  qrContainer: {
    paddingTop: 16,
  },
})

export default SerialisedKeyshare
