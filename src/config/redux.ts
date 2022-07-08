import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        authToken: localStorage.getItem("authToken") || ""
    },
    reducers: {
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.authToken = action.payload
        }
    }
});

export const store = configureStore({
    reducer: authSlice.reducer
});

store.subscribe(() => {
    const { authToken } = store.getState();
    localStorage.setItem("authToken", authToken);
});