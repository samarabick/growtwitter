import { useState } from "react";
import { replyTweetThunk } from "../../store/tweet/tweetThunks";
import { useAppDispatch } from "../../store";
interface Props {
  tweetId: string;
  userToken: string;
  userImage: string | undefined;
  userId: string;
  type: string;
  onSubmit: () => void;
}

export function ReplyTweet({
  tweetId,
  userToken,
  userId,
  type,
  userImage,
  onSubmit,
}: Props) {
  // Variáveis
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex">
        <div className="mx-2">
          <img
            src={userImage}
            alt=""
            className="img-profile tweet-profile-pic inline"
          />
        </div>
        <textarea
          className="px-3 py-2 resize-none w-110 2xl:w-150"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="O que está acontecendo?"
        />
      </div>

      <div className="flex justify-self-end justify-end w-110 2xl:w-150 mt-1">
        <button
          className="btn btn-primary text-white mt-1"
          onClick={async () => {
            await dispatch(
              replyTweetThunk({
                content: text,
                tweetId: tweetId,
                userToken: userToken,
                userId: userId,
                type: type,
              }),
            );
            setText("");
            onSubmit();
          }}
        >
          Tweetar
        </button>
      </div>
    </>
  );
}
