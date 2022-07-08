import { useNavigate } from "react-router-dom";
import { auth } from "./../global/actions";
import { useAppDispatch, useAppSelector } from "./../global/hooks";

export function useAuthToken() {
    const authToken = useAppSelector((state) => state.authToken);
    const dispatch = useAppDispatch();
    function setAuthToken(newAuthToken: string) {
        dispatch(auth.setAuthToken(newAuthToken));
    }
    return [authToken, setAuthToken] as const;
}

export function useLogout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return () => {
        dispatch(auth.setAuthToken(""));
        navigate("/login");
    }
};