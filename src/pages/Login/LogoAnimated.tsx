import {
  ArrowRightIcon,
  GithubLogoIcon,
  HeartIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import logo from "../../assets/logo_meowtter.png";
import mask from "../../assets/mask-logo-animation.png";
import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <div className="fixed inset-0 grid place-items-center page-fade">
      <div className="fixed inset-0 h-screen w-screen backdrop-blur-[2px] grid">
        <div className="self-center justify-self-center">
          <div className="relative modal-login-n-out w-xl h-160 xxl:h-200">
            <svg
              role="img"
              aria-label="Logo Meowtter"
              viewBox="0 0 80 80"
              className="w-40 justify-self-center mt-10"
            >
              {/* logo */}
              <image href={logo} height="80" width="80" />
              <mask
                id="atras"
                maskUnits="userSpaceOnUse"
                x="-50"
                y="-50"
                width="314"
                height="356"
              >
                <rect x="-20" y="-20" width="120" height="120" fill="#fff" />
                <image href={mask} x="20" y="20" width="20" height="20" />
              </mask>
              <g mask="url(#atras)" transform="translate(1.5 0)">
                <g>
                  <circle
                    className="dot"
                    r="4"
                    width="5.6"
                    height="5.6"
                    fill="#F68DB3"
                  />
                </g>
              </g>
              <g transform="translate(1.5 0)">
                <path
                  className="star"
                  d="M29.7 30.4 Q30.7 36.7 36.9 38 Q30.7 39.2 29.7 45.5 Q28.7 39.2 22.5 38 Q28.7 36.7 29.7 30.4Z"
                />
              </g>
            </svg>
            <div>
              <p className="text-cupid font-bold justify-self-center mt-5 text-xl">
                Bem-vindo(a)
              </p>
            </div>
            <div className="flex items-center justify-self-center text-azalea">
              <p className="mr-0.5">Encontre a criadora desse projeto</p>
              <HeartIcon />
            </div>
            <div className="mx-10 mt-10">
              <a
                href="https://www.linkedin.com/in/samara-bick/"
                target="blank"
                className="btn btn-primary flex items-center justify-center m-1"
              >
                <LinkedinLogoIcon />
                Linkedin
              </a>
              <a
                href="https://www.instagram.com/samarabick/"
                target="blank"
                className="btn btn-primary flex items-center justify-center m-1"
              >
                <InstagramLogoIcon />
                Instagram
              </a>
              <a
                href="https://github.com/samarabick/"
                target="blank"
                className="btn btn-primary flex items-center justify-center m-1"
              >
                <GithubLogoIcon />
                Github
              </a>
            </div>
            <div className="grid mx-10 my-1 justify-self-center absolute bottom-10">
              <Link
                to="/"
                className="link flex items-center justify-center m-1 text-xl"
              >
                Avançar
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
