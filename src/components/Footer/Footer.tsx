import { Box, Grid, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OPTIONS = [
  {
    title: "Navigation",
    subContents: [
      {
        title: "Home",
        path: "/",
      },
      {
        title: "Catalog",
        path: "/catalog",
      },
      {
        title: "Contact",
        path: "/contact",
      },
    ],
  },
  {
    title: "Support Us",
    subContents: [
      {
        title: "Facebook",
        path: "https://www.facebook.com/emjaygarage",
      },
      {
        title: "Instagram",
        path: "https://www.instagram.com/emjaygarage",
      },
      {
        title: "Tiktok",
        path: "https://www.tiktok.com/@emjaygarage",
      },
    ],
  },
];

export const Footer = () => {
  const navigate = useNavigate();

  const onClick = (title: string, path: string) => {
    if (title === "Navigation") {
      navigate(path);
    } else {
      window.open(path, "_blank");
    }
  };

  return (
    <Box
      sx={{
        paddingX: "5%",
        paddingY: {
          xs: "10%",
          lg: "5%",
        },
        paddingBottom: {
          xs: "5%",
          md: "2%",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  md: "16px",
                },
                color: "#D9D9D9",
              }}
            >
              EmJay Garage
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "light",
                fontSize: {
                  xs: "16px",
                  md: "18px",
                },
                color: "#9B9B9B",
              }}
            >
              Discover a wide selection of quality vehicles and enjoy
              exceptional service at every step.
            </Typography>
          </Box>
        </Grid>
        {OPTIONS.map((option) => (
          <Grid key={option.title} item xs={12} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "14px",
                    md: "16px",
                  },
                  color: "#D9D9D9",
                }}
              >
                {option.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {option.subContents.map((item) => (
                  <Typography
                    key={item.title}
                    sx={{
                      fontSize: {
                        xs: "10px",
                        md: "12px",
                      },
                      color: "#9B9B9B",
                      cursor: "pointer",
                      "&:hover": { color: "#FFFFFF" },
                    }}
                    onClick={() => onClick(option.title, item.path)}
                  >
                    {item.title}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ bgcolor: "#D9D9D9", marginY: "24px" }} />
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: "light",
          fontSize: "12px",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        {`© ${new Date().getFullYear()} EmJay Garage. All rights reserved.`}
      </Typography>
    </Box>
  );
};
