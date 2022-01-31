import type { Module } from 'vuex'
import { IRootState } from './types'
export interface IMusicPlayState {
  playSongInfo: any
}
const musicPlay: Module<IMusicPlayState, IRootState> = {
  namespaced: true,
  state: {
    playSongInfo: {}
  },
  mutations: {
    changePlaySongInfo(state, playSongInfo) {
      state.playSongInfo = playSongInfo
    }
  },
  actions: {
    getPlaySongInfoAction({ commit }, playSongInfo) {
      console.log(playSongInfo)
      commit('changePlaySongInfo', playSongInfo)
    }
  }
}

export default musicPlay
