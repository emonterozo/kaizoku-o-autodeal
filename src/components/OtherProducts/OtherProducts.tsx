import {
  Box,
  Typography,
  Grid,
  useTheme,
  Card,
  CardMedia,
} from "@mui/material";
import { Product } from "../../types/types";
import { formatPrice } from "../../utils/utils";

const cars = [
  {
    id: 1,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723476755982?alt=media&token=809f03b2-0cd2-4057-a84f-280eb80690cd",
    title: "2018 Ford Everest Titanium Plus",
    price: "₱1,010,000",
    size: 6,
  },
  {
    id: 2,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723475818634?alt=media&token=65a69a60-3bd3-4388-b58a-3bf95a6f1b57",
    title: "2014 Honda City VX",
    price: "₱480,000",
    size: 3,
    tag: "SOLD",
  },
  {
    id: 3,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723476469782?alt=media&token=b835ff16-843c-42a2-9fa7-5fcc9143205a",
    title: "2013 Mitsubishi Strada",
    price: "₱1,120,000",
    size: 3,
  },
  {
    id: 4,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723474902439?alt=media&token=561770a7-5f72-43ee-93c1-6f6bb870de72",
    title: "Honda CR-V",
    price: "₱1,038,000",
    size: 3,
    tag: "SALE",
  },
  {
    id: 5,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723474902439?alt=media&token=561770a7-5f72-43ee-93c1-6f6bb870de72",
    title: "Honda CR-V",
    price: "₱1,038,000",
    size: 3,
    tag: "SALE",
  },
  {
    id: 6,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723474902439?alt=media&token=561770a7-5f72-43ee-93c1-6f6bb870de72",
    title: "Honda CR-V",
    price: "₱1,038,000",
    size: 3,
    tag: "SALE",
  },
  {
    id: 5,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723474902439?alt=media&token=561770a7-5f72-43ee-93c1-6f6bb870de72",
    title: "Honda CR-V",
    price: "₱1,038,000",
    size: 3,
    tag: "SALE",
  },
  {
    id: 6,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723474902439?alt=media&token=561770a7-5f72-43ee-93c1-6f6bb870de72",
    title: "Honda CR-V",
    price: "₱1,038,000",
    size: 3,
    tag: "SALE",
  },
  {
    id: 5,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723474902439?alt=media&token=561770a7-5f72-43ee-93c1-6f6bb870de72",
    title: "Honda CR-V",
    price: "₱1,038,000",
    size: 3,
    tag: "SALE",
  },
  {
    id: 6,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723474902439?alt=media&token=561770a7-5f72-43ee-93c1-6f6bb870de72",
    title: "Honda CR-V",
    price: "₱1,038,000",
    size: 3,
    tag: "SALE",
  },
  {
    id: 6,
    image:
      "https://firebasestorage.googleapis.com/v0/b/kaizoku-o-autodeal.appspot.com/o/1723474902439?alt=media&token=561770a7-5f72-43ee-93c1-6f6bb870de72",
    title: "Honda CR-V",
    price: "₱1,038,000",
    size: 3,
    tag: "SALE",
  },
];

type OtherProductsProps = {
  products: Product[];
  onClick: (id: string) => void;
};

export const OtherProducts = ({ products, onClick }: OtherProductsProps) => {
  const theme = useTheme();
  return (
    <Box
      id="products"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        paddingX: "5%",
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
            textAlign: "center",
          }}
        >
          Other Products You Might Like
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              md: "16px",
            },
            color: "#D9D9D9",
            textAlign: "center",
          }}
        >
          Discover More Items You’ll Love
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              marginTop: "57px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {products.map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: "24px",
                  height: "332px",
                  minWidth: "330px", // Ensures a consistent card width
                  flexShrink: 0, // Prevents shrinking
                  position: "relative",
                }}
                onClick={() => onClick(item.id)}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={item.images[0]}
                    sx={{ height: "332px", width: "100%" }}
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
                    <Typography color="#FFFFFF" sx={{ fontSize: "12px" }}>
                      {item.name}
                    </Typography>
                    <Typography color="#CCCBCB" sx={{ fontSize: "12px" }}>
                      {`₱ ${formatPrice(item.price)}`}
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
                    {item.is_sold ? "Sold" : "Sale"}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* <Card
          sx={{
            borderRadius: "24px",
            overflow: "hidden",
            height: "332px",
            width: "432px",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              image={cars[1].image}
              sx={{ height: "332px", width: "432px" }}
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
              <Typography color="#FFFFFF" sx={{ fontSize: "12px" }}>
                2014 Honda City VX
              </Typography>
              <Typography color="#CCCBCB" sx={{ fontSize: "12px" }}>
                ₱ 480,000
              </Typography>
            </Box>
          </Box>
        </Card> */}
    </Box>
  );
};
