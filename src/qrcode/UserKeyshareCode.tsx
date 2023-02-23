import React, { useMemo } from 'react'
import { useAsync } from 'react-async-hook'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyshareType } from 'src/backup/mpc/hooks'
import QRCode from 'src/qrcode/QRGen'
import { urlFromKeyshareData } from 'src/qrcode/schema'
import { SVG } from 'src/send/actions'
import colors from 'src/styles/colors'
import variables from 'src/styles/variables'
import Logger from 'src/utils/Logger'
import { useCapsule } from 'src/web3/hooks'

interface Props {
  content?: string
  qrSvgRef: React.MutableRefObject<SVG>
}

export default function UserKeyshareDisplay({ content, qrSvgRef }: Props) {
  const { generateKeyshareSecret } = useCapsule()

  const keyshareSecret = useAsync(async () => {
    const secret = await generateKeyshareSecret()
    return secret
  }, [])

  const qrContent = useMemo(
    () =>
      urlFromKeyshareData(
        {
          secret: keyshareSecret.result,
        },
        KeyshareType.User
      ),
    [keyshareSecret.result]
  )

  Logger.debug('Secret', JSON.stringify(qrContent))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.qrContainer}>
        {keyshareSecret.loading && <Text>Still retrieving secret.</Text>}
        {!keyshareSecret.loading && (
          <QRCode value={content ?? qrContent} size={variables.width / 2} svgRef={qrSvgRef} />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
  },
  qrContainer: {
    paddingTop: 16,
  },
})
