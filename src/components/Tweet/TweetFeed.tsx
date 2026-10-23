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

import { DeleteTweetModal } from "./Modais/DeleteTweetModal";
import { ChatCircleIcon, HeartIcon, TrashIcon } from "@phosphor-icons/react";
import { ReplyTweetModal } from "./Modais/ReplyTweetModal";

interface Props {
  tweet: Tweet;
  userToken: string;
  userProfileId: string;
  isNotReply: boolean;
  type: string;
}

export function TweetsFeed({
  tweet,
  userToken,
  userProfileId,
  isNotReply,
  type,
}: Props) {
  // Variáveis
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.user.user);
  const userIdLogged = userLogged.id;
  const likesTotal: number = tweet.likes.length;
  const arrayLikes: Like[] = tweet.likes;
  const isDeleting = useAppSelector((state) => state.feed.isDeletingTweet);

  // Verifica se o usuário logado está na lista de likes do tweet
  const userLiked = arrayLikes.some((item: Like) => {
    return item.author.id === userIdLogged;
  });

  // Se o usuário logado já curtiu, descurte
  // Se não curtiu, curte
  // type: serve para indicar qual feed re-renderizar na chamada da API,
  // para atualizar quando houver um novo tweet, like, deslike
  async function handleLike() {
    if (userLiked) {
      await dispatch(
        unlikeTweetThunk({
          tweetId: tweet.id,
          userToken: userToken,
          userId: userProfileId,
          type: type,
        }),
      );
    } else {
      await dispatch(
        likeTweetThunk({
          tweetId: tweet.id,
          userToken: userToken,
          userId: userProfileId,
          type: type,
        }),
      );
    }
  }

  // Animação de curtir
  const [isAnimating, setIsAnimating] = useState(false);

  setTimeout(() => {
    setIsAnimating(false);
  }, 600);

  // Função + modal de excluir
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  async function handleDelete() {
    await dispatch(
      deleteTweetThunk({
        tweetId: tweet.id,
        userToken: userToken,
        userId: userProfileId,
        type: type,
      }),
    ).unwrap();
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function confirmDeleteModal() {
    await handleDelete();
    setIsDeleteModalOpen(false);
  }

  // Modal de Responder
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  function closeReplyModal() {
    setIsReplyModalOpen(false);
  }

  // useState para abrir e fechar respostas
  const [showReplies, setShowReplies] = useState(false);

  return (
    <>
      {/* Tweet */}
      <div key={tweet.id} className="m-1">
        {/* "Cabeçalho" do Tweet */}
        <div className="flex">
          <div className="p-1">
            {tweet.author.imageUrl != null ? (
              <Link to={`/profile/${tweet.author.id}`}>
                <img
                  className="img-profile tweet-profile-pic inline"
                  src={tweet.author.imageUrl}
                  alt=""
                />
              </Link>
            ) : (
              <Link to={`/profile/${tweet.author.id}`}>
                <img
                  className="img-profile tweet-profile-pic inline"
                  src="https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png"
                  alt=""
                />
              </Link>
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
              className={`size-4.5 inline ${isAnimating ? "heart-like text-azalea fill-azalea" : ""} ${userLiked && "fill-azalea"}`}
            />
            <span className="text-sm align-middle pr-1">{likesTotal}</span>
          </button>

          {/* Excluir */}

          {tweet.author.id === userLogged.id && (
            <button title="Excluir">
              <TrashIcon
                className="size-4.5 inline"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Excluir
              </TrashIcon>
            </button>
          )}

          {/* Modal de confirmação de exclusão  */}
          <div>
            <DeleteTweetModal
              isDeleteModalOpen={isDeleteModalOpen}
              closeDeleteModal={closeDeleteModal}
              confirmDeleteModal={confirmDeleteModal}
              isDeleting={isDeleting}
            />
          </div>
        </div>
        <div className="pl-1">
          {/* Ver respostas */}
          {isNotReply && (
            <button
              title="Ver respostas"
              className="text-sm"
              onClick={() => setShowReplies((prev) => !prev)}
            >
              Ver respostas
            </button>
          )}

          <div>
            <ReplyTweetModal
              tweet={tweet}
              userToken={userToken}
              userId={userProfileId}
              userImage={userLogged.image}
              isReplyModalOpen={isReplyModalOpen}
              closeReplyModal={closeReplyModal}
              type={type}
            />
          </div>
        </div>
      </div>
      {/* Respostas do tweet */}
      <div className="border-t border-tututu pl-5">
        {isNotReply ? (
          showReplies === true &&
          (tweet.replies.length > 0 ? (
            tweet.replies.map((reply) => (
              <TweetsFeed
                tweet={reply}
                userToken={userToken}
                userProfileId={userProfileId}
                isNotReply={false}
                type={type}
              />
            ))
          ) : (
            <p>Nenhuma Resposta</p>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
