import { useState } from "react";
import { useAppDispatch } from "../../store/index";
import { type LoginProps } from "../../store/user/userService";
import { loadLogin } from "../../store/user/userThunks";
import { useNavigate } from "react-router-dom";
import { LoginScreen } from "./LoginScreen";

export interface User {
  username: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin({ username, password }: LoginProps) {
    setIsLoading(true);
    try {
      const result = await dispatch(
        loadLogin({
          username: username,
          password: password,
        }),
      );

      if (loadLogin.fulfilled.match(result)) {
        navigate("/home");
      }
    } finally {
      setIsLoading(false);
    }
  }

  console.log(isLoading);

  return (
    <>
      <input
        type="text"
        value={user?.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Usuário"
      />
      <input
        type="text"
        value={user?.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Senha"
      />
      <button
        onClick={() =>
          handleLogin({ username: user.username, password: user.password })
        }
      >
        Entrar
      </button>

      {/* Carregamento  */}

      {isLoading && <LoginScreen type="login" />}
    </>
  );
}
