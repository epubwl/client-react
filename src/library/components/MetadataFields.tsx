import { Grid } from "@chakra-ui/react";
import { MetadataField } from "./MetadataField";
import { EpubMetadata } from "./../../api/interfaces";

interface Props {
    metadata: EpubMetadata;
    setMetadata: (metadata: EpubMetadata) => void;
}

export function MetadataFields(props: Props) {
    return (
        <Grid templateColumns="auto 1fr" border="1px" padding="2em" overflowY="auto" width="100%">
            <MetadataField {...props} name="title" />
            <MetadataField {...props} name="creators" />
            <MetadataField {...props} name="languages" />
            <MetadataField {...props} name="date" />

            <MetadataField {...props} name="contributors" />
            <MetadataField {...props} name="coverage" />                
            <MetadataField {...props} name="format" />
            <MetadataField {...props} name="identifier" />
            <MetadataField {...props} name="publisher" />
            <MetadataField {...props} name="relation" />
            <MetadataField {...props} name="rights" />
            <MetadataField {...props} name="source" />
            <MetadataField {...props} name="subject" />
            <MetadataField {...props} name="type" />
        </Grid>
    )
};