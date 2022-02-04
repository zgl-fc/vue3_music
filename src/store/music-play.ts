import type { Module } from 'vuex'
import { IRootState } from './types'

import { getPlayerMusic, getPlayerLyric } from '@/service/player'

import { PLAY_MODE } from '@/utils/constant'

function findIndex(list: any[], song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export interface IMusicPlayState {
  playlist: any[]
  playing: boolean
  currentIndex: number
  fullScreen: boolean
  lyriclist: any[]
  playMode: PLAY_MODE
}
const musicPlay: Module<IMusicPlayState, IRootState> = {
  namespaced: true,
  state: {
    playing: false,
    playlist: [],
    currentIndex: 0,
    fullScreen: false,
    lyriclist: [],
    playMode: PLAY_MODE.Sequence
  },
  mutations: {
    changePlaying(state, playing) {
      state.playing = playing
    },
    changeLyriclist(state, lyriclist) {
      state.lyriclist = lyriclist
    },
    changePlaylist(state, playlist) {
      state.playlist = playlist
    },
    changeFullScreen(state, fullScreen) {
      state.fullScreen = fullScreen
    },
    changeCurrentIndex(state, currentIndex) {
      state.currentIndex = currentIndex
    },
    changePlayMode(state, playMode) {
      state.playMode = playMode
    }
  },
  getters: {
    currentSong(state) {
      return state.playlist[state.currentIndex] || {}
    },
    currentLyric(state) {
      return state.lyriclist[state.currentIndex] || ''
    }
  },
  actions: {
    addSongAction({ state, commit }, songItem: any) {
      const playlist = state.playlist.slice()
      const lyriclist = state.lyriclist.slice()
      let currentIndex = state.currentIndex
      const playIndex = findIndex(playlist, songItem)

      if (playIndex > -1) {
        currentIndex = playIndex
      } else {
        playlist.push(songItem)
        currentIndex = playlist.length - 1
        // 没有这首歌的话就去 请求歌词
        getPlayerLyric(songItem.id).then((res) => {
          lyriclist.push(res.lrc.lyric)
          commit('changeLyriclist', lyriclist)
        })
      }
      commit('changePlaylist', playlist)
      commit('changeCurrentIndex', currentIndex)
      commit('changePlaying', true)
      commit('changeFullScreen', true)
    }
  }
}

export default musicPlay
