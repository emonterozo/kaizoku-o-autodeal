import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";


import { firestore } from "../config/firebase";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/utils";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    images: [],
    details: []
  })


  // Reference to the specific document
  const productDocRef = doc(collection(firestore, 'products'), id);

  const getProduct = () => {
    // Retrieve the document snapshot
    getDoc(productDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        // Document exists, you can access its data
        const productData: any = docSnapshot.data();
        setProduct(productData)
      }
    })
    .catch((error) => {
      console.error('Error getting document:', error);
    });
  }

  useEffect(() => {
   getProduct()
  }, [])
  

  return (
    <Box component="main" p={5}>
      <Toolbar />
      <Grid container spacing={2}>
        {/* Left column for images */}
        <Grid item xs={12} md={7}>
          {/* Full width image */}
          <img
            style={{ width: "100%" }}
            src={product.images[0]}
            alt={product.name}
          />
          {/* Add more images as needed 1600x900 */}
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {product.images.slice(1).map((image, index) => (
              <img
                key={index}
                style={{ width: "calc(50% - 8px)", height: "auto", marginBottom: 10 }}
                src={image}
                alt={product.name}
              />
            ))}
          </Box>
        </Grid>
        {/* Right column for product description */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {`₱ ${formatPrice(product.price)}.00`}
          </Typography>
          <Typography variant="body1">
            {product.description}
          </Typography>
          {/* Add more product details here */}
          <List>
            {
              product.details.map(detail => (
                <ListItem key={detail}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon color="secondary" />
                  </ListItemIcon>
                  {detail}
                </ListItem>
              ))
            }
          </List>
          <Typography variant="subtitle1">
            Contact us: 0915 481 4562
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
