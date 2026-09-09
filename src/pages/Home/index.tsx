// import { useNavigate } from "react-router-dom";
import { Feed } from "../../components/Feed/index";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchFollowingFeedThunk } from "../../store/tweet/tweetThunks";

export function Home() {
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.user.user.token);

  fetchFollowingFeedThunk(userToken);

  return (
    <>
      <div>
        <Feed
          fetchFeed={() => dispatch(fetchFollowingFeedThunk(userToken))}
          type="home"
        />
      </div>
    </>
  );
}
