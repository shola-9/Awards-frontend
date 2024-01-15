import { authFn } from "../../lib/user/auth";
import { useState } from "react";
import styles from "../register/register.module.css";

type Props = {
  passedEmail?: string;
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ passedEmail, setDisplayRegisterForm }: Props): JSX.Element {
  const [email, setEmail] = useState(passedEmail ?? "");
  const [password, setPassword] = useState("");
  const [robotCheck, setRobotCheck] = useState<number | undefined>(undefined);
  const correctRobotCheckAns = 6;
  const [errMsg, setErrMsg] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await authFn({ email, password, setErrMsg }, "login");
      // Reset error message if authentication succeeds
      setErrMsg("");
    } catch (error) {
      // Error is already handled in authFn, so no need to do anything here
    }
  }

  const prevent = robotCheck != correctRobotCheckAns || !email || !password;
  return (
    <div className={styles.container}>
      <div
        className={styles.closeForm}
        onClick={(e) => setDisplayRegisterForm(false)}
      >
        X
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        {errMsg && <p className={styles.errMsg}>{errMsg}</p>}
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
        <div className={styles.robotCheck}>
          <label htmlFor="robotCheck">What is 3 + 3?</label>
          <input
            type="text"
            id="robotCheck"
            name="robotCheck"
            placeholder="Robot check"
            onChange={(event) => setRobotCheck(Number(event.target.value))}
            value={robotCheck}
            required
            aria-required
          />
        </div>
        <button
          className={prevent ? `${styles.disabled}` : `${styles.submitBtn}`}
          disabled={prevent}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default Login;
