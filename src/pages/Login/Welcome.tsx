import logo from "../../assets/logo_meowtter.png";
// import dot from "../../assets/dot.svg";

export function Welcome() {
  return (
    <div className="fixed inset-0 h-screen w-screen backdrop-blur-xl grid page-fade">
      <div className="self-center justify-self-center">
        <div className="relative modal-login-n-out w-100 h-150">
          <svg
            className="orbit w-full h-full"
            viewBox="0 0 80 80"
            role="img"
            aria-label="Logo Meowtter"
          >
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
            </mask>
            <g mask="url(#atras)">
              <g>
                <circle
                  className="dot"
                  r="5"
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
        </div>
      </div>
    </div>
  );
}
