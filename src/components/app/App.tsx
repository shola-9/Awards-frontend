import styles from "./app.module.css";

function Header(): JSX.Element {
  return (
    <div className={styles.headerDiv}>
      <section className={styles.section}>
        <img
          src="/WhatsApp Image 2023-12-15 at 16.06.11.jpeg"
          alt="essential logo"
          className={styles.logo}
        />{" "}
      </section>
      <section className={`${styles.section} ${styles.h1Section}`}>
        <div>
          <h1 className={styles.h1}>PRIDE OF NIGERIA</h1>
          <h2>
            <img
              src="/diamond.png"
              alt="award diamond"
            />{" "}
            AWARD{" "}
            <img
              src="/diamond.png"
              alt="award diamond"
            />
          </h2>
        </div>
      </section>
    </div>
  );
}
export default Header;
