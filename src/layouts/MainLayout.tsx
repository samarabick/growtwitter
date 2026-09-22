import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/index";
// import { NewTweet } from "../components/Tweet/NewTweet";
// import { createTweetThunk } from "../store/tweet/tweetThunks";
// import { type CreateTweetProps } from "../store/tweet/tweetService";
import { useLogout } from "../components/Logout";
import { useState } from "react";
import { NewTweetModal } from "../components/Tweet/NewTweetModal";
import { NewTweet } from "../components/Tweet/NewTweet";
export function MainLayout() {
  const userId = useAppSelector((state) => state.user.user.id);

  const [isNewTweetModalOpen, setIsNewTweetModalOpen] = useState(false);

  function closeNewTweetModal() {
    setIsNewTweetModalOpen(false);
  }

  const logout = useLogout();

  const location = useLocation().pathname;

  return (
    <>
      <div className="grid sm:grid-cols-[200px_minmax(0,1fr)] md:grid-cols-[250px_minmax(0,1fr)250px] lg:grid-cols-[350px_minmax(0,1fr)_350px] 2xl:mx-60">
        <aside className="sm:h-screen sm:sticky sm:top-0 sm:pl-2 pt-5">
          <Link to="/home">Página inicial</Link>
          <br></br>
          <Link to="/explore">Explorar</Link>
          <br />
          <Link to={`/profile/${userId}`}>Perfil</Link>
          <br />
          {/* Botão de novo Tweet */}
          <button
            className="btn border-cupid bg-cupid text-white mt-1"
            onClick={() => setIsNewTweetModalOpen(true)}
          >
            Tweetar
          </button>
          <br></br>
          <button
            className="sm:absolute sm:bottom-10 btn border-gray-400 bg-gr"
            onClick={() => logout()}
          >
            Sair
          </button>

          {/* Modal de novo tweet  */}
          <NewTweetModal
            isNewTweetModalOpen={isNewTweetModalOpen}
            closeNewTweetModal={closeNewTweetModal}
          />
        </aside>
        <div>
          {/* Novo tweet  */}
          {location === "/home" && (
            <div className="not-md:hidden justify-self-center pt-5">
              <NewTweet onSubmit={closeNewTweetModal} />
            </div>
          )}
          <Outlet />
        </div>
        <aside className="not-md:hidden md:h-screen md:sticky md:top-0 pt-5">
          <h1>menu lateral</h1>
        </aside>
      </div>
    </>
  );
}
