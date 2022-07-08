import { Library } from "./../../library/components/Library";
import { Login } from "./../../user/components/Login";
import { useAuthToken } from "./../../user/hooks";

export function Home() {
    const [authToken,] = useAuthToken();

    if (authToken) {
        return <Library />
    } else {
        return <Login />
    }
};