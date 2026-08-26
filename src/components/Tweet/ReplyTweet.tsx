import { useState } from "react";
import { replyTweetThunk } from "../../store/tweet/tweetThunks";
import { useAppDispatch } from "../../store";
interface Props {
  tweetId: string;
  userToken: string;
}

export function ReplyTweet({ tweetId, userToken }: Props) {
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="O que está acontecendo?"
      />
      <button
        onClick={async () => {
          await dispatch(
            replyTweetThunk({
              content: text,
              tweetId: tweetId,
              userToken: userToken,
            }),
          );
          console.log("tweet respondido");
          setText("");
        }}
      >
        Tweetar
      </button>
    </>
  );
}
