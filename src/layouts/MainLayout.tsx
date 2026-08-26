import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { NewTweet } from "../components/Tweet/NewTweet";
import { createTweetThunk } from "../store/tweet/tweetThunks";
import { type CreateTweetProps } from "../store/tweet/tweetService";
export function MainLayout() {
  const userId = useAppSelector((state) => state.user.user.id);

  const dispatch = useAppDispatch();

  async function handleCreateTweet({
    contentTweet,
    userToken,
  }: CreateTweetProps) {
    await dispatch(
      createTweetThunk({
        contentTweet: contentTweet,
        userToken: userToken,
        userId: userId,
      }),
    );
  }

  return (
    <>
      <Link to="/">Explorar</Link>
      <br />
      <Link to={`/profile/${userId}`}>Perfil</Link>
      <br />
      <NewTweet onSubmit={handleCreateTweet} />
      <Outlet />
    </>
  );
}
