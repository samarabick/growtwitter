// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Feed } from "../../components/Feed/index";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchFollowingFeedThunk } from "../../store/tweet/tweetThunks";
import { loadProfileUserLoggedThunk } from "../../store/user/userThunks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Home() {
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFeed() {
      try {
        await dispatch(fetchFollowingFeedThunk(userLogged.token)).unwrap();
      } catch (error) {
        toast.error(error as string);
        navigate("/");
      }
    }
    fetchFeed();
  }, []);

  useEffect(() => {
    dispatch(
      loadProfileUserLoggedThunk({
        userId: userLogged.id,
        userToken: userLogged.token,
      }),
    );
  }, []);

  return (
    <>
      <div>
        <Feed
          fetchFeed={() => dispatch(fetchFollowingFeedThunk(userLogged.token))}
          type="home"
        />
      </div>
    </>
  );
}
