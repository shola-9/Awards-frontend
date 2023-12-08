import { useQuery } from "@tanstack/react-query";
import { authFn } from "../../lib/user/auth";
import { useState } from "react";
import styles from "./register.module.css";

type Props = {
  passedEmail?: string;
  passedName?: string;
  passedPhoneNumber?: string;
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function Register({
  passedName,
  passedEmail,
  passedPhoneNumber,
  setDisplayRegisterForm,
}: Props): JSX.Element {
  const [username, setUsername] = useState(passedName ?? "");
  const [email, setEmail] = useState(passedEmail ?? "");
  const [password, setPassword] = useState("");
  const [users_phone_number, setUsers_phone_number] = useState(
    passedPhoneNumber ?? ""
  );
  const [retypePassword, setRetypePassword] = useState("");
  const [retypePasswordError, setRetypePasswordError] = useState(false);
  const [robotCheck, setRobotCheck] = useState<number | string>("");
  const correctRobotCheckAns = 6;

  const registerQuery = useQuery({
    queryKey: ["register"],
    queryFn: () => {
      const res = authFn(
        { username, email, password, users_phone_number },
        "register"
      );
      return res;
    },
    enabled: false,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (retypePassword !== password) {
      setRetypePasswordError(true);
      return console.log("passwords do not match");
    }
    await registerQuery.refetch();
    setDisplayRegisterForm(false);
  }

  const prevent =
    robotCheck != correctRobotCheckAns ||
    !email ||
    !password ||
    !username ||
    !users_phone_number;
  return (
    <div className={styles.container}>
      <div
        className={styles.closeForm}
        onClick={(e) => setDisplayRegisterForm(false)}
      >
        X
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="username"></label>
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
          <label htmlFor="email"></label>
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
          <label htmlFor="users_phone_number"></label>
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
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
            aria-required
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="re-type password"></label>
          <input
            type="password"
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

        <div className={styles.passwordErrorDiv}>
          {retypePasswordError && (
            <p className={styles.passwordError}>
              password and retype password do not match
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
          className={prevent ? `${styles.disabled}` : `${styles.submitBtn}`}
          disabled={prevent}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default Register;
