import { useState } from "react";
// import { type CreateTweetProps } from "../../store/tweet/tweetService";
import { useAppDispatch, useAppSelector } from "../../store";
import { createTweetThunk } from "../../store/tweet/tweetThunks";
import { Zoomies } from "ldrs/react";
import "ldrs/react/Zoomies.css";

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

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <div className="px-3 h-3 justify-center grid">
          <Zoomies
            size="450"
            stroke="4"
            bgOpacity="0"
            speed="1.7"
            color="#0f102e"
          />
        </div>
      ) : (
        <div className="px-3 h-3 justify-center grid"></div>
      )}

      <div className="flex">
        <div className="mx-2">
          <img
            src={userLogged.image}
            alt=""
            className="tweet-profile-pic img-profile inline"
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
            setIsLoading(true);
            await dispatch(
              createTweetThunk({
                contentTweet: text,
                userToken: userToken,
                userId: userId,
              }),
            );

            setText("");
            onSubmit();
            setIsLoading(false);
          }}
        >
          Tweetar
        </button>
      </div>
    </>
  );
}
