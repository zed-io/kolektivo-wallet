import { call, put, take } from 'redux-saga/effects'
import { fetchAllVendors } from 'src/api/vendors'
import Logger from 'src/utils/Logger'
import { Actions, setLoading, setVendors } from 'src/vendors/actions'
import { formatVendors } from 'src/vendors/utils'

let vendorsInitialized: boolean = false
export function* watchFetchVendors(): any {
  while (true) {
    try {
      if (vendorsInitialized) yield take(Actions.FETCH_VENDORS)
      yield put(setLoading(true))
      const vendors: any = yield call(fetchAllVendors)
      const formattedVendorObject = formatVendors(vendors)
      yield put(setVendors(formattedVendorObject))
      yield put(setLoading(false))
      vendorsInitialized = true
    } catch (error: any) {
      yield Logger.error('Vendor Saga: ', 'Failed to get vendors', error)
      // @note The saga may throw an error when offline in any screen,
      // instead, of querying, the saga should wait until the client
      // tries to refresh the vendor list.
      yield take(Actions.FETCH_VENDORS)
    }
  }
}

export function* vendorsSaga() {
  // yield spawn(watchFetchVendors)
}
