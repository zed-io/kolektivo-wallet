import { Actions, ActionTypes } from 'src/map/actions'
import { MapCategory } from 'src/map/constants'
import { FoodForest, FoodForests } from 'src/map/types'
import { Vendor, VendorWithLocation } from 'src/vendors/types'

export interface State {
  mapCategory: MapCategory
  filteredVendors: (Vendor | VendorWithLocation)[]
  searchQuery: string
  currentFoodForest: FoodForest
  allFoodForests: FoodForests
}

export const initialState = {
  mapCategory: MapCategory.All,
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
        mapCategory: action.category,
      }
    case Actions.SET_FOOD_FORESTS:
      return {
        ...state,
        allFoodForests: action.foodForests,
      }
    default:
      return state
  }
}
