import { useParams } from "react-router-dom";
import ChatForm from "../components/chat/ChatForm";
import GetChatBody from "./GetChat";
import SubHeading from "../components/app/SubHeading";

function DynamicChatPage() {
  const { receiver_id } = useParams();
  if (!receiver_id) throw new Error("receiver_id is required");

  return (
    <>
      <SubHeading value="Chat" />
      <GetChatBody receiver_id={receiver_id} />
      <ChatForm receiver_id={receiver_id} />
    </>
  );
}
export default DynamicChatPage;
