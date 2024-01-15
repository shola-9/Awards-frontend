import getReelsLimitedInfoForHomeFn from "../../lib/shortVideos/getLimitedInfoForHome";
import styles from "./largeFrameShortVideosOnHomePage.module.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import updateVideoViewsFn from "../../lib/shortVideos/updateViews";

function LargeFrameShortVideosOnHomePage() {
  const reelLimitedInfoQuery = useQuery({
    queryKey: ["reelLimitedInfoForHome"],
    queryFn: getReelsLimitedInfoForHomeFn,
  });

  async function handleVideoViews({ video_id }: { video_id: number }) {
    try {
      await updateVideoViewsFn({ video_id });
    } catch (error) {
      console.log(error);
      return;
    }
  }

  if (reelLimitedInfoQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (reelLimitedInfoQuery.isError) {
    return <p>No data yet. Check back later</p>;
  }

  const { data } = reelLimitedInfoQuery;

  return (
    <div className={styles.largeFrameShortVideosOnHome}>
      <div className={styles.largeFrameShortVideosOnHomeContainer}>
        <h4>Short Videos </h4>
        <Link
          to="/short-videos"
          className={styles.seeAll}
        >
          See All
        </Link>
      </div>
      <article>
        <div className={styles.parentReelsContainer}>
          {data?.reels.map((reel) => (
            <Link
              to={`/short-videos/${reel.short_videos_id}`}
              key={reel.short_videos_id}
              className={styles.link}
              onClick={(e) =>
                handleVideoViews({ video_id: reel.short_videos_id })
              }
            >
              <div className={styles.shortVideoAndDetailsCard}>
                <video
                  className={styles.shortVideosVideo}
                  controls
                >
                  <source
                    src={reel.video}
                    type="video/mp4"
                  />
                  <source
                    src={reel.video}
                    type="video/webm"
                  />
                  <source
                    src={reel.video}
                    type="video/mov"
                  />
                  <source
                    src={reel.video}
                    type="video/avi"
                  />
                </video>
                <div className={styles.likesAndViewsDetails}>
                  <p>
                    <img
                      src="/icon-park-outline_like.svg"
                      alt="Like icon"
                    />
                    {reel.likes ?? 0}
                  </p>
                  <p>{reel.views ?? 0} views</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
export default LargeFrameShortVideosOnHomePage;
