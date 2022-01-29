import type { Module } from 'vuex'
import type { IRootState } from './types'
import { getTopList } from '@/service/music'
export interface IRankState {
  rankList: any[]
}

const rankModule: Module<IRankState, IRootState> = {
  namespaced: true,
  state: {
    rankList: []
  },
  mutations: {
    changeRankList(state, rankList) {
      state.rankList = rankList
    }
  },
  actions: {
    getRankListAction({ commit }) {
      const promiseall: any[] = []
      for (let i = 0; i < 4; i++) {
        promiseall.push(getTopList(i))
      }
      Promise.all(promiseall).then((res) => {
        const resList: any[] = []
        for (const item of res) {
          resList.push(item.playlist)
        }
        commit('changeRankList', resList)
      })
    }
  }
}

export default rankModule
