// APIのベースURLを環境変数から取得。未設定の場合はローカルホストを使用
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type ApiResponse<T> = {
  data: T
  status: number
  ok: boolean
}

/**
 * APIクライアントの型定義とベース実装
 * 
 * @remarks
 * - APIリクエストの共通処理を提供
 * - エラーハンドリングとレスポンス整形を統一的に実施
 * - 環境変数からベースURLを取得
 * 
 * @example
 * ```ts
 * const response = await apiClient.get<UserData>('/users/1');
 * if (response.ok) {
 *   const userData = response.data;
 * }
 * ```
 */
export const apiClient = {
  /**
   * APIリクエストを実行する汎用メソッド
   * @param endpoint - リクエスト先のエンドポイント 
   * @param options - fetchのオプション設定
   * @returns APIレスポンスを含むPromise
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // デフォルトのヘッダー設定
    const defaultHeaders = {
      'Content-Type': 'application/json'
    }

    // リクエスト設定の作成
    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      },
      credentials: 'include' // CORSリクエストにクッキーを含める
    }

    try {
      // APIリクエストの実行
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
      const data = await response.json()

      // レスポンスデータの整形
      return {
        data,
        status: response.status,
        ok: response.ok
      }
    } catch (error) {
      // エラーハンドリング
      if (error instanceof Error) {
        console.error('APIエラー:', error.message)
      } else {
        console.error('不明なエラー:', error)
      }
      throw error
    }
  },

  // GETリクエスト用のヘルパーメソッド
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  },

  // POSTリクエスト用のヘルパーメソッド
  async post<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}

