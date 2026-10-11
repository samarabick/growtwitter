import { persistor, useAppDispatch } from "../../store";
import { getUser, getUserProfile } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function logout() {
    dispatch(
      getUser({
        username: "",
        id: "",
        token: "",
      }),
    );
    dispatch(
      getUserProfile({
        followers: [],
        following: [],
        id: "",
        imageUrl: "",
        name: "",
        username: "",
      }),
    );
    await persistor.purge();

    navigate("/");
  }

  return logout;
}
