import { useState } from "react";
// import { type CreateTweetProps } from "../../store/tweet/tweetService";
import { useAppDispatch, useAppSelector } from "../../store";
import { createTweetThunk } from "../../store/tweet/tweetThunks";

interface Props {
  onSubmit: () => void;
}

export function NewTweet({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const user = useAppSelector((state) => state.user.user);
  const userToken = user.token;
  const userId = user.id;
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <img src={user.image} alt="" className="max-w-10 rounded-full inline" />

        <textarea
          className="px-3 py-2 resize-none w-120 2xl:w-160"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="O que está acontecendo?"
        />
      </div>
      <div className="flex justify-end w-120 2xl:w-160">
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
