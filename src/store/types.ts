import type { IRankState } from './rank'
import type { IMusicPlayState } from './music-play'
export interface IRootState {}
export interface IRootWithModule {
  rank: IRankState
  musicPlay: IMusicPlayState
}
export type IStoreType = IRootState & IRootWithModule
