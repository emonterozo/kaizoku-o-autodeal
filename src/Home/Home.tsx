import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const numberOfCards = 6;

function ActionAreaCard() {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActionArea onClick={() => navigate(`/product/1`)}>
        <CardMedia
          style={{ height: "250px" }}
          component="img"
          image="https://source.unsplash.com/1600x900/?car"
          title="Picture"
          alt="pic"
        />
        <CardContent>
          <Typography variant="h6" fontWeight="600" component="div">
            2022 Toyota Vios 1.3 Automatic
          </Typography>
          <Typography variant="h6">₱ 605,000.00</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Home() {
  const theme = useTheme();
  const { title } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    comments: "",
  });

  useEffect(() => {
    // Scroll to the section corresponding to the new title
    if (title) {
      const sectionId = title.replace(/\s+/g, "-").toLowerCase();
      const targetSection = document.getElementById(sectionId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const targetSection = document.getElementById("banner");
      if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [title]);

  return (
    <Box component="main" bgcolor={theme.palette.primary.main}>
      <Toolbar />
      <Box>
        <Box
          id="banner"
          sx={{
            height: "100vh",
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
          {[...Array(numberOfCards)].map((_, index) => (
            <Box key={index} margin={1}>
              <ActionAreaCard />
            </Box>
          ))}
        </Box>

        <Box id="contact">
          <Box sx={{ backgroundColor: "whitesmoke", padding: 5 }}>
            <Typography variant="h2" align="center" gutterBottom>
              Contact Us
            </Typography>
            {/* Contact form fields */}
            <form onSubmit={() => {}}>
              <Box display="flex" justifyContent="space-between" gap={2}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  name="name"
                  value={formData.name}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  name="email"
                  value={formData.email}
                />
              </Box>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                margin="normal"
                name="phoneNumber"
                value={formData.phoneNumber}
              />
              <TextField
                fullWidth
                label="Comments"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                name="comments"
                value={formData.comments}
              />
              {/* Submit button */}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ marginTop: 2, width: "15%" }}
              >
                Send
              </Button>
            </form>

            <Box mt={4} display="flex" justifyContent="center">
              <IconButton aria-label="Facebook" sx={{ mr: 1 }}>
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter" sx={{ mr: 1 }}>
                <Twitter />
              </IconButton>
              <IconButton aria-label="Instagram" sx={{ mr: 1 }}>
                <Instagram />
              </IconButton>
            </Box>
          </Box>

          <Container
            maxWidth="lg"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              padding: "20px 0",
            }}
          >
            <Typography variant="body1" align="center">
              © 2024 Kaizoku-0 Autodeal. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
