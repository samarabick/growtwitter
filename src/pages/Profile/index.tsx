import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { Feed } from "../../components/Feed";
import { useLogout } from "../../components/Logout";
import { useEffect, useState } from "react";
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
  const logout = useLogout();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      loadProfileThunk({ userToken: userLogged.token, userId: profileId }),
    );
  }, [profileId]);

  fetchProfileFeedThunk({ userToken: userLogged.token, userId: profileId });

  const totalFollowers = profile.followers.length;

  const [numFollowers, setNumFollowers] = useState(totalFollowers);
  const numFollowing: number = profile.following.length;

  async function handleFollowButton() {
    const followersArray: Profile[] = profile.followers;

    const userFollow = followersArray.some((item: Profile) => {
      return item.id === userLogged.id;
    });

    if (userFollow) {
      await dispatch(
        unfollowProfileThunk({
          userToken: userLogged.token,
          userId: profileId,
        }),
      );
      setNumFollowers((prev) => prev - 1);
      console.log("deixou de seguir");
    } else {
      await dispatch(
        followProfileThunk({ userToken: userLogged.token, userId: profileId }),
      );
      setNumFollowers((prev) => prev + 1);
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
            <button onClick={() => handleFollowButton()}>Teste</button>
          </div>
          <p>
            {numFollowers}
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
      <div>
        <button onClick={logout}>Sair</button>
      </div>
    </>
  );
}
