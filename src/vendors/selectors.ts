import { createSelector } from 'reselect'
import { RootState } from 'src/redux/reducers'

export const allVendorsSelector = (state: RootState) => state.vendors.allVendors

export const loadingVendorsSelector = (state: RootState) => state.vendors.loading

export const selectVendors = createSelector([allVendorsSelector], (allVendors) => allVendors)
export const selectLoading = createSelector([loadingVendorsSelector], (loading) => loading)
