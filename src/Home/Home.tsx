import {
  Box,
  useTheme,
  Typography,
  CardContent,
  Grid,
  CardMedia,
  Card,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";

import { firestore } from "../config/firebase";
import { Product } from "../types/types";
import { Footer, WhyChooseUs, OtherProducts } from "../components";
import Contact from "../Contact/Contact";
import { formatPrice } from "../utils/utils";
import { OPTIONS } from "../utils/constant";

export default function Home() {
  const theme = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<Product | undefined>(
    undefined
  );
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchProducts = () => {
    getDocs(collection(firestore, "products")).then((querySnapshot) => {
      const formattedProducts: Product[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Product),
        id: doc.id.toString(),
      }));

      const featuredProductHolder = formattedProducts.find(
        (product) => product.is_featured
      );

      const otherProducts = formattedProducts.filter(
        (item) => item.id !== featuredProductHolder?.id && item.is_active
      );
      // Shuffle the array using Fisher-Yates algorithm
      const shuffled = [...otherProducts].sort(() => Math.random() - 0.5);

      // Pick the top 3 random products
      const randomProductsHolder = shuffled.slice(0, 3);

      // Store the remaining products
      const remainingProducts = shuffled.slice(3);

      setFeaturedProduct(featuredProductHolder);
      setProducts(remainingProducts);
      setRandomProducts(randomProductsHolder);
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

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <Box component="main" bgcolor={theme.palette.primary.main}>
      <Box>
        <Box
          id="banner"
          sx={{
            height: {
              xs: "100vh",
              sm: "50vh",
              lg: "100vh",
            },
            backgroundImage: {
              xs: 'url("/mobile-banner.png")',
              sm: 'url("/banner.png")',
            },
            backgroundSize: {
              xs: "contain",
              lg: "cover",
            },
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: {
                xs: "flex",
                sm: "none",
              },
              gap: "25px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#ffffff",
              }}
            >
              EmJay
              <br />
              Garage
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{
                display: { sm: "none" },
                color: "#ffffff",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: "100%",

                bgcolor: theme.palette.primary.main,
                color: "#ffffff",
              },
            }}
          >
            <IconButton
              onClick={toggleDrawer}
              sx={{
                color: "#ffffff",
                position: "absolute",
                right: 0,
              }}
            >
              <CloseOutlinedIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                  marginTop: "50%",
                  paddingX: "10px",
                }}
              >
                {OPTIONS.map((item) => (
                  <Typography
                    key={item.label}
                    sx={{
                      fontSize: "32px",
                      color: "#D9D9D9",
                      cursor: "pointer",
                      "&:hover": { color: "#FFFFFF" },
                    }}
                    onClick={() => {
                      toggleDrawer();
                      navigate(item.path);
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#D9D9D9",
                  paddingX: "10px",
                  textAlign: "center",
                  paddingBottom: "15px",
                }}
              >
                EmJay Garage
              </Typography>
            </Box>
          </Drawer>
          <Box
            sx={{
              position: "absolute",
              top: {
                xs: "42%",
                lg: "90%",
              },
              right: 15,
              background: "rgba(8, 16, 19, 0.5)",
              paddingX: "29px",
              paddingY: "25px",
              borderRadius: "24px",
              display: {
                xs: "none",
                sm: "flex",
              },
              gap: "24px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "#D9D9D9",
              }}
            >
              EmJay Garage
            </Typography>
            {OPTIONS.map((item) => (
              <Typography
                key={item.label}
                sx={{
                  fontSize: "16px",
                  color: "#D9D9D9",
                  cursor: "pointer",
                  "&:hover": { color: "#FFFFFF" },
                }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          id="catalog"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            paddingX: "5%",
            paddingTop: {
              xs: "10%",
              lg: "5%",
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Typography
              sx={{
                fontSize: {
                  xs: "22px",
                  md: "40px",
                },
                color: "#D9D9D9",
              }}
            >
              Car Catalog
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  md: "16px",
                },
                color: "#D9D9D9",
              }}
            >
              Explore our Cars you might like!
            </Typography>
          </Box>
          <Grid container spacing={2} paddingTop="57px">
            {featuredProduct && (
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    bgcolor: "#081013",
                    borderRadius: "24px",
                  }}
                  onClick={() => handlePressProduct(featuredProduct?.id!)}
                >
                  <CardMedia
                    component="img"
                    image={featuredProduct?.images[0]}
                    sx={{ height: { lg: "428px" } }}
                  />

                  <CardContent>
                    <Typography color="#D9D9D9" sx={{ fontSize: "16px" }}>
                      {featuredProduct?.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        marginTop: "16px",
                      }}
                    >
                      <Typography
                        color="#CCCBCB"
                        sx={{
                          fontSize: "16px",
                          fontFamily: "Poppins",
                          fontWeight: "light",
                        }}
                      >
                        {featuredProduct?.headline}
                      </Typography>
                      <Typography color="#D9D9D9" sx={{ fontSize: "24px" }}>
                        {`₱ ${formatPrice(featuredProduct?.price ?? 0)}`}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {randomProducts.length > 0 && (
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {randomProducts.map((product, index) => (
                    <Grid
                      key={product.id}
                      item
                      xs={12}
                      md={index > 1 ? undefined : 6}
                    >
                      <Card
                        sx={{
                          borderRadius: "24px",
                          overflow: "hidden",
                          height: index > 1 ? "332px" : "307px",
                          position: "relative",
                        }}
                        onClick={() => handlePressProduct(product.id)}
                      >
                        <Box sx={{ position: "relative" }}>
                          <CardMedia
                            component="img"
                            image={product.images[0]}
                            sx={{ height: index > 1 ? "332px" : "307px" }}
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "100%",
                              background: "rgba(8, 16, 19, 0.5)",
                              padding: "10px",
                              gap: "10px",
                            }}
                          >
                            <Typography
                              color="#FFFFFF"
                              sx={{ fontSize: "12px" }}
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              color="#CCCBCB"
                              sx={{ fontSize: "12px" }}
                            >
                              {`₱ ${formatPrice(product.price)}`}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "rgba(8, 16, 19, 0.9)",
                            padding: "10px",
                            gap: "10px",
                            borderRadius: "100px",
                          }}
                        >
                          <Typography color="#CCCBCB" sx={{ fontSize: "12px" }}>
                            {product.is_sold ? "Sold" : "Sale"}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
        <Box
          sx={{
            paddingTop: {
              xs: "10%",
              lg: "5%",
            },
          }}
        >
          <OtherProducts products={products} onClick={handlePressProduct} />
        </Box>
        <Box
          sx={{
            paddingY: {
              xs: "10%",
              lg: "5%",
            },
          }}
        >
          <WhyChooseUs />
        </Box>
        <Contact />
        <Footer />
      </Box>
    </Box>
  );
}
