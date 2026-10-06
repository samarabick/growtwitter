import { Link } from "react-router-dom";
import type { Author } from "../../types/index";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadProfileUserLoggedThunk } from "../../store/user/userThunks";
import { useEffect } from "react";
import { fetchProfileFeedThunk } from "../../store/tweet/tweetThunks";
import { FollowUnfollow } from "./FollowUnfollow";

export function CardFollowers(profile: Author) {
  const userLogged = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  fetchProfileFeedThunk({ userToken: userLogged.token, userId: profile.id });

  const userLoggedProfile = useAppSelector((state) => state.user.profileUser);

  useEffect(() => {
    dispatch(
      loadProfileUserLoggedThunk({
        userId: userLogged.id,
        userToken: userLogged.token,
      }),
    );
  }, [userLogged.token, userLoggedProfile.following]);

  return (
    <>
      <div className="grid border-t border-t-tututu grid-cols-3">
        <div className="mx-10 my-3 col-span-2 col-start-1">
          <div>
            {profile.imageUrl != null ? (
              <Link to={`/profile/${profile.id}`}>
                <img
                  className="img-profile tweet-profile-pic inline"
                  src={profile.imageUrl}
                  alt=""
                />
              </Link>
            ) : (
              <Link to={`/profile/${profile.id}`}>
                <img
                  className="img-profile tweet-profile-pic inline"
                  src="https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png"
                  alt=""
                />
              </Link>
            )}
          </div>
          <div>
            <Link
              className="text-base font-semibold"
              to={`/profile/${profile.id}`}
            >
              {profile.name}
            </Link>
            <Link className="text-base p-1" to={`/profile/${profile.id}`}>
              {`@${profile.username}`}
            </Link>
          </div>
        </div>

        <div className="self-center col-start-3 md:ml-10 2xl:ml-35">
          <div>
            <FollowUnfollow
              profile={profile}
              userLoggedProfile={userLoggedProfile}
              userLogged={userLogged}
            />
          </div>
        </div>
      </div>
    </>
  );
}
