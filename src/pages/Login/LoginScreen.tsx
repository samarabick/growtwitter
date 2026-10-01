import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";
import logo from "../../assets/logo_meowtter.png";

interface Props {
  type: string;
}

export function LoginScreen({ type }: Props) {
  return (
    <>
      <div className="fixed inset-0 h-screen w-screen backdrop-blur-[2px] grid">
        <div className="self-center justify-self-center">
          <div className="relative modal-login-n-out w-sm h-100">
            <div className="absolute inset-0 m-auto justify-self-center self-center">
              <TailChase size="150" speed="1.75" color="#F68DB3"></TailChase>
            </div>

            <img
              src={logo}
              alt=""
              className="absolute inset-0 m-auto justify-self-center w-15"
            />
            {type === "login" ? (
              <p className="absolute justify-self-center bottom-20 text-azalea">
                Entrando...
              </p>
            ) : (
              <p className="absolute justify-self-center bottom-20 text-azalea">
                Saindo...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
