import type { IRankState } from './rank'
export interface IRootState {}
export interface IRootWithModule {
  rank: IRankState
}
export type IStoreType = IRootState & IRootWithModule
