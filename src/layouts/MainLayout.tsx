import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/index";
import { useLogout } from "../components/Logout";
import { useState } from "react";
import { NewTweetModal } from "../components/Tweet/NewTweetModal";
import { NewTweet } from "../components/Tweet/NewTweet";
import {
  HouseIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export function MainLayout() {
  const user = useAppSelector((state) => state.user.user);
  const userId = user.id;

  const [isNewTweetModalOpen, setIsNewTweetModalOpen] = useState(false);

  function closeNewTweetModal() {
    setIsNewTweetModalOpen(false);
  }

  const logout = useLogout();

  const location = useLocation().pathname;

  return (
    <>
      <div className="grid sm:grid-cols-[200px_minmax(0,1fr)] md:grid-cols-[250px_minmax(0,1fr)250px] lg:grid-cols-[250px_minmax(0,1fr)_250px] lg:mx-20 2xl:mx-85">
        <aside className="sm:h-screen sm:sticky sm:top-0 sm:pl-2 text-xl relative border border-tututu rounded-4xl bg-tututu2 grid">
          <div className="mt-15 px-4">
            {/* Link para Página Inicial  */}
            <div className="pt-2">
              {location === "/home" ? (
                <Link to="/home">
                  <HouseIcon
                    weight="fill"
                    className="inline size-4.5 text-cupid fill-current"
                  />
                  <p className="inline align-middle text-cupid font-semibold">
                    Página inicial
                  </p>
                </Link>
              ) : (
                <Link to="/home">
                  <HouseIcon className="inline size-4.5" />
                  <p className="inline align-middle">Página inicial</p>
                </Link>
              )}
            </div>

            {/* Link para Página Explorar  */}
            <div>
              {location === "/explore" ? (
                <Link to="/explore">
                  <MagnifyingGlassIcon
                    weight="fill"
                    className="inline size-4.5 text-cupid fill-current"
                  />{" "}
                  <p className="inline align-middle text-cupid font-semibold">
                    Explorar
                  </p>
                </Link>
              ) : (
                <Link to="/explore">
                  <MagnifyingGlassIcon className="inline size-4.5" />{" "}
                  <p className="inline align-middle">Explorar</p>
                </Link>
              )}
            </div>
            <div>
              {location === `/profile/${userId}` ? (
                <Link to={`/profile/${userId}`}>
                  <UserIcon
                    weight="fill"
                    className="inline size-4.5 text-cupid fill-current"
                  />
                  <p className="inline align-middle text-cupid font-semibold">
                    Perfil
                  </p>
                </Link>
              ) : (
                <Link to={`/profile/${userId}`}>
                  <UserIcon className="inline size-4.5" />
                  <p className="inline align-middle">Perfil</p>
                </Link>
              )}
            </div>
            {/* Botão de novo Tweet */}
            <div className="grid mt-3">
              <button
                className="btn border-cupid bg-cupid text-white mt-1 "
                onClick={() => setIsNewTweetModalOpen(true)}
              >
                Tweetar
              </button>
            </div>
          </div>

          <div className="sm:absolute sm:bottom-10 sm:left-20 md:left-13 btn border-cupid text-cupid">
            <Menu>
              <MenuButton>
                <span>@</span>
                {user.username}
              </MenuButton>
              <MenuItems anchor="top">
                <div className="bg-pink-400 rounded-4xl px-2 text-white">
                  <MenuItem>
                    <button className="block mb-5" onClick={() => logout()}>
                      Sair
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>

          {/* Modal de novo tweet  */}
          <NewTweetModal
            isNewTweetModalOpen={isNewTweetModalOpen}
            closeNewTweetModal={closeNewTweetModal}
          />
        </aside>
        <div className="border border-tututu rounded-4xl bg-tututu2 mx-3">
          {/* Novo tweet  */}
          {location === "/home" && (
            <div className="not-lg:hidden justify-self-center py-5 ">
              <NewTweet onSubmit={closeNewTweetModal} />
            </div>
          )}
          <div>
            <Outlet />
          </div>
        </div>
        <aside className="not-md:hidden md:h-screen md:sticky md:top-0 pt-5 border border-tututu rounded-4xl bg-tututu2">
          <h1>menu lateral</h1>
        </aside>
      </div>
    </>
  );
}
