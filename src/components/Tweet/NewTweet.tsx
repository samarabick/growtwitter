import { useState } from "react";
// import { type CreateTweetProps } from "../../store/tweet/tweetService";
import { useAppDispatch, useAppSelector } from "../../store";
import { createTweetThunk } from "../../store/tweet/tweetThunks";

interface Props {
  onSubmit: () => void;
}

export function NewTweet({ onSubmit }: Props) {
  // Variáveis
  const [text, setText] = useState("");
  const userLogged = useAppSelector((state) => state.user.user);
  const userToken = userLogged.token;
  const userId = userLogged.id;
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex">
        <div className="mx-2">
          <img
            src={userLogged.image}
            alt=""
            className="max-w-10 rounded-full inline"
          />
        </div>

        <textarea
          className="px-3 py-2 resize-none w-110 2xl:w-150"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="O que está acontecendo?"
        />
      </div>
      <div className="flex justify-self-end justify-end w-110 2xl:w-150">
        <button
          className="btn btn-primary text-white mt-1"
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
