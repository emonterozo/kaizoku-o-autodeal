import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { PhotoView, PhotoProvider } from "react-photo-view";

import { firestore } from "../config/firebase";
import { RefObject, useEffect, useRef, useState } from "react";
import { formatPrice } from "../utils/utils";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function ProductPreview() {
  const { productId, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    images: [],
    details: [],
  });

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up('xs'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // Reference to the specific document
  const productDocRef = doc(collection(firestore, "products"), productId);

  const getProduct = () => {
    // Retrieve the document snapshot
    getDoc(productDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Document exists, you can access its data
          const productData: any = docSnapshot.data();
          console.log(productData);
          setProduct(productData);
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePressEdit = () => navigate(`/admin/edit/${productId}/${id}`);

  // Update the current image index based on scroll position
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (isSm || isXs) {
      setCurrentIndex(0);
      const container = containerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
    }
  }, [isSm, isXs]);

  if (id === process.env.REACT_APP_ADMIN_KEY) {
    return (
      <Box component="main" p={5}>
        <Toolbar />
        <PhotoProvider>
          <Grid container spacing={2}>
            {isMd ? (
              <>
                {/* Left column for images */}
                <Grid item xs={12} md={7}>
                  <PhotoView src={product.images[0]}>
                    <img
                      style={{ width: '100%' }}
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </PhotoView>
                  <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                    {product.images.slice(1).map((image, index) => (
                      <PhotoView key={index} src={image}>
                        <img
                          style={{
                            width: 'calc(50% - 8px)',
                            height: 'auto',
                            marginBottom: 10,
                          }}
                          src={image}
                          alt={product.name}
                        />
                      </PhotoView>
                    ))}
                  </Box>
                </Grid>
                {/* Right column for product description */}
                <Grid item xs={12} md={5}>
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {`P${formatPrice(product.price)}.00`}
                  </Typography>
                  <List>
                    {product.details.map((detail) => (
                      <ListItem key={detail}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon color="secondary" />
                        </ListItemIcon>
                        {detail}
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {product.description.replace(/\\n/g, '\n')}
                  </Typography>
                </Grid>
              </>
            ) : (
              // Display text only for small screens
              <Grid item xs={12}>
                <Box sx={{ position: 'relative', width: '100%', mb: 3 }}>
                  {/* Image Container */}
                  <Box
                    ref={containerRef}
                    sx={{
                      width: '100%',
                      overflowX: 'auto',
                      whiteSpace: 'nowrap',
                      scrollSnapType: 'x mandatory',
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                    }}
                  >
                    {product.images.map((image, index) => (
                      <PhotoView key={index} src={image}>
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                            marginBottom: 10,
                          }}
                          src={image}
                          alt={product.name}
                        />
                      </PhotoView>
                    ))}
                  </Box>

                  {/* Dot Indicators */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: 1,
                      pb: 1,
                    }}
                  >
                    {product.images.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: currentIndex === index ? 'primary.main' : 'grey.500',
                          cursor: 'default',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {`P${formatPrice(product.price)}.00`}
                </Typography>
                <List>
                  {product.details.map((detail) => (
                    <ListItem key={detail}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckIcon color="secondary" />
                      </ListItemIcon>
                      {detail}
                    </ListItem>
                  ))}
                </List>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {product.description.replace(/\\n/g, '\n')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </PhotoProvider>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ marginTop: 5 }}
          onClick={handlePressEdit}
        >
          Edit Product
        </Button>
      </Box>
    );
  } else {
    return <NotFoundPage />;
  }
}
