import { Link } from "react-router-dom";
import type { Author } from "../../types/index";
import { useAppSelector } from "../../store";
import { FollowUnfollow } from "./FollowUnfollow";
import { FollowYou } from "./FollowYou";

interface Props {
  profile: Author;
}

export function CardFollowers({ profile }: Props) {
  const userLogged = useAppSelector((state) => state.user.user);
  const userLoggedProfile = useAppSelector((state) => state.user.profileUser);

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
          <div className="grid">
            <Link
              className="font-semibold self-center"
              to={`/profile/${profile.id}`}
            >
              {profile.name}
            </Link>
            <div className="flex">
              <Link className="self-center" to={`/profile/${profile.id}`}>
                {`@${profile.username}`}
              </Link>
              <div className="">
                <FollowYou profile={profile} />
              </div>
            </div>
          </div>
        </div>

        <div className="self-center col-start-3 md:ml-10 2xl:ml-35">
          <div>
            {userLogged.id !== profile.id && (
              <FollowUnfollow
                profile={profile}
                userLoggedProfile={userLoggedProfile}
                userLogged={userLogged}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
