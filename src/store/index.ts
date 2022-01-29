import { createStore, useStore as vuseStore, Store } from 'vuex'
import type { IStoreType, IRootState } from './types'
import rank from './rank'
export default createStore<IRootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    rank
  }
})

export function useStore(): Store<IStoreType> {
  return vuseStore()
}
