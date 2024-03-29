import { BrowserRouter, Routes, Route } from "react-router-dom";

//<a target="_blank" href="https://icons8.com/icon/118638/tiktok">TikTok</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
//<a target="_blank" href="https://icons8.com/icon/8818/facebook">Facebook</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

import { ThemeProvider, createTheme } from "@mui/material";
import { Header } from "./components";
import Home from "./Home/Home";
import Product from "./Product/Product";
import Admin from "./Admin/Admin";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e2127",
    },
    secondary: {
      main: "#e6ab44",
    },
  },
  typography: {
    fontFamily: "Garet-Book, Garet-Heavy, sans-serif",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/catalog" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
          <Route path="/admin/:id" element={<Admin />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
