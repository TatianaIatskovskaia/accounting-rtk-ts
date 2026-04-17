import {Navigate, Outlet} from "react-router";

interface Props {
    token: string | null;
}

const ProtectedLayout = ({token}: Props) => {
    if (!token) {
        return <Navigate to={'/'} replace={true}/>;
    }
    return <Outlet/>;
};

export default ProtectedLayout;