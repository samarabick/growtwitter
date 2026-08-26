import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { Feed } from "../../components/Feed";
import { useLogout } from "../../components/Logout";
import { useEffect } from "react";
import styled from "styled-components";
import { fetchProfileFeedThunk } from "../../store/tweet/tweetThunks";
import { loadProfileThunk } from "../../store/profile/profileThunks";

const ProfilePicture = styled.img`
  width: 50px;
  border-radius: 50%;
`;

export function Profile() {
  const params = useParams();
  const userId = params.id!;
  const userLogged = useAppSelector((state) => state.user.user);
  const logout = useLogout();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProfileThunk({ userToken: userLogged.token, userId: userId }));
  }, [userId]);

  fetchProfileFeedThunk({ userToken: userLogged.token, userId: userId });

  const numFollowers: number = profile.followers.length;
  const numFollowing: number = profile.following.length;

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
                userId: userId,
              }),
            )
          }
        />
      </div>
      <div>
        <button onClick={logout}>Sair</button>
      </div>
    </>
  );
}
