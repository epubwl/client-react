import { Route, Routes } from "react-router-dom";
import { Home } from "./../global/components/Home";
import { Library } from "./../library/components/Library";
import { Viewer } from "./../library/components/Viewer";
import { Login } from "./../user/components/Login";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/:id" element={<Viewer />} />
        </Routes>
    )
};