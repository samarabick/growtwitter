import { useState } from "react";
import { type CreateTweetProps } from "../../store/tweet/tweetService";
import { useAppSelector } from "../../store";
interface Props {
  onSubmit: ({ contentTweet, userToken }: CreateTweetProps) => Promise<void>;
}

export function NewTweet({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const userToken = useAppSelector((state) => state.user.user.token);

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
          await onSubmit({ contentTweet: text, userToken: userToken });
          setText("");
        }}
      >
        Tweetar
      </button>
    </>
  );
}
