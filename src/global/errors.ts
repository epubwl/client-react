export class HttpRequestError extends Error {
    public code: number;

    constructor(code: number, ...params: any[]) {
        super(...params)
        this.name = "HttpRequestError";
        this.code = code;
    }
}