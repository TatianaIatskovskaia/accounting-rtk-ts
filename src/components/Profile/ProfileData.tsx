import {useAppSelector} from "../../app/hooks.ts";

const ProfileData = () => {
    const user = useAppSelector(state => state.user)

    return (
        <>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Login: {user.login}</p>
            <ul>
                {user.roles.map((role) => <li key={role}>{role}</li>)}
            </ul>
        </>
    );
};

export default ProfileData;