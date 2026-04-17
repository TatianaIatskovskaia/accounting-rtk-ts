import ProfileData from "./ProfileData.tsx";
import UpdateUser from "./UpdateUser.tsx";

const Profile = () => {

    const handleClickLogOut = () => {
        //TODO: Implement logout functionality
        alert('Logout successful!');
    }

    return (
        <div>
            <ProfileData/>
            <button onClick={handleClickLogOut}>Logout</button>
            <UpdateUser/>
        </div>
    );
};

export default Profile;