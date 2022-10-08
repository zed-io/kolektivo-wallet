import { BottomSheetHandleProps } from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { includes, remove, valuesIn } from 'lodash'
import React, { memo, useMemo } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import Button, { BtnSizes, BtnTypes } from 'src/components/Button'
import Searchbar from 'src/components/SearchBar'
import { removeMapCategory, setMapCategory } from 'src/map/actions'
import { MapCategory } from 'src/map/constants'
import { currentMapCategorySelector } from 'src/map/selector'
import variables from 'src/styles/variables'
import Logger from 'src/utils/Logger'
import { currentVendorSelector } from 'src/vendors/selector'

interface CustomHandleProps extends BottomSheetHandleProps {
  title: string
  style?: StyleProp<ViewStyle>
  ref: React.RefObject<BottomSheetMethods>
}

const MapSheetHandle: React.FC<CustomHandleProps> = ({ title, style, animatedIndex, ref }) => {
  const dispatch = useDispatch()
  const mapCategory = useSelector(currentMapCategorySelector)
  const currentVendor = useSelector(currentVendorSelector)
  const containerStyle = useMemo(() => [styles.container, style], [style])
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const borderTopRadius = interpolate(animatedIndex.value, [1, 2], [20, 0], Extrapolate.CLAMP)
    return {
      borderTopLeftRadius: borderTopRadius,
      borderTopRightRadius: borderTopRadius,
    }
  })

  const handleFilterToggle = (category: MapCategory) => {
    if (includes(mapCategory, category)) {
      dispatch(removeMapCategory(category))
    } else {
      dispatch(setMapCategory(category))
    }
  }

  const renderFilters = () => {
    return (
      <>
        {remove(valuesIn(MapCategory), (x) => x !== 'All').map((cat: string) => {
          return (
            <Button
              style={styles.filterButton}
              text={cat}
              size={BtnSizes.SMALL}
              type={
                mapCategory.includes(cat as MapCategory) ? BtnTypes.PRIMARY : BtnTypes.SECONDARY
              }
              onPress={() => {
                handleFilterToggle(cat as MapCategory)
              }}
            />
          )
        })}
      </>
    )
  }

  // render
  return (
    <Animated.View
      style={[containerStyle, containerAnimatedStyle]}
      renderToHardwareTextureAndroid={true}
    >
      {!currentVendor && <View style={[styles.headerFilter, styles.flex]}>{renderFilters()}</View>}
      <View style={[styles.searchFilter]}>
        <Searchbar isInBottomSheet={true} />
      </View>
    </Animated.View>
  )
}

export default memo(MapSheetHandle)

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    zIndex: 99999,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerFilter: {
    marginTop: -50,
    width: '100%',
  },
  searchFilter: {
    marginTop: variables.contentPadding * 1.5,
  },
  filterButton: {
    marginHorizontal: 2,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOpacity: 0.2,
  },
})
