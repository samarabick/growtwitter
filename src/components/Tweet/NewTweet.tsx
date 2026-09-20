import { useState } from "react";
// import { type CreateTweetProps } from "../../store/tweet/tweetService";
import { useAppDispatch, useAppSelector } from "../../store";
import { createTweetThunk } from "../../store/tweet/tweetThunks";
// interface Props {
//   onSubmit: ({ contentTweet, userToken }: CreateTweetProps) => Promise<void>;
// }

interface Props {
  onSubmit: () => void;
}

export function NewTweet({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const userToken = useAppSelector((state) => state.user.user.token);
  const userId = useAppSelector((state) => state.user.user.id);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <textarea
          className="px-3 py-2 resize-none w-100"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="O que está acontecendo?"
        />
      </div>
      <div className="w-100 flex justify-end">
        <button
          className="btn border-cupid bg-cupid text-white mt-1"
          onClick={async () => {
            await dispatch(
              createTweetThunk({
                contentTweet: text,
                userToken: userToken,
                userId: userId,
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
