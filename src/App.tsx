import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Admin } from "./pages/Admin";
import { Cadastro } from "./pages/Cadastro";
import { Landing } from "./pages/Landing";
import { Resultado } from "./pages/Resultado";
import { Teste } from "./pages/Teste";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/teste" element={<Teste />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
