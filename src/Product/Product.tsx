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

const Product = () => {
  const { id } = useParams();

  return (
    <Box component="main" p={5}>
      <Toolbar />
      <Grid container spacing={2}>
        {/* Left column for images */}
        <Grid item xs={12} md={6}>
          {/* Full width image */}
          <img
            style={{ width: "100%" }}
            src="https://source.unsplash.com/1600x900/?car"
            alt="sample"
          />
          {/* Add more images as needed */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <img
              style={{ width: "calc(50% - 8px)" }}
              src="https://source.unsplash.com/1600x900/?car"
              alt="sample"
            />
            <img
              style={{ width: "calc(50% - 8px)" }}
              src="https://source.unsplash.com/1600x900/?car"
              alt="sample"
            />
          </Box>
        </Grid>
        {/* Right column for product description */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Product Name
          </Typography>
          <Typography variant="h4" gutterBottom>
            ₱ 605,000.00
          </Typography>
          <Typography variant="body1">
            Description of the product goes here. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam scelerisque libero at libero
            ultricies, non facilisis purus scelerisque.
          </Typography>
          {/* Add more product details here */}
          <List>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckIcon color="secondary" />
              </ListItemIcon>
              Sample description 1
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckIcon color="secondary" />
              </ListItemIcon>
              Sample description 2
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckIcon color="secondary" />
              </ListItemIcon>
              Sample description 3
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
