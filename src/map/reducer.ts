import { union, without } from 'lodash'
import { Actions, ActionTypes } from 'src/map/actions'
import { MapCategory } from 'src/map/constants'
import { FoodForest, FoodForests } from 'src/map/types'
import { Actions as VendorActions } from 'src/vendors/actions'
import { Vendor, VendorWithLocation } from 'src/vendors/types'

export interface State {
  mapCategory: MapCategory[]
  filteredVendors: (Vendor | VendorWithLocation)[]
  searchQuery: string
  currentFoodForest: FoodForest
  allFoodForests: FoodForests
}

export const initialState = {
  mapCategory: [MapCategory.Vendor, MapCategory.FoodForest],
  filteredVendors: [],
  searchQuery: '',
  currentFoodForest: {},
  allFoodForests: {},
}

export const reducer = (state: State | undefined = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case Actions.SET_FILTERED_VENDORS:
      return {
        ...state,
        filteredVendors: {
          ...action.filteredVendors,
        },
      }
    case Actions.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery,
      }
    case Actions.SET_CATEGORY:
      return {
        ...state,
        mapCategory: union(state.mapCategory, [action.category]) as MapCategory[],
      }
    case Actions.REMOVE_CATEGORY:
      return {
        ...state,
        mapCategory: without(state.mapCategory, action.category) as MapCategory[],
      }
    case Actions.SET_FOOD_FORESTS:
      return {
        ...state,
        allFoodForests: action.foodForests,
      }
    case Actions.SET_CURRENT_FOOD_FOREST:
      return {
        ...state,
        currentFoodForest: action.foodForest,
      }
    case VendorActions.SET_CURRENT_VENDOR:
      return {
        ...state,
        currentFoodForest: {},
      }

    default:
      return state
  }
}
