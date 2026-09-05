import { useAppSelector } from "../../store";
import { useEffect } from "react";
import { type Tweet } from "../../types/index";
import { TweetsFeed } from "../Tweet/TweetFeed";
import { useNavigate } from "react-router-dom";

interface Props {
  fetchFeed: () => Promise<unknown>;
  type: "home" | "profile";
}

export function Feed({ fetchFeed, type }: Props) {
  const userToken = useAppSelector((state) => state.user.user.token);

  const userId = useAppSelector((state) => state.user.user.id);

  const tweetsList = useAppSelector((state) => {
    if (type === "home") {
      return state.feed.home;
    } else {
      return state.feed.profile;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchFeed();
  }, [userToken, tweetsList]);

  // Redireciona para tela de login quando o userToken for vazio
  useEffect(() => {
    if (userToken === "") {
      navigate("/");
    }
  }, [userToken, navigate]);

  return (
    <>
      <div>
        {tweetsList ? (
          tweetsList.map((tweet: Tweet) => (
            <>
              <TweetsFeed tweet={tweet} userToken={userToken} userId={userId} />
            </>
          ))
        ) : (
          <p>Nenhum tweet</p>
        )}
      </div>
    </>
  );
}
