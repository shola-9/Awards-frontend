import { Link, useLocation } from "react-router-dom";
import styles from "./loginSignUp.module.css";

export const LoginSignUp = () => {
  const location = useLocation();
  return (
    <div className={styles.loginSignUpBIO}>
      <p>
        Please{" "}
        <Link
          to={"/login"}
          state={{ from: location }}
          replace
        >
          login
        </Link>{" "}
        or{" "}
        <Link
          to={"/signup"}
          state={{ from: location }}
          replace
        >
          sign up
        </Link>{" "}
        to continue.
      </p>
    </div>
  );
};
