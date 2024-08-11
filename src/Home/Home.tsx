import { Box, Toolbar, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";

import { firestore } from "../config/firebase";
import { Product } from "../types/types";
import { ProductCard } from "../components";
import Contact from "../Contact/Contact";

export default function Home() {
  const theme = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    getDocs(collection(firestore, "products")).then((querySnapshot) => {
      const formattedProducts: any = querySnapshot.docs
        .filter((doc) => doc.data().isActive)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      setProducts(formattedProducts);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Scroll to the section corresponding to the new title
    if (currentPath === "/") {
      const targetSection = document.getElementById("banner");
      if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
    } else {
      const sectionId = currentPath.substring(1);
      const targetSection = document.getElementById(sectionId);
      if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPath]);

  const handlePressProduct = (id: string) => navigate(`/product/${id}`);

  return (
    <Box component="main" bgcolor={theme.palette.primary.main}>
      <Toolbar />
      <Box>
        <Box
          id="banner"
          sx={{
            height: {
              xs: "30vh",
              sm: "40vh",
              md: "29vh",
              lg: "100vh",
            },
            backgroundImage: 'url("/banner.png")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />

        <Box
          id="catalog"
          sx={{
            paddingY: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            backgroundColor: "whitesmoke",
          }}
        >
          {products.map((product) => (
            <Box key={product.id} margin={1}>
              <ProductCard {...product} onPress={handlePressProduct} />
            </Box>
          ))}
        </Box>

        <Contact />
      </Box>
    </Box>
  );
}
