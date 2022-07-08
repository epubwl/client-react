import { API, Credentials, EpubMetadata } from "./interfaces";
import { HttpRequestError } from "./../global/errors";

export class ServerAPI implements API {
    base: string;

    constructor(base: string) {
        this.base = base;
    }

    async register({username, password}: Credentials): Promise<string> {
        const url = new URL("/api/users", this.base);
        const response = await fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({username, password})
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const data = await response.json();
        return data.token;
    }

    async login({username, password}: Credentials): Promise<string> {
        const url = new URL("/api/users/login", this.base);
        const response = await fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({username, password})
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const data = await response.json();
        return data.token;
    }

    async addEpub(authToken: string, data: Blob): Promise<EpubMetadata> {
        const url = new URL("/api/epubs", this.base);
        const response = await fetch(url, {
            method: "POST",
            headers: new Headers({
                "Authorization": `Bearer ${authToken}`
            }),
            body: data
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const epubMetadata = await response.json();
        return epubMetadata;
    }

    async getEpub(authToken: string, epubId: number): Promise<Blob> {
        const url = new URL(`/api/epubs/${epubId}`, this.base);
        const response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "Authorization": `Bearer ${authToken}`
            })
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const blob = await response.blob();
        return blob;
    }

    async replaceEpub(authToken: string, epubId: number, data: Blob): Promise<EpubMetadata> {
        const url = new URL(`/api/epubs/${epubId}`, this.base);
        const response = await fetch(url, {
            method: "PUT",
            headers: new Headers({
                "Authorization": `Bearer ${authToken}`
            }),
            body: data
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const epubMetadata = await response.json();
        return epubMetadata;
    }

    async deleteEpub(authToken: string, epubId: number): Promise<EpubMetadata> {
        const url = new URL(`/api/epubs/${epubId}`, this.base);
        const response = await fetch(url, {
            method: "DELETE",
            headers: new Headers({
                "Authorization": `Bearer ${authToken}`
            })
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const data = await response.json();
        return data;
    }

    async getCover(authToken: string, epubId: number): Promise<Blob> {
        const url = new URL(`/api/epubs/cover/${epubId}`, this.base);
        const response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "Authorization": `Bearer ${authToken}`
            })
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const blob = await response.blob();
        return blob;
    }

    async replaceCover(authToken: string, epubId: number, data: Blob): Promise<void> {
        const url = new URL(`/api/epubs/cover/${epubId}`, this.base);
        const response = await fetch(url, {
            method: "PUT",
            headers: new Headers({
                "Authorization": `Bearer ${authToken}`
            }),
            body: data
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
    }

    async getMetadata(authToken: string, epubId: number): Promise<EpubMetadata> {
        const url = new URL(`/api/epubs/metadata/${epubId}`, this.base);
        const response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "Authorization": `Bearer ${authToken}`
            })
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const data = await response.json();
        return data;
    }

    async replaceMetadata(authToken: string, metadata: EpubMetadata): Promise<EpubMetadata> {
        const url = new URL("/api/epubs/metadata", this.base);
        const response = await fetch(url, {
            method: "PUT",
            headers: new Headers({
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(metadata)
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const data = await response.json();
        return data;
    }

    async search(authToken: string): Promise<Array<EpubMetadata>> {
        const url = new URL("/api/epubs/search", this.base);
        const response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "Authorization": `Bearer ${authToken}`
            })
        });
        if (!response.ok) {
            throw new HttpRequestError(response.status);
        }
        const data = await response.json();
        return data;
    }
};