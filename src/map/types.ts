import { LatLng } from 'react-native-maps'

export type FoodForest = {
  data?: any
  title?: string
  ingress?: LatLng
}

export type FoodForests = {
  [name: string]: FoodForest
}
