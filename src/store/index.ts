import { createStore, useStore as vuseStore, Store } from 'vuex'
import type { IStoreType, IRootState } from './types'
import rank from './rank'
import musicPlay from './music-play'
export default createStore<IRootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    rank,
    musicPlay
  }
})

export function useStore(): Store<IStoreType> {
  return vuseStore()
}
