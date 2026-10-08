import { useAppSelector } from "../../store";
import type { Author } from "../../types";

interface Props {
  profile: Author;
}

export function FollowYou({ profile }: Props) {
  const userLoggedProfile = useAppSelector((state) => state.user.profileUser);

  const followersList: Author[] = userLoggedProfile.followers;

  const userIsFolloing = followersList.some((follower) => {
    return follower.id === profile.id;
  });

  return (
    <>
      <div>
        {userIsFolloing && (
          <>
            <p className="select-none text-azalea border rounded-3xl m-1 px-1 text-sm bg-tututu2">
              Segue Você
            </p>
          </>
        )}
      </div>
    </>
  );
}
