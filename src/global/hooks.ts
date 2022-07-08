import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { RootState, AppDispatch } from "./types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useHttpRequestErrorToast() {
    const toast = useToast();
    return (errorCode: number) => {
        toast({
            title: `HTTP Error ${errorCode}`,
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true
        });
    }
}