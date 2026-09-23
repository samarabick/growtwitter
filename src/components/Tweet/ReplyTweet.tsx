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
      <textarea
        className="px-3 py-2 resize-none w-120 2xl:w-160"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="O que está acontecendo?"
      />
      <div className="flex justify-end w-120 2xl:w-160">
        <button
          className="btn border-cupid bg-cupid text-white mt-1"
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
      </div>
    </>
  );
}
