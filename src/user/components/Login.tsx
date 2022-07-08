import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Flex, Input, Spinner } from "@chakra-ui/react";
import { useAuthToken } from "./../hooks";
import { useAPI } from "./../../api";
import { Credentials } from "./../../api/interfaces";
import { PageWithNavBar } from "./../../global/components/PageWithNavBar";
import { HttpRequestError } from "./../../global/errors";
import { useHttpRequestErrorToast } from "./../../global/hooks";

export function Login() {
    const api = useAPI();
    const [credentials, setCredentials] = useState<Credentials>({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [, setAuthToken] = useAuthToken();
    const navigate = useNavigate();
    const httpRequestErrorToast = useHttpRequestErrorToast();

    async function handleLogin() {
        setLoading(true);
        try {
            const authToken = await api.login(credentials);
            setAuthToken(authToken);
            navigate("/library");
        } catch (error) {
            if (error instanceof HttpRequestError) {
                httpRequestErrorToast(error.code);
            } else {
                throw error;
            }
        }
        setLoading(false);
    }

    async function handleRegister() {
        setLoading(true);
        try {
            const authToken = await api.register(credentials);
            setAuthToken(authToken);
            navigate("/library");
        } catch (error) {
            if (error instanceof HttpRequestError) {
                httpRequestErrorToast(error.code);
            } else {
                throw error;
            }
        }
        setLoading(false);
    }

    return (
        <PageWithNavBar>
            <Flex height="calc(100vh - 76px)" alignItems="center" justifyContent="center">
                <Flex as="form" flexDirection="column" border="1px" borderRadius="10%" padding="2em">
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            id="username"
                            disabled={loading}
                            onChange={(event) => setCredentials({...credentials, username: event.target.value})}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            disabled={loading}
                            type="password"
                            onChange={(event) => setCredentials({...credentials, password: event.target.value})}
                        />
                    </FormControl>
                    
                    <Button
                        disabled={loading}
                        onClick={handleLogin}
                        type="submit"
                    >
                        {loading ? <Spinner /> : <>Log In</>}
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={handleRegister}
                    >
                        {loading ? <Spinner /> : <>Register</>}
                    </Button>
                </Flex>
            </Flex>
        </PageWithNavBar>
    )
};