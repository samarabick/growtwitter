import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { Feed } from "../../components/Feed";
import { useEffect } from "react";
import styled from "styled-components";
import { fetchProfileFeedThunk } from "../../store/tweet/tweetThunks";
import {
  followProfileThunk,
  loadProfileThunk,
  unfollowProfileThunk,
} from "../../store/profile/profileThunks";
import { type Profile } from "../../types";

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

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      loadProfileThunk({ userToken: userLogged.token, userId: profileId }),
    );
  }, [profileId, profile.followers]);

  fetchProfileFeedThunk({ userToken: userLogged.token, userId: profileId });

  const totalFollowers = profile.followers.length;
  const numFollowing: number = profile.following.length;

  const followersArray: Profile[] = profile.followers;

  const userFollow = followersArray.some((item: Profile) => {
    return item.id === userLogged.id;
  });

  async function handleFollowButton() {
    if (userFollow) {
      await dispatch(
        unfollowProfileThunk({
          userToken: userLogged.token,
          userId: profileId,
        }),
      );
      console.log("deixou de seguir");
    } else {
      await dispatch(
        followProfileThunk({ userToken: userLogged.token, userId: profileId }),
      );
      console.log("seguiu");
    }
  }

  return (
    <>
      <div>
        <button onClick={() => navigate("/home")}>🠐</button>
        <p>{profile.name}</p>
        <div>
          {profile.imageUrl != null ? (
            <ProfilePicture src={profile.imageUrl} alt="" />
          ) : (
            <ProfilePicture
              src="https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png"
              alt=""
            />
          )}
          <p>{profile.name}</p>
          <p>@{profile.username}</p>
          <div>
            {userLogged.id != profile.id ? (
              <div>
                {userFollow ? (
                  <button onClick={() => handleFollowButton()}>Seguindo</button>
                ) : (
                  <button onClick={() => handleFollowButton()}>Seguir</button>
                )}
              </div>
            ) : (
              <p hidden></p>
            )}
          </div>
          <p>
            {totalFollowers}
            <span> followers</span>
          </p>
          <p>
            {numFollowing}
            <span> following</span>
          </p>
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
