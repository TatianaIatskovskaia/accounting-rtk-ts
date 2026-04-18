import {Navigate, Route, Routes} from "react-router";
import './App.css'
import Profile from "./components/Profile";
import Guest from "./components/Guest";
import {useAppSelector} from "./app/hooks.ts";

function App() {
    const token = useAppSelector(state => state.token)

    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to={'/profile'} replace={true}/> : <Guest/>}/>
            <Route path={"/profile"} element={token ? <Profile/> : <Navigate to={'/'} replace={true}/>}/>
        </Routes>
    )
}

export default App
