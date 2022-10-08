import { MapCategory } from 'src/map/constants'
import { FoodForest, FoodForests } from 'src/map/types'
import { Vendor, VendorWithLocation } from 'src/vendors/types'

export enum Actions {
  SET_CATEGORY = 'MAP/SET_CATEGORY',
  SET_FILTERED_VENDORS = 'MAP/SET_FILTERED_VENDORS',
  SET_SEARCH_QUERY = 'MAP/SET_SEARCH_QUERY',
  SET_FOOD_FORESTS = 'MAP/SET_FOOD_FORESTS',
}

export interface SetMapCategoryAction {
  type: Actions.SET_CATEGORY
  category: MapCategory
}

export interface SetSearchQueryAction {
  type: Actions.SET_SEARCH_QUERY
  searchQuery: string
}

export interface SetFoodForestsAction {
  type: Actions.SET_FOOD_FORESTS
  foodForests: FoodForests
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

export const setFoodForests = (foodForests: FoodForests): SetFoodForestsAction => ({
  type: Actions.SET_FOOD_FORESTS,
  foodForests,
})

export type ActionTypes =
  | SetFilteredVendorsAction
  | SetSearchQueryAction
  | SetMapCategoryAction
  | SetFoodForestsAction
