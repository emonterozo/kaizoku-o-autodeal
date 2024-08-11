import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { firestore } from "../config/firebase";
import { Product as ProductProps } from "../types/types";
import { ProductCard } from "../components";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductProps[]>([]);

  const fetchProducts = () => {
    getDocs(collection(firestore, "products")).then((querySnapshot) => {
      const formattedProducts: any = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProducts(formattedProducts);
    });
  };

  useEffect(() => {
    if (id === process.env.REACT_APP_ADMIN_KEY) {
      fetchProducts();
    }
  }, [id]);

  const handlePressProduct = (productId?: string) => {
    if (productId) {
      navigate(`/admin/product/${productId}/${id}`);
    } else {
      navigate(`/admin/add/${id}`);
    }
  };

  if (id === process.env.REACT_APP_ADMIN_KEY) {
    return (
      <Box component="main" p={5}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ marginTop: 5 }}
            onClick={() => handlePressProduct()}
          >
            Add Product
          </Button>
        </div>
        <Box
          sx={{
            paddingY: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <Box key={product.id} margin={1}>
              <ProductCard {...product} onPress={handlePressProduct} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  } else {
    return <NotFoundPage />;
  }
}
