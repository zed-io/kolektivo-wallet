import { Vendor, Vendors, VendorWithLocation } from 'src/vendors/types'

export enum Actions {
  FETCH_VENDORS = 'VENDORS/FETCH_VENDORS',
  SET_VENDORS = 'VENDORS/SET_VENDORS',
  SET_LOADING = 'VENDORS/SET_LOADING',
  SET_CURRENT_VENDOR = 'VENDORS/SET_CURRENT_VENDOR',
  SET_FILTERED_VENDORS = 'VENDORS/SET_FILTERED_VENDORS',
  SET_SEARCH_QUERY = 'VENDORS/SET_SEARCH_QUERY',
}

export interface FetchVendorsAction {
  type: Actions.FETCH_VENDORS
}

export interface SetLoadingAction {
  type: Actions.SET_LOADING
  loading: boolean
}

export interface setVendorsAction {
  type: Actions.SET_VENDORS
  allVendors: Vendors
}

export interface SetSearchQueryAction {
  type: Actions.SET_SEARCH_QUERY
  searchQuery: string
}

export interface SetFilteredVendorsAction {
  type: Actions.SET_FILTERED_VENDORS
  filteredVendors: (Vendor | VendorWithLocation)[]
}

export interface SetCurrentVendorAction {
  type: Actions.SET_CURRENT_VENDOR
  currentVendor: Vendor | undefined
}

export const fetchVendors = (): FetchVendorsAction => ({
  type: Actions.FETCH_VENDORS,
})

export const setVendors = (allVendors: Vendors): setVendorsAction => ({
  type: Actions.SET_VENDORS,
  allVendors,
})

export const setSearchQuery = (searchQuery: string): SetSearchQueryAction => ({
  type: Actions.SET_SEARCH_QUERY,
  searchQuery,
})

export const setFilteredVendors = (
  filteredVendors: (Vendor | VendorWithLocation)[]
): SetFilteredVendorsAction => ({
  type: Actions.SET_FILTERED_VENDORS,
  filteredVendors,
})

export const setLoading = (loading: boolean): SetLoadingAction => ({
  type: Actions.SET_LOADING,
  loading,
})
export const setCurrentVendor = (currentVendor: Vendor | undefined): SetCurrentVendorAction => ({
  type: Actions.SET_CURRENT_VENDOR,
  currentVendor,
})

export type ActionTypes =
  | FetchVendorsAction
  | setVendorsAction
  | SetLoadingAction
  | SetCurrentVendorAction
  | SetFilteredVendorsAction
  | SetSearchQueryAction
