import { useQuery } from "@tanstack/react-query";
import SubHeading from "../components/app/SubHeading";
import getReelsLimitedInfoFn from "../lib/shortVideos/getReelsLimitedInfo";
import styles from "./styles/shortVideos.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import updateVideoViewsFn from "../lib/shortVideos/updateViews";

function ShortVideos() {
  const [showVideoIcon, setShowVideoIcon] = useState(true);
  const reelLimitedInfoQuery = useQuery({
    queryKey: ["reelLimitedInfo"],
    queryFn: getReelsLimitedInfoFn,
  });

  // const updateShortVideosViewsQuery = useQuery({
  //   queryKey: ["updateShortVideosViews", video_id],
  //   queryFn: () => {
  //     if (!video_id) {
  //       throw new Error("video_id is required");
  //     }
  //     return updateVideoViewsFn({ video_id });
  //   },
  // })

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
    return (
      <div>
        <h5>
          Failed to load data.{" "}
          <button onClick={() => reelLimitedInfoQuery.refetch()}>
            Try again
          </button>{" "}
          later.
        </h5>
      </div>
    );
  }

  const { data } = reelLimitedInfoQuery;

  return (
    <article>
      <SubHeading value="SHORT VIDEOS" />
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
              <video className={styles.shortVideosVideo} controls>
                <source src={reel.video} type="video/mp4" />
                <source src={reel.video} type="video/webm" />
                <source src={reel.video} type="video/mov" />
                <source src={reel.video} type="video/avi" />
              </video>
              <div className={styles.likesAndViewsDetails}>
                <p>
                  <img src="/icon-park-outline_like.svg" alt="Like icon" />
                  {reel.likes ?? 0}
                </p>
                <p>{reel.views ?? 0} views</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
export default ShortVideos;
