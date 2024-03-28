import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
import Home from "./Home/Home";
import Product from "./Product/Product";
import { Header } from "./components";

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
            <Route path="/:title" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
