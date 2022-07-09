import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./config/chakra-ui";
import { store } from "./config/redux";
import { AppRoutes } from "./config/router";

export function App() {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <Router>
                    <AppRoutes />
                </Router>
            </ChakraProvider>
        </Provider>
    )
};
