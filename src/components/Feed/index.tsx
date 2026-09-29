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
  // Variáveis
  const userLogged = useAppSelector((state) => state.user.user);
  const userToken = userLogged.token;
  const userId = userLogged.id;
  const navigate = useNavigate();

  // Indica se deve chamar home ou profile da store
  const tweetsList = useAppSelector((state) => {
    if (type === "home") {
      return state.feed.home;
    } else {
      return state.feed.profile;
    }
  });

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
              <div className="shadow-b-md border-t border-tututu ">
                <TweetsFeed
                  tweet={tweet}
                  userToken={userToken}
                  userId={userId}
                  isNotReply={true}
                />
              </div>
            </>
          ))
        ) : (
          <p>Nenhum tweet</p>
        )}
      </div>
    </>
  );
}
