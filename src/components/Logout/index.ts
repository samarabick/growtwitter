import { useAppDispatch } from "../../store";
import { getUser } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(
      getUser({
        username: "",
        id: "",
        token: "",
      }),
    );

    navigate("/");
  }

  return logout;
}
