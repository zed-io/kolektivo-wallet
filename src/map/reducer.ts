import { Actions, ActionTypes } from 'src/map/actions'
import { MapCategory } from 'src/map/constants'
import { Vendor, VendorWithLocation } from 'src/vendors/types'

export interface State {
  mapCategory: MapCategory
  filteredVendors: (Vendor | VendorWithLocation)[]
  searchQuery: string
}

export const initialState = {
  mapCategory: MapCategory.All,
  filteredVendors: [],
  searchQuery: '',
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
    default:
      return state
  }
}
