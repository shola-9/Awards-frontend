import { authFn } from "../lib/user/auth";
import { useState } from "react";
import styles from "./styles/login.module.css";
import SubHeading from "../components/app/SubHeading";
import { useLocation, useNavigate } from "react-router-dom";

function SignUpPage(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users_phone_number, setUsers_phone_number] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [retypePasswordError, setRetypePasswordError] = useState(false);
  const [robotCheck, setRobotCheck] = useState<number | string>("");
  const [errMsg, setErrMsg] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const correctRobotCheckAns = 6;
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (retypePassword !== password) {
      setRetypePasswordError(true);
      return console.log("passwords do not match");
    }

    try {
      await authFn(
        { username, email, password, users_phone_number, setErrMsg },
        "register"
      );
      // Reset error message if authentication succeeds
      setErrMsg("");
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/profile");
      }
    } catch (error) {
      // Error is already handled in authFn, so no need to do anything here
    }
  }

  const prevent =
    robotCheck != correctRobotCheckAns ||
    !email ||
    !password ||
    !username ||
    !users_phone_number;
  return (
    <div className={styles.loginPageContainer}>
      <SubHeading value="Sign Up" />
      <form onSubmit={handleSubmit}>
        {errMsg && <p className={styles.errMsg}>{errMsg}</p>}
        <div>
          <div className={styles.label}>
            <label htmlFor="username">{username && <p>Username</p>}</label>
          </div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Your name"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            required
            aria-required
            autoComplete="username"
          />
        </div>
        <div>
          <div className={styles.label}>
            <label htmlFor="email">{email && <p>Email</p>}</label>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jamesjaohnson@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            aria-required
            autoComplete="email"
          />
        </div>
        <div>
          <div className={styles.label}>
            <label htmlFor="users_phone_number">
              {users_phone_number && <p>Phone number</p>}
            </label>
          </div>
          <input
            type="users_phone_number"
            id="users_phone_number"
            name="users_phone_number"
            placeholder="enter phone number"
            onChange={(event) => setUsers_phone_number(event.target.value)}
            value={users_phone_number}
            required
            aria-required
            autoComplete="tel-national"
          />
        </div>
        <div>
          <div className={styles.label}>
            <label htmlFor="password">{password && <p>Password</p>}</label>
          </div>
          <input
            type={passwordVisibility ? "text" : "password"}
            id="password"
            name="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
            aria-required
            autoComplete="new-password"
          />
          <input
            type="button"
            value={passwordVisibility ? "Hide password" : "Show password"}
            onClick={() => setPasswordVisibility((prev) => !prev)}
            className={styles.passwordToggle}
          />
        </div>
        <div>
          <div className={styles.label}>
            <label htmlFor="re-type password">
              {retypePassword && <p>re-type password</p>}
            </label>
          </div>
          <input
            type={passwordVisibility ? "text" : "password"}
            id="re-type password"
            name="re-type password"
            placeholder="re-type password"
            onChange={(event) => setRetypePassword(event.target.value)}
            value={retypePassword}
            required
            aria-required
            autoComplete="new-password"
          />
        </div>

        <div>
          {retypePasswordError && (
            <p className={styles.errMsg}>
              Password and retype password do not match
            </p>
          )}
        </div>
        <div>
          <label htmlFor="robotCheck">What is 3 + 3?</label>
          <input
            type="text"
            id="robotCheck"
            name="robotCheck"
            placeholder="Robot check"
            onChange={(event) => setRobotCheck(event.target.value)}
            value={robotCheck}
            required
            aria-required
          />
        </div>

        <button
          disabled={prevent}
          className={prevent ? `${styles.disabled}` : `${styles.submitBtn}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default SignUpPage;
