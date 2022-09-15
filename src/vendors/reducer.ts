import { Actions, ActionTypes } from 'src/vendors/actions'
import { Vendor, Vendors, VendorWithLocation } from 'src/vendors/types'

export interface State {
  allVendors: Vendors
  loading: boolean
  currentVendor: Vendor | undefined
  filteredVendors: (Vendor | VendorWithLocation)[]
  searchQuery: string
}

export const initialState = {
  allVendors: {},
  loading: false,
  currentVendor: undefined,
  filteredVendors: [],
  searchQuery: '',
}

export const reducer = (state: State | undefined = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case Actions.SET_VENDORS:
      return {
        ...state,
        allVendors: {
          ...action.allVendors,
        },
      }
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
    case Actions.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    case Actions.SET_CURRENT_VENDOR:
      return {
        ...state,
        currentVendor: action.currentVendor,
      }
    default:
      return state
  }
}
