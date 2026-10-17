import { useState } from "react";
import meowtter2 from "../../assets/meowtter_2.png";
import { Link } from "react-router-dom";
import { type CreateNewAccount } from "../../store/user/userService";
import { createNewAccount } from "../../store/user/userThunks";
import { useAppDispatch } from "../../store";
import { LoginScreen } from "./LoginScreen";
import toast from "react-hot-toast";
import { Welcome } from "./Welcome";
interface NewUser {
  name: string;
  username: string;
  password: string;
  imageUrl?: string;
}

export function NewAccount() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    username: "",
    password: "",
  });

  const [sentForm, setSentForm] = useState(false);
  const [usingUsername, setUsingUsername] = useState(false);

  async function handleCreate({
    name,
    username,
    password,
    imageUrl,
  }: CreateNewAccount) {
    try {
      setIsLoading(true);
      setSentForm(true);
      await dispatch(
        createNewAccount({
          name: name,
          username: username,
          password: password,
          imageUrl: imageUrl,
        }),
      ).unwrap();
    } catch (error) {
      toast.error(error as string);
      if (error === "Nome de usuário já está em uso") {
        setUsingUsername(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

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

          <h2 className="font-bold text-cupid text-2xl justify-self-center">
            Crie sua nova conta
          </h2>
          <div className="grid mx-10 my-1">
            <label htmlFor="name">Nome</label>

            <input
              type="text"
              required
              minLength={3}
              id="name"
              value={newUser?.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Nome"
              className={
                sentForm
                  ? newUser.name.length < 3
                    ? "p-1 pl-2 input-error"
                    : "p-1 pl-2 input-primary"
                  : "p-1 pl-2 input-primary"
              }
            />
            {sentForm && newUser.name.length < 3 && (
              <span className="text-sm text-[#ff0062]">
                *Digite pelo menos 3 caracteres
              </span>
            )}
          </div>
          <div className="grid mx-10 my-1">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              required
              minLength={3}
              id="username"
              value={newUser?.username}
              onChange={(e) => {
                setNewUser({ ...newUser, username: e.target.value });
                setUsingUsername(false);
              }}
              placeholder="Usuário"
              className={
                sentForm
                  ? newUser.username.length < 3
                    ? "p-1 pl-2 input-error"
                    : "p-1 pl-2 input-primary"
                  : "p-1 pl-2 input-primary"
              }
            />
            {sentForm && newUser.username.length < 3 && (
              <span className="text-sm text-[#ff0062]">
                *Digite pelo menos 3 caracteres
              </span>
            )}
            {sentForm && usingUsername && (
              <span className="text-sm text-[#ff0062]">
                *Usuário já está em uso
              </span>
            )}
          </div>
          <div className="grid mx-10 my-1">
            <label htmlFor="password">Senha</label>
            <input
              type="text"
              required
              minLength={5}
              id="password"
              value={newUser?.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              placeholder="Senha"
              className={
                sentForm
                  ? newUser.password.length < 5
                    ? "p-1 pl-2 input-error"
                    : "p-1 pl-2 input-primary"
                  : "p-1 pl-2 input-primary"
              }
            />
            {sentForm && newUser.password.length < 5 && (
              <span className="text-sm text-[#ff0062]">
                *Digite pelo menos 5 caracteres
              </span>
            )}
          </div>
          <div className="grid mx-10 my-1">
            <label htmlFor="image">Foto de Perfil</label>
            <input
              type="text"
              id="image"
              value={newUser?.imageUrl}
              onChange={(e) =>
                setNewUser({ ...newUser, imageUrl: e.target.value })
              }
              placeholder="Foto de perfil"
              className="p-1 pl-2 input-primary"
            />
          </div>
          <div className="grid mx-10 my-1">
            <button
              onClick={() =>
                handleCreate({
                  name: newUser.name,
                  username: newUser.username,
                  password: newUser.password,
                  imageUrl: newUser.imageUrl,
                })
              }
              className="m-3 btn btn-primary"
            >
              Criar
            </button>
          </div>

          <div className="grid mx-10 my-1 justify-self-center">
            <Link to="/" className="link">
              Voltar ao login
            </Link>
          </div>
        </div>
      </div>
      {isLoading && <LoginScreen type="newAccount" />}
      <Welcome />
    </>
  );
}
