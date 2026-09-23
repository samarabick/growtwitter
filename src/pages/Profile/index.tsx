import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { Feed } from "../../components/Feed";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchProfileFeedThunk } from "../../store/tweet/tweetThunks";
import {
  followProfileThunk,
  loadProfileThunk,
  unfollowProfileThunk,
} from "../../store/profile/profileThunks";
import { type Profile } from "../../types";
import { ArrowLeftIcon, DotOutlineIcon } from "@phosphor-icons/react";
import { UnfollowModal } from "./UnfollowModal";

const ProfilePicture = styled.img`
  width: 50px;
  border-radius: 50%;
`;

export function Profile() {
  const params = useParams();
  const profileId = params.id!;
  const userLogged = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.profile);

  // Carregar perfil
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      loadProfileThunk({ userToken: userLogged.token, userId: profileId }),
    );
  }, [profileId, profile.followers]);

  fetchProfileFeedThunk({ userToken: userLogged.token, userId: profileId });

  // Variáveis utilizadas no componente

  const totalFollowers = profile.followers.length;
  const numFollowing: number = profile.following.length;
  const totalPosts = useAppSelector((state) => state.feed.profile.length);

  const followersArray: Profile[] = profile.followers;

  // Estado do modal

  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);

  // Função para fechar unfollow modal

  function closeUnfollowModal() {
    setIsUnfollowModalOpen(false);
  }

  async function confirmUnfollowModal() {
    await dispatch(
      unfollowProfileThunk({
        userToken: userLogged.token,
        userId: profileId,
      }),
    );
    setIsUnfollowModalOpen(false);
  }

  // Verifica se o usuário já segue

  const userFollow = followersArray.some((item: Profile) => {
    return item.id === userLogged.id;
  });

  // Função de seguir/deixar de seguir

  async function handleFollowButton() {
    if (userFollow) {
      setIsUnfollowModalOpen(true);
    } else {
      await dispatch(
        followProfileThunk({ userToken: userLogged.token, userId: profileId }),
      );
    }
  }

  return (
    <>
      <div className="flex py-3 text-md sm:sticky sm:top-0 bg-tutu/80 backdrop-blur-md">
        <button onClick={() => navigate("/home")}>
          <ArrowLeftIcon weight="light" className="text-lg" />
        </button>
        <p>{profile.name}</p>
        <DotOutlineIcon weight="fill" className="self-center text-gray-500" />
        <div className="flex text-gray-500">
          <span>{totalPosts}</span>
          <p className="  ml-1">Posts</p>
        </div>
      </div>
      <div className="border-b border-gray-300">
        <div>
          {/* Foto perfil + botão de seguir */}
          <div className="flex justify-between">
            {profile.imageUrl != null ? (
              <ProfilePicture src={profile.imageUrl} alt="" />
            ) : (
              <ProfilePicture
                src="https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png"
                alt=""
              />
            )}

            <div className="self-center">
              {userLogged.id != profile.id && (
                <div>
                  {userFollow ? (
                    <button
                      className="btn border-cupid text-cupid"
                      onClick={() => handleFollowButton()}
                    >
                      Seguindo
                    </button>
                  ) : (
                    <button
                      className="btn border-cupid bg-cupid text-white"
                      onClick={() => handleFollowButton()}
                    >
                      Seguir
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="font-bold text-xl">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm">@{profile.username}</p>
          </div>
          <div className="flex mb-1">
            <p className="text-sm">
              {totalFollowers}
              <span className="text-gray-400 text-sm"> Seguidores</span>
            </p>
            <p className="text-sm mx-2">
              {numFollowing}
              <span className="text-gray-400 text-sm"> Seguindo</span>
            </p>
          </div>
        </div>
        <div>
          <UnfollowModal
            isUnfollowModalOpen={isUnfollowModalOpen}
            closeUnfollowModal={closeUnfollowModal}
            confirmUnfollowModal={confirmUnfollowModal}
            profileUsername={profile.username}
          />
        </div>
      </div>
      <div>
        <Feed
          fetchFeed={() =>
            dispatch(
              fetchProfileFeedThunk({
                userToken: userLogged.token,
                userId: profileId,
              }),
            )
          }
          type="profile"
        />
      </div>
    </>
  );
}
