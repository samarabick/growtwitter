import { useState } from "react";
import meowtter2 from "../../assets/meowtter_2.png";
import { Link } from "react-router-dom";
import { type CreateNewAccount } from "../../store/user/userService";
import { createNewAccount } from "../../store/user/userThunks";
import { useAppDispatch } from "../../store";
interface NewUser {
  name: string;
  username: string;
  password: string;
  imageUrl?: string;
}

export function NewAccount() {
  const dispatch = useAppDispatch();
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    username: "",
    password: "",
  });

  async function handleCreate({
    name,
    username,
    password,
    imageUrl,
  }: CreateNewAccount) {
    try {
      const result = await dispatch(
        createNewAccount({
          name: name,
          username: username,
          password: password,
          imageUrl: imageUrl,
        }),
      );
      console.log(result);
    } catch (error) {
      console.log(error);
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
              id="name"
              value={newUser?.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Nome"
              className="p-1 pl-2 input-primary"
            />
          </div>
          <div className="grid mx-10 my-1">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={newUser?.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              placeholder="Usuário"
              className="p-1 pl-2 input-primary"
            />
          </div>
          <div className="grid mx-10 my-1">
            <label htmlFor="password">Senha</label>
            <input
              type="text"
              id="password"
              value={newUser?.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              placeholder="Senha"
              className="p-1 pl-2 input-primary"
            />
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
            <Link to="/">Voltar ao login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
