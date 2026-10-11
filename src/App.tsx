import { RouterProvider } from "react-router-dom";
import { router } from "../src/routes/index";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 6000,
          style: {
            background: "#fcf2f7",
            color: "#0f102e",
            border: "1px solid #f68db3",
            borderRadius: "50px",
            padding: "14px 18px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#DB2777",
              secondary: "#FFFFFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#f6339a",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
