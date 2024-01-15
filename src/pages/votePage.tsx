import SubHeading from "../components/app/SubHeading";
import { GetAll } from "../components/vote/award/getAll";

const VotePage = () => {
  return (
    <div>
      <SubHeading value="Vote" />
      <GetAll />
    </div>
  );
};
export default VotePage;
