import React from "react";
import { Editable, EditableInput, EditablePreview, FormLabel, GridItem } from "@chakra-ui/react";
import { EpubMetadata } from "./../../api/interfaces";

interface Props {
    name: keyof Omit<EpubMetadata, "epubId" | "tags">;
    metadata: EpubMetadata;
    setMetadata: (metadata: EpubMetadata) => void;
}

function camelToTitle(name: string) {
    if (!name) {
        return name;
    }
    let result = name.replace(/([A-Z])/g, " $1");
    result = result.trim();
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}

export function MetadataField(props: Props) {
    const propertyValue = props.metadata[props.name];
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.setMetadata({
            ...props.metadata,
            [props.name]: event.target.value
        });
    }
    return (
        <>
            <GridItem>
                <FormLabel htmlFor={props.name}>
                    {camelToTitle(props.name)}
                </FormLabel>
            </GridItem>
            <GridItem>
                <Editable defaultValue={"" + (propertyValue || "")}>
                    <EditablePreview width="100%" />
                    <EditableInput id={props.name} onChange={handleChange} />
                </Editable>
            </GridItem>
        </>
    )
};