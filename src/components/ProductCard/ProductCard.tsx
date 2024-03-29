import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

import { Product } from "../../types/types";
import { formatPrice } from "../../utils/utils";

type ProductCardProps = {
  onPress: (id: string) => void
} & Pick<Product, 'id' | 'name' | 'price' | 'images' >


export function ProductCard({id, name, price, images, onPress}: ProductCardProps) {
  
    
    return (
      <Card sx={{ maxWidth: 350 }}>
        <CardActionArea onClick={() => onPress(id)}>
          <CardMedia
            style={{ height: "250px" }}
            component="img"
            image={images[0]}
            title={name}
            alt={name}
            loading="lazy"
          />
          <CardContent>
            <Typography variant="h6" fontWeight="600" component="div">
              {name}
            </Typography>
            <Typography variant="h6">{`₱ ${formatPrice(price)}.00`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }