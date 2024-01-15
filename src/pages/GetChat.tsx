import { useQuery } from "@tanstack/react-query";
import getChatFn from "../lib/chat/get";
import styles from "./styles/chat/getChat.module.css";
import { formatTimestampDiff } from "../components/global/formatTimeAgo";

function GetChatBody({ receiver_id }: { receiver_id: string }) {
  const chatQuery = useQuery({
    queryKey: ["getChat"],
    queryFn: () => getChatFn({ sender_id: receiver_id }),
  });

  if (chatQuery.isLoading) return <p>Loading</p>;
  if (chatQuery.isError) return <p>No data yet. Check back later</p>;

  return (
    <div className={styles.chatBody}>
      {chatQuery.data?.result.map((message) => (
        <div
          className={
            message.receiver_id.toString() === receiver_id
              ? `${styles.receiver}`
              : `${styles.sender}`
          }
        >
          <p key={message.chat_id}>{message.content}</p>
          <p>{formatTimestampDiff(message.created_at)}</p>
        </div>
      ))}
    </div>
  );
}

export default GetChatBody;
