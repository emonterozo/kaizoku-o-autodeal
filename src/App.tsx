import { BrowserRouter, Routes, Route } from "react-router-dom";

//<a target="_blank" href="https://icons8.com/icon/118638/tiktok">TikTok</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
//<a target="_blank" href="https://icons8.com/icon/8818/facebook">Facebook</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

import { ThemeProvider, createTheme } from "@mui/material";
import Home from "./Home/Home";
import Product from "./Product/Product";
import AdminProduct from "./Admin/Product";
import Admin from "./Admin/Admin";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import ProductPreview from "./Admin/ProductPreview";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0C0E0D",
    },
    secondary: {
      main: "#D9D9D9",
    },
  },
  typography: {
    fontFamily: "Centauri, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input::placeholder": {
            color: "#A0A0A0", // Placeholder text color
            fontFamily: "Poppins",
          },
          "& .MuiInputBase-input": {
            color: "#D9D9D9", // Input text color
            fontFamily: "Poppins", // Default font for input text
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D9D9D9", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#D9D9D9 !important", // Hover color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976D2 !important", // Focused color
            },
          },
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/catalog" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/why-choose-us" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
          <Route path="/admin/:id" element={<Admin />} />
          <Route
            path="/admin/product/:productId/:id"
            element={<ProductPreview />}
          />
          <Route path="/admin/add/:id" element={<AdminProduct />} />
          <Route path="/admin/edit/:productId/:id" element={<AdminProduct />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
