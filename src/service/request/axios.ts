import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { FCRequestInterceptors, FCRequestConfig } from './type'
export default class FCRequest {
  instance: AxiosInstance
  interceptors?: FCRequestInterceptors
  constructor(config: FCRequestConfig) {
    this.instance = axios.create(config)

    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        return data
      },
      (err) => {
        return err
      }
    )
  }
  request<T = any>(config: FCRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then(
          (res) => {
            // 1.单个请求对数据的处理
            if (config.interceptors?.responseInterceptor) {
              res = config.interceptors.responseInterceptor(res)
            }
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: FCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: FCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: FCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: FCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
