import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import { Stats } from "./pages/Stats.tsx";

// Función para obtener el basename dinámicamente
const getBasename = () => {
  return (window as Window & { __MF_BASENAME__?: string }).__MF_BASENAME__ || "atena";
};

// Función para crear el router con un basename opcional (para uso standalone)
export function createRouter(basename?: string) {
  const routerBasename = basename || getBasename();
  return createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
    ],
    {
      basename: routerBasename,
    }
  );
}

// Exportar el RouterProvider para uso directo
export { RouterProvider };

// Exportar el router por defecto con el basename dinámico (para uso standalone)
export const router = createRouter();

