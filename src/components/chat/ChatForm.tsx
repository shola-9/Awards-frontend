import { useMutation, useQueryClient } from "@tanstack/react-query";
import postChatFn from "../../lib/chat/post";
import { useState } from "react";

function ChatForm({ receiver_id }: { receiver_id: string }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  queryClient.invalidateQueries();
  // queryClient.invalidateQueries({ queryKey: ["getChat"] });
  const msgMutation = useMutation({
    mutationFn: (newContent: string) =>
      postChatFn({ receiver_id, content: newContent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getChat"] });
    },
  });

  return (
    <div>
      <label></label>
      <input
        type="text"
        placeholder="message..."
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={() => msgMutation.mutate(content)}>Send message</button>
    </div>
  );
}

export default ChatForm;
