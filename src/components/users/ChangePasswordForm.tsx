import { changePasswordFn } from "../../lib/user/changePassword";
import { useState } from "react";
import styles from "./styles/changePasswordForm.module.css";

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordChangeMsg, setPasswordChangeMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // send error if oldpassword === new password
    try {
      await changePasswordFn({
        oldPassword,
        newPassword,
        setErrMsg,
      });
      setErrMsg("");
      setPasswordChangeMsg(true);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {}
  }
  return (
    <div className={styles.passwordChangeFormcontainer}>
      <form onSubmit={handleChangePassword}>
        {errMsg && <p className={styles.errMsg}>{errMsg}</p>}
        <div>
          <label htmlFor="newPassword">Enter old password</label>
          <input
            type="oldPassword"
            onChange={(e) => setOldPassword(e.target.value)}
            name="oldPassword"
            value={oldPassword}
          />
        </div>
        <div>
          <label htmlFor="newPassword">Enter new password</label>
          <input
            type="oldPassword"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button>Change password</button>
      </form>
      {passwordChangeMsg && (
        <p className={styles.changeSuccessMsg}>Password change successful</p>
      )}
    </div>
  );
}
export default ChangePasswordForm;
