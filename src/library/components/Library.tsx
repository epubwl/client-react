import { useCallback, useEffect, useState } from "react";
import { Grid } from "@chakra-ui/react";
import { EpubCard } from "./EpubCard";
import { useAPI } from "./../../api";
import { EpubMetadata } from "./../../api/interfaces";
import { PageWithNavBar } from "./../../global/components/PageWithNavBar";
import { HttpRequestError } from "./../../global/errors";
import { useAuthToken, useLogout } from "./../../user/hooks";

export function Library() {
    const api = useAPI();
    const logout = useLogout();
    const [epubMetadatas, setEpubMetadatas] = useState<Array<EpubMetadata>>([]);
    const [authToken] = useAuthToken();
    const fetchData = useCallback(async () => {
        try {
            setEpubMetadatas(await api.search(authToken));
        } catch (error) {
            if (error instanceof HttpRequestError && error.code === 401) {
                logout();
            } else {
                throw error;
            }
        }
    }, [authToken, logout, api]);
    useEffect(() => {fetchData()}, [fetchData]);
    const content = epubMetadatas.map((epubMetadata) => <EpubCard epubId={epubMetadata.epubId}></EpubCard>)
    return (
        <PageWithNavBar>
            <Grid templateColumns="repeat(auto-fill, 150px)" alignItems="space-around" justifyContent="space-around">
                {content}
            </Grid>
        </PageWithNavBar>
    )
};