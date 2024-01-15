import { useQuery } from "@tanstack/react-query";
import getAllAncestriesPostFn from "../lib/ancestries/getAll";
import SubHeading from "../components/app/SubHeading";
import Card from "../components/ancestries/card";
import styles from "../pages/styles/ancestries/main.module.css";
function AncestriesPage(): JSX.Element {
  const getAllAncestryQuery = useQuery({
    queryKey: ["getAllAncestry"],
    queryFn: getAllAncestriesPostFn,
  });

  if (getAllAncestryQuery.isLoading) return <p>Loading...</p>;
  if (getAllAncestryQuery.isError) return <p>No data yet. Check back later</p>;
  if (!getAllAncestryQuery.data) return <p>No data</p>;

  const content = getAllAncestryQuery.data?.ancestries_posts.map((post) => (
    <Card
      key={post.ancestries_postid}
      post={post}
    />
  ));
  return (
    <div>
      <SubHeading value="Nigeria New developer" />
      <div className={styles.anContainer}>{content}</div>
    </div>
  );
}
export default AncestriesPage;
