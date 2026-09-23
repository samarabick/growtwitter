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

import { DeleteTweetModal } from "./DeleteTweetModal";
import { ChatCircleIcon, HeartIcon, TrashIcon } from "@phosphor-icons/react";
import { ReplyTweetModal } from "./ReplyTweetModal";

interface Props {
  tweet: Tweet;
  userToken: string;
  userId: string;
}

export function TweetsFeed({ tweet, userToken, userId }: Props) {
  const dispatch = useAppDispatch();

  const userIdLogged = useAppSelector((state) => state.user.user.id);

  const likestotal: number = tweet.likes.length;

  const arrayLikes: Like[] = tweet.likes;

  const userLiked = arrayLikes.some((item: Like) => {
    return item.author.id === userIdLogged;
  });

  async function handleLike() {
    if (userLiked) {
      await dispatch(
        unlikeTweetThunk({
          tweetId: tweet.id,
          userToken: userToken,
          userId: userIdLogged,
        }),
      );
    } else {
      await dispatch(
        likeTweetThunk({
          tweetId: tweet.id,
          userToken: userToken,
          userId: userIdLogged,
        }),
      );
    }
  }

  const [isAnimating, setIsAnimating] = useState(false);

  setTimeout(() => {
    setIsAnimating(false);
  }, 600);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  async function handleDelete() {
    await dispatch(
      deleteTweetThunk({
        tweetId: tweet.id,
        userToken: userToken,
        userId: userId,
      }),
    );
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function confirmDeleteModal() {
    setIsDeleteModalOpen(false);
    handleDelete();
  }

  function closeReplyModal() {
    setIsReplyModalOpen(false);
  }

  const [showHandleReply, setHandleShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <>
      {/* Input de responder */}
      {showHandleReply ? (
        <div>
          <p>Responder à @{tweet.author.username}</p>
          <ReplyTweet tweetId={tweet.id} userToken={userToken} />
          <button onClick={() => setHandleShowReply(false)}>X</button>
        </div>
      ) : (
        <div hidden></div>
      )}
      {/* Tweet */}
      <div key={tweet.id} className="m-1">
        {/* "Cabeçalho" do Tweet */}
        <div className="flex">
          <div className="p-1">
            {tweet.author.imageUrl != null ? (
              <img
                className="max-w-10 rounded-full inline"
                src={tweet.author.imageUrl}
                alt=""
              />
            ) : (
              <img
                className="max-w-10 rounded-full inline"
                src="https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png"
                alt=""
              />
            )}
          </div>
          <div className="self-center">
            <Link
              className="text-base font-semibold"
              to={`/profile/${tweet.author.id}`}
            >
              {tweet.author.name}
            </Link>
            <Link className="text-base p-1" to={`/profile/${tweet.author.id}`}>
              {`@${tweet.author.username}`}
            </Link>
          </div>
        </div>
        {/* Conteúdo do tweet */}
        <div className="p-1">
          <p>{tweet.content}</p>
        </div>
        {/* Ações inferiores do tweet */}
        <div className="pl-1">
          {/* Responder */}
          <button title="Responder" onClick={() => setIsReplyModalOpen(true)}>
            <ChatCircleIcon className="size-5 inline pr-1" />
          </button>
          {/* curtir */}
          <button title="Curtir" onClick={() => handleLike()}>
            <HeartIcon
              onClick={() => setIsAnimating(true)}
              weight={userLiked ? "fill" : "regular"}
              className={`size-4.5 inline ${isAnimating ? "heart-like text-pink-500 fill-pink-500" : ""} ${userLiked && "fill-pink-500"}`}
            />
            <span className="text-sm align-middle pr-1">{likestotal}</span>
          </button>
          {/* Excluir */}
          <button title="Excluir">
            {tweet.author.id === userId ? (
              <TrashIcon
                className="size-4.5 inline"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Excluir
              </TrashIcon>
            ) : (
              <button hidden></button>
            )}
          </button>
          {/* Modal de confirmação de exclusão  */}
          <div>
            <DeleteTweetModal
              isDeleteModalOpen={isDeleteModalOpen}
              closeDeleteModal={closeDeleteModal}
              confirmDeleteModal={confirmDeleteModal}
            />
          </div>
        </div>
        <div className="pl-1">
          {/* Ver respostas */}
          <button
            title="Ver respostas"
            className="text-sm"
            onClick={() => setShowReplies((prev) => !prev)}
          >
            Ver respostas
          </button>
          <div>
            <ReplyTweetModal
              tweet={tweet}
              userToken={userToken}
              userId={userId}
              isReplyModalOpen={isReplyModalOpen}
              closeReplyModal={closeReplyModal}
            />
          </div>
        </div>
      </div>
      {/* Respostas do tweet */}
      <div className="pl-5">
        {showReplies &&
          tweet.replies.length > 0 &&
          tweet.replies.map((reply) => (
            <TweetsFeed tweet={reply} userToken={userToken} userId={userId} />
          ))}
      </div>
    </>
  );
}
