export interface API {
    register({username, password}: Credentials): Promise<string>;
    login({username, password}: Credentials): Promise<string>;
    addEpub(authToken: string, data: Blob): Promise<EpubMetadata>;
    getEpub(authToken: string, epubId: number): Promise<Blob>;
    replaceEpub(authToken: string, epubId: number, data: Blob): Promise<EpubMetadata>;
    deleteEpub(authToken: string, epubId: number): Promise<EpubMetadata>;
    getCover(authToken: string, epubId: number): Promise<Blob>;
    replaceCover(authToken: string, epubId: number, data: Blob): Promise<void>;
    getMetadata(authToken: string, epubId: number): Promise<EpubMetadata>;
    replaceMetadata(authToken: string, metadata: EpubMetadata): Promise<EpubMetadata>;
    search(authToken: string): Promise<Array<EpubMetadata>>;
};

export interface Credentials {
    username: string;
    password: string;
};

export interface EpubMetadata {
    epubId: number;
    owner: string;
    tags: Array<string>;
    contributors: string | null;
    coverage: string | null;
    creators: string | null;
    date: string | null;
    description: string | null;
    format: string | null;
    identifier: string | null;
    languages: string | null;
    publisher: string | null;
    relation: string | null;
    rights: string | null;
    source: string | null;
    subject: string | null;
    title: string | null;
    type: string | null;
};