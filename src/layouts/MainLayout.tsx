import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/index";
// import { NewTweet } from "../components/Tweet/NewTweet";
// import { createTweetThunk } from "../store/tweet/tweetThunks";
// import { type CreateTweetProps } from "../store/tweet/tweetService";
import { useLogout } from "../components/Logout";
import { useState } from "react";
import { NewTweetModal } from "../components/Tweet/NewTweetModal";
export function MainLayout() {
  const userId = useAppSelector((state) => state.user.user.id);

  // const dispatch = useAppDispatch();

  // async function handleCreateTweet({
  //   contentTweet,
  //   userToken,
  // }: CreateTweetProps) {
  //   await dispatch(
  //     createTweetThunk({
  //       contentTweet: contentTweet,
  //       userToken: userToken,
  //       userId: userId,
  //     }),
  //   );
  // }

  const [isNewTweetModalOpen, setIsNewTweetModalOpen] = useState(false);

  function closeNewTweetModal() {
    setIsNewTweetModalOpen(false);
  }

  const logout = useLogout();

  return (
    <>
      <div className="grid sm:grid-cols-[200px_minmax(0,1fr)] md:grid-cols-[250px_minmax(0,1fr)250px] lg:grid-cols-[350px_minmax(0,1fr)_350px] ">
        <aside className="sm:h-screen sm:sticky sm:top-0 sm:pl-2">
          <Link to="/home">Página inicial</Link>
          <br></br>
          <Link to="/explore">Explorar</Link>
          <br />
          <Link to={`/profile/${userId}`}>Perfil</Link>
          <br />
          <button className="btn" onClick={() => setIsNewTweetModalOpen(true)}>
            Tweetar
          </button>
          <NewTweetModal
            isNewTweetModalOpen={isNewTweetModalOpen}
            closeNewTweetModal={closeNewTweetModal}
          />
          {/* <NewTweet onSubmit={handleCreateTweet} /> */}
          <br></br>
          <button
            className="sm:absolute sm:bottom-3 btn"
            onClick={() => logout()}
          >
            Sair
          </button>
        </aside>
        <div>
          <Outlet />
        </div>
        <aside className="not-md:hidden md:h-screen md:sticky md:top-0">
          <h1>menu lateral</h1>
        </aside>
      </div>
    </>
  );
}
