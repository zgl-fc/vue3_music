import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface FCRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface FCRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: FCRequestInterceptors<T>
}
