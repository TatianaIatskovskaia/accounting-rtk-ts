import {Navigate, Route, Routes} from "react-router";
import './App.css'
import Profile from "./components/Profile";
import Guest from "./components/Guest";
import ProtectedLayout from "./ProtectedLayout.tsx";

function App() {
    //TODO implement token retrieval from global state logic
    const token = '';

    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to={'/profile'} replace={true}/> : <Guest/>}/>
            <Route element={<ProtectedLayout token={token} />}>
                <Route path={"/profile"} element={<Profile/>}/>
            </Route>
        </Routes>
    )
}

export default App
