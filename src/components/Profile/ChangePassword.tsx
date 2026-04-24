import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useChangePasswordMutation, useFetchUserQuery} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/const.ts";
import {setToken} from "../../features/token/tokenSlice.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.token);
    const {data} = useFetchUserQuery(token);
    const [changePassword] = useChangePasswordMutation();

    const handleClickClear = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    const handleClickSave = async () => {
        if (newPassword === confirmPassword) {
            const token = createToken(data!.login, oldPassword);
            try {
                const {error} = await changePassword({newPassword, token})
                if (error) {
                    console.log('Change password error', error);
                } else {
                    dispatch(setToken(createToken(data!.login, newPassword)))
                }
            } catch (e) {
                console.log('Error', e);
            }
            close();
        } else {
            alert('Passwords do not match!');
            setNewPassword('');
            setConfirmPassword('');
            return;
        }
    }

    return (
        <>
            <label>Password:
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}/>
            </label>
            <label>New Password:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}/>
            </label>
            <label>Confirm Password:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without saving</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default ChangePassword;