import { useQuery } from "@tanstack/react-query";
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
  const [robotCheck, setRobotCheck] = useState<number | string>("");
  const correctRobotCheckAns = 6;

  const loginQuery = useQuery({
    queryKey: ["login"],
    queryFn: () => {
      const res = authFn({ email, password }, "login");
      return res;
    },
    enabled: false,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await loginQuery.refetch();
    setDisplayRegisterForm(false);
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
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <div className={styles.robotCheck}>
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
export default Login;
