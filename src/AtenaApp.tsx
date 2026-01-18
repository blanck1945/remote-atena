import { Routes, Route } from "react-router";
import App from "./App.tsx";
import { Stats } from "./pages/Stats.tsx";

// Componente wrapper que se expone para Module Federation
// Este es el componente que debe ser importado por el host
const AtenaApp = () => {
  return (
    <Routes>
      {/* "index" representa la ruta base donde se monte (en este caso /atena) */}
      <Route index element={<App />} /> 
      {/* "stats" sin la barra inicial se vuelve relativa -> /atena/stats */}
      <Route path="stats" element={<Stats />} />
    </Routes>
  );
};

// Exportar el componente por defecto para Module Federation
export default AtenaApp;

// También exportar el componente con nombre para mayor flexibilidad
export { AtenaApp };

