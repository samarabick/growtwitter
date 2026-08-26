import { type Tweet } from "../../types/index";
import { type Like } from "../../types/index";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useState } from "react";
import {
  deleteTweetThunk,
  likeTweetThunk,
  unlikeTweetThunk,
} from "../../store/tweet/tweetThunks";
import { ReplyTweet } from "./ReplyTweet";
// import { NewTweet } from "./NewTweet";

interface Props {
  tweet: Tweet;
  userToken: string;
  userId: string;
}

export function TweetsFeed({ tweet, userToken, userId }: Props) {
  const dispatch = useAppDispatch();

  const userIdLogged = useAppSelector((state) => state.user.user.id);

  const likestotal: number = tweet.likes.length;

  const [totalLikes, setTotalLikes] = useState(likestotal);

  async function handleLike() {
    const arrayLikes: Like[] = tweet.likes;

    const userLiked = arrayLikes.some((item: Like) => {
      return item.author.id === userIdLogged;
    });

    if (userLiked) {
      await dispatch(
        unlikeTweetThunk({
          tweetId: tweet.id,
          userToken: userToken,
          userId: userIdLogged,
        }),
      );
      setTotalLikes((prev) => prev - 1);
    } else {
      await dispatch(
        likeTweetThunk({
          tweetId: tweet.id,
          userToken: userToken,
          userId: userIdLogged,
        }),
      );
      setTotalLikes((prev) => prev + 1);
    }
  }

  async function handleDelete() {
    await dispatch(
      deleteTweetThunk({
        tweetId: tweet.id,
        userToken: userToken,
        userId: userId,
      }),
    );
  }

  const [showHandleReply, setHandleShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <>
      {showHandleReply ? (
        <div>
          <p>Responder à @{tweet.author.username}</p>
          <ReplyTweet tweetId={tweet.id} userToken={userToken} />
          <button onClick={() => setHandleShowReply(false)}>X</button>
        </div>
      ) : (
        <div hidden></div>
      )}
      <div key={tweet.id}>
        <Link to={`/profile/${tweet.author.id}`}>{tweet.author.name}</Link>
        <p>{tweet.content}</p>
        <div>
          <button onClick={() => handleLike()}>Likes {totalLikes}</button>
        </div>
        <div>
          <button onClick={() => setHandleShowReply(true)}>Responder</button>
        </div>
        <div>
          {tweet.author.id === userId ? (
            <button onClick={() => handleDelete()}>Excluir</button>
          ) : (
            <button hidden></button>
          )}
        </div>
        <div>
          <button onClick={() => setShowReplies((prev) => !prev)}>
            Respostas
          </button>
          <div>
            {showReplies &&
              tweet.replies.length > 0 &&
              tweet.replies.map((reply) => (
                <TweetsFeed
                  tweet={reply}
                  userToken={userToken}
                  userId={userId}
                />
              ))}
          </div>
        </div>
      </div>

      <hr />
    </>
  );
}
