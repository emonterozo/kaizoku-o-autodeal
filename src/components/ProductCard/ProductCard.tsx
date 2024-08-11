import { Card, CardActionArea, CardMedia, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";

import { Product } from "../../types/types";
import { formatPrice } from "../../utils/utils";

type ProductCardProps = {
  onPress: (id: string) => void
} & Pick<Product, 'id' | 'name' | 'price' | 'images' >


export function ProductCard({id, name, price, images, onPress}: ProductCardProps) {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  
  
    
    return (
      <Card sx={{ width: {
        xs: "350px",
        md: "400px"
      },  }}>
        <CardActionArea onClick={() => onPress(id)}>
          <CardMedia
            style={{ height: "520px" }}
            component="img"
            image={images[0]}
            title={name}
            alt={name}
            loading="lazy"
          />
          <CardContent>
            <Typography variant={isXs ? 'subtitle1' : 'h6'} fontWeight="600" sx={{
               overflow: "hidden",
               textOverflow: "ellipsis",
               display: "-webkit-box",
               WebkitLineClamp: "1",
               WebkitBoxOrient: "vertical",
            }}>
             {name}
            </Typography>
            <Typography variant={isXs ? 'subtitle1' : 'h6'} fontWeight="600">{`₱ ${formatPrice(price)}.00`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }