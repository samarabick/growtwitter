import { DotOutlineIcon } from "@phosphor-icons/react";
import { useAppSelector } from "../../store";
import type { Author } from "../../types";
import { CardFollowers } from "./CardFollowers";

interface Props {
  type: string;
}

export function Followers({ type }: Props) {
  const profile = useAppSelector((state) => state.profile);

  const listFollowers = useAppSelector((state) => {
    if (type === "followers") {
      return state.profile.followers;
    } else {
      return state.profile.following;
    }
  });

  const totalFollowers = listFollowers.length;

  return (
    <>
      <div className="m-5 flex">
        {type === "followers" ? (
          <div className="flex">
            <p>Seguidores de @{profile.username}</p>
            <DotOutlineIcon
              weight="fill"
              className="self-center text-gray-500"
            />
            <p className="self-center text-gray-500">{totalFollowers}</p>
            <p className="self-center text-gray-500 mx-1">Seguidores</p>
          </div>
        ) : (
          <div className="flex">
            <p>Seguindo de @{profile.username}</p>
            <DotOutlineIcon
              weight="fill"
              className="self-center text-gray-500"
            />
            <p className="self-center text-gray-500">{totalFollowers}</p>
            <p className="self-center text-gray-500 mx-1">Seguindo</p>
          </div>
        )}
      </div>
      <div>
        {listFollowers.length > 0 ? (
          listFollowers.map((profile: Author) => (
            <CardFollowers profile={profile} />
          ))
        ) : (
          <>
            <p>Nenhum resultado</p>
          </>
        )}
      </div>
    </>
  );
}
