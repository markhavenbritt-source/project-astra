import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import TitleDetail from "./pages/TitleDetail";
import Reader from "./pages/Reader";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/title/:id" element={<TitleDetail />} />
      </Route>
      <Route path="/read/:id" element={<Reader />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
