export interface HttpApiResponse<T> {
    code: number,
    message: string,
    data: T
}