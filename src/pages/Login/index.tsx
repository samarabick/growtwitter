import { useState } from "react";
import { useAppDispatch } from "../../store/index";
import { type LoginProps } from "../../store/user/userService";
import { loadLogin } from "../../store/user/userThunks";
import { useNavigate } from "react-router-dom";
import { LoginScreen } from "./LoginScreen";
import meowtter2 from "../../assets/meowtter_2.png";

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

  const [hiddenPassword, setHiddenPassowrd] = useState(true);

  return (
    <>
      <div className="h-screen w-screen grid pb-1">
        <div className="justify-self-center modal-login-n-out self-center">
          <div className="grid m-10">
            <img
              src={meowtter2}
              alt=""
              className="max-w-70 justify-center self-center"
            />
          </div>
          <div className="grid m-10">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Usuário"
              className="p-1 pl-2 input-primary"
            />
            <label htmlFor="password">Senha</label>
            <input
              type={hiddenPassword ? "password" : "text"}
              id="password"
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Senha"
              className="p-1 pl-2 input-primary"
            />
            <div className="flex mt-1">
              <input
                type="checkbox"
                id="showPassword"
                onChange={() => setHiddenPassowrd(!hiddenPassword)}
                className="mr-1"
              />
              <label htmlFor="showPassword">Mostrar senha</label>
            </div>
            <button
              onClick={() =>
                handleLogin({
                  username: user.username,
                  password: user.password,
                })
              }
              className="m-3 btn btn-primary"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>

      {/* Carregamento  */}

      {isLoading && <LoginScreen type="login" />}
    </>
  );
}
