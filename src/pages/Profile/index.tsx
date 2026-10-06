import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { Feed } from "../../components/Feed";
import { useEffect } from "react";
import { fetchProfileFeedThunk } from "../../store/tweet/tweetThunks";
import { loadProfileThunk } from "../../store/profile/profileThunks";
import { type Profile, type UserProfile } from "../../types";
import { ArrowLeftIcon, DotOutlineIcon } from "@phosphor-icons/react";
import { FollowUnfollow } from "./FollowUnfollow";
import { loadProfileUserLoggedThunk } from "../../store/user/userThunks";

export function Profile() {
  const params = useParams();
  const profileId = params.id!;
  const userLogged = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const profile: UserProfile = useAppSelector((state) => state.profile);
  const userLoggedProfile = useAppSelector((state) => state.user.profileUser);

  // Carregar perfil
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      loadProfileThunk({ userToken: userLogged.token, userId: profileId }),
    );
  }, [profileId, profile.followers]);

  fetchProfileFeedThunk({ userToken: userLogged.token, userId: profileId });

  // Carregar perfil do usuário logado
  useEffect(() => {
    dispatch(
      loadProfileUserLoggedThunk({
        userId: userLogged.id,
        userToken: userLogged.token,
      }),
    );
  }, [userLogged.token, userLoggedProfile.following]);

  // Variáveis utilizadas no componente

  const totalFollowers = profile.followers.length;
  const numFollowing: number = profile.following.length;
  const totalPosts = useAppSelector((state) => state.feed.profile.length);

  return (
    <>
      <div className="flex py-3 px-3 text-md bg-tututu2/80 rounded-t-4xl backdrop-blur-md">
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
      <div>
        <div className="px-5">
          {/* Foto perfil + botão de seguir */}
          <div className="flex justify-between">
            {profile.imageUrl != null ? (
              <img
                src={profile.imageUrl}
                alt=""
                className="profile-pic img-profile"
              />
            ) : (
              <img
                src="https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png"
                alt=""
                className="profile-pic img-profile"
              />
            )}

            <div className="self-center">
              {userLogged.id !== profile.id && (
                <FollowUnfollow
                  profile={profile}
                  userLogged={userLogged}
                  userLoggedProfile={userLoggedProfile}
                />
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
            <Link to={`/profile/${profileId}/followers`} className="text-sm">
              {totalFollowers}
              <span className="text-gray-400 text-sm"> Seguidores</span>
            </Link>
            <Link
              to={`/profile/${profileId}/following`}
              className="text-sm mx-2"
            >
              {numFollowing}
              <span className="text-gray-400 text-sm"> Seguindo</span>
            </Link>
          </div>
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
