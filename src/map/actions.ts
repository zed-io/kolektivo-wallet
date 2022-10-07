import { MapCategory } from 'src/map/constants'
import { Vendor, VendorWithLocation } from 'src/vendors/types'

export enum Actions {
  SET_CATEGORY = 'MAP/SET_CATEGORY',
  SET_FILTERED_VENDORS = 'MAP/SET_FILTERED_VENDORS',
  SET_SEARCH_QUERY = 'MAP/SET_SEARCH_QUERY',
}

export interface SetMapCategoryAction {
  type: Actions.SET_CATEGORY
  category: MapCategory
}

export interface SetSearchQueryAction {
  type: Actions.SET_SEARCH_QUERY
  searchQuery: string
}

export interface SetFilteredVendorsAction {
  type: Actions.SET_FILTERED_VENDORS
  filteredVendors: (Vendor | VendorWithLocation)[]
}

export const setMapCategory = (category: MapCategory) => ({
  type: Actions.SET_CATEGORY,
  category,
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

export type ActionTypes = SetFilteredVendorsAction | SetSearchQueryAction | SetMapCategoryAction
