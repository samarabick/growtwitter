import { useState } from "react";
import { UnfollowModal } from "./UnfollowModal";
import type { Profile, User, UserProfile } from "../../types";
import { useAppDispatch } from "../../store";
import {
  followProfileThunk,
  unfollowProfileThunk,
} from "../../store/profile/profileThunks";

interface Props {
  profile: Profile;
  userLoggedProfile: UserProfile;
  userLogged: User;
}

export function FollowUnfollow({
  profile,
  userLoggedProfile,
  userLogged,
}: Props) {
  const followingUserArray = userLoggedProfile.following;

  const userFollow = followingUserArray.some(
    (following: Profile) => following.id === profile.id,
  );
  const dispatch = useAppDispatch();

  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);

  function closeUnfollowModal() {
    setIsUnfollowModalOpen(false);
  }

  async function handleFollowButton() {
    if (userFollow) {
      setIsUnfollowModalOpen(true);
    } else {
      await dispatch(
        followProfileThunk({
          userToken: userLogged.token,
          userId: profile.id,
          userLoggedId: userLogged.id,
        }),
      );
    }
  }

  async function confirmUnfollowModal() {
    await dispatch(
      unfollowProfileThunk({
        userToken: userLogged.token,
        userId: profile.id,
        userLoggedId: userLogged.id,
      }),
    );
    setIsUnfollowModalOpen(false);
  }

  return (
    <>
      <div>
        {userFollow ? (
          <button className="btn group" onClick={() => handleFollowButton()}>
            <span className="group-hover:hidden">Seguindo</span>
            <span className="hidden group-hover:inline">Deixar de Seguir</span>
          </button>
        ) : (
          <button
            className="btn btn-primary text-white"
            onClick={() => handleFollowButton()}
          >
            <span>Seguir</span>
          </button>
        )}
      </div>
      <div>
        <UnfollowModal
          isUnfollowModalOpen={isUnfollowModalOpen}
          closeUnfollowModal={closeUnfollowModal}
          confirmUnfollowModal={confirmUnfollowModal}
          profileUsername={profile.username}
        />
      </div>
    </>
  );
}
