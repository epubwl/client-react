import React, { useEffect, useState } from "react";
import { HttpRequestError } from "./../global/errors";
import { useHttpRequestErrorToast } from "./../global/hooks";

export function useFileUploadHandler(fileUploadFunction: (file: File) => Promise<void>) {
    const httpRequestErrorToast = useHttpRequestErrorToast();

    return async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const file = files[0];
            if (file && file.size) {
                try {
                    await fileUploadFunction(file);
                } catch (error) {
                    if (error instanceof HttpRequestError) {
                        httpRequestErrorToast(error.code);
                    } else {
                        throw error;
                    }
                }
            }
        }
    };
};

export function useObjectUrl() {
    const [object, setObject] = useState<null | Blob | MediaSource>(null);
    const [objectUrl, setObjectUrl] = useState<string>("");
    useEffect(() => {
        const newObjectUrl = object ? URL.createObjectURL(object) : "";
        setObjectUrl(newObjectUrl);
        return () => URL.revokeObjectURL(newObjectUrl);
    }, [object]);
    return [objectUrl, setObject] as const;
};

export function useSaveBlob() {
    const [filename, setFilename] = useState<string>("");
    const [objectUrl, setObject] = useObjectUrl();
    useEffect(() => {
        if (objectUrl) {
            const a = document.createElement("a");
            a.href = objectUrl;
            a.download = filename;
            a.click();
        }
    }, [objectUrl, filename]);
    return (blob: Blob, filename: string) => {
        setObject(blob);
        setFilename(filename);
    };
};