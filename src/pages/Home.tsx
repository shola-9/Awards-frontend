import SecondPromotionsSection from "../components/home/SecondPromotionsSection";
import LargeFrameShortVideosOnHomePage from "../components/home/LargeFrameShortVideosOnHomePage";
import WinnersOnHomePage from "../components/home/WinnersOnHomePage";
import styles from "./styles/home.module.css";
import { useNavigate } from "react-router-dom";
import StoriesShowCase from "../components/story/StoriesShowCase";
import GroupRecommendation from "../components/group/GroupRecommendation";
import { Link } from "react-router-dom";
import Ancestries from "../components/ancestries/ancestries";
import DisplayStatsParent from "../components/vote/stats/displayStatsParent";

const HomePage = (): JSX.Element => {
  const navigate = useNavigate();

  function handleNavigationToForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate("/nominate-form");
  }

  return (
    <article className={styles.parentContainer}>
      <div className={styles.overlay}></div>
      <img
        src="/Rectangle 3.png"
        alt="placeholder img"
        className={`${styles.heroImg}`}
      />
      <section>
        <h2>KNOW YOUR HEROES</h2>
        <p>
          These are some randoms words that will be replaced as soon a possible.
          The purpose of these words is to serve as a correct placholder. I need
          more lines of text to correctly fill the expected space. I'm still
          writing because I need much more text on my screen.
        </p>
        <a href="#unknown-do-NOT-click">
          {/* href for this button is currently unknown */}
          GET THE LATEST PRIDE OF NIGERIA NEWS
        </a>
      </section>
      <div className={styles.storyDiv}>
        <h5>Stories</h5>
        <StoriesShowCase />
      </div>
      <section className={styles.aboutPrideOfNigeriaSection}>
        <h3>There's more about the pride of Nigeria than you think.</h3>
        <div className={styles.aboutPrideOfNigeriaCardContainer}>
          <div className={styles.aboutCard}>
            <img
              src="/ts.png"
              alt="placeholder"
            />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
              minima porro, ut hic doloremque, voluptate dolore ad, deserunt
              obcaecati quasi esse ab? Officiis aut eaque et delectus expedita
              architecto cupiditate. <Link to="/about-us">Read More</Link>
            </p>
          </div>
          <div className={styles.aboutCard}>
            <img
              src="/ts.png"
              alt="placeholder"
            />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
              minima porro, ut hic doloremque, voluptate dolore ad, deserunt
              obcaecati quasi esse ab? Officiis aut eaque et delectus expedita
              architecto cupiditate. <Link to="/about-us">Read More</Link>
            </p>
          </div>
          <div className={styles.aboutCard}>
            <img
              src="/ts.png"
              alt="placeholder"
            />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
              minima porro, ut hic doloremque, voluptate dolore ad, deserunt
              obcaecati quasi esse ab? Officiis aut eaque et delectus expedita
              architecto cupiditate. <Link to="/about-us">Read More</Link>
            </p>
          </div>
          <div className={styles.aboutCard}>
            <img
              src="/ts.png"
              alt="placeholder"
            />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
              minima porro, ut hic doloremque, voluptate dolore ad, deserunt
              obcaecati quasi esse ab? Officiis aut eaque et delectus expedita
              architecto cupiditate. <Link to="/about-us">Read More</Link>
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.winnersHomeDiv}>
          <h3>OUR 2023 WINNERS</h3>
          <WinnersOnHomePage />
        </div>
      </section>
      <section className={styles.exploreNewDevelopmentSection}>
        <Ancestries />
      </section>
      <section className={styles.firstPromotionsSection}>
        <div className={styles.subParent}>
          <div className={styles.firstPromotionsHeader}>
            <h4>Explore more with essential</h4>
            <p>Promotions, deals and special offers for you</p>
          </div>
          <div className={styles.cardFlexParent}>
            <div className={styles.card}>
              <div>
                <h5 className={styles.ancestry}>ANCESTRY- FAMILY TREE</h5>
                <p className={styles.ancestryText}>
                  Make quick family history discoveries with Ancestry Hints Make
                  quick family history discoveries with Ancestry Hints
                </p>
                <button
                  className={styles.ancestryBtn}
                  onClick={handleNavigationToForm}
                >
                  EXPLORE
                </button>
              </div>
              <div>
                <img
                  src="/Rectangle 8.svg"
                  alt="people smiling"
                />
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <h5 className={styles.ancestry}>ANCESTRY- FAMILY TREE</h5>
                <p className={styles.ancestryText}>
                  Make quick family history discoveries with Ancestry Hints Make
                  quick family history discoveries with Ancestry Hints
                </p>
                <button
                  className={styles.ancestryBtn}
                  onClick={handleNavigationToForm}
                >
                  EXPLORE
                </button>
              </div>
              <div>
                <img
                  src="/Rectangle 8.svg"
                  alt="people smiling"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.largeFrameShortVideosOnHomePage}>
        <LargeFrameShortVideosOnHomePage />
      </section>
      <section
        id="ourPartners"
        className={styles.ourPartnersContainer}
      >
        <h3>OUR PARTNERS</h3>
        <div>
          <p>
            This is a placeholder text for the content that is going to be here.
            Typing random words to fill in the space.
          </p>
        </div>
        <div></div>
        <div>
          <img
            src="/logo512.png"
            alt="placholder partner"
          />
          <img
            src="/logo512.png"
            alt="placholder partner"
          />
          <img
            src="/logo512.png"
            alt="placholder partner"
          />
          <img
            src="/logo512.png"
            alt="placholder partner"
          />
          <img
            src="/logo512.png"
            alt="placholder partner"
          />
          <img
            src="/logo512.png"
            alt="placholder partner"
          />
          <img
            src="/logo512.png"
            alt="placholder partner"
          />
          <img
            src="/logo512.png"
            alt="placholder partner"
          />
        </div>
      </section>
      <section className={styles.secondPromotionsSection}>
        <SecondPromotionsSection />
      </section>
      <section className={styles.displayStatsSection}>
        <DisplayStatsParent />
      </section>
      <section className={styles.groupsRecommendation}>
        <h4>Groups you may like</h4>
        <GroupRecommendation />
      </section>
      <section className={styles.supportPrideOfNigeriaContainer}>
        <div className={styles.supportPrideOfNgGradient}></div>
        <img
          src="/Rectangle 9.png"
          alt="placeholder background img"
        />
        <div>
          <h2>SUPPORT THE NEXT PRIDE OF NIGERIA</h2>
          <a href="#unknown-do-NOT-click">
            CLICK HERE TO FIND OUT MORE AND DONATE
          </a>
        </div>
      </section>
      <div className={styles.whiteSpace}></div>
    </article>
  );
};

export default HomePage;
