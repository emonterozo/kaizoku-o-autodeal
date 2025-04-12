import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Grid,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import emailjs from "@emailjs/browser";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
  });

  const sendEmail = (e: any) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAIL_JS_SERVICE_ID ?? "";
    const templateId = process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID ?? "";
    const publicKey = process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY ?? "";

    const emailTemplate = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: "Emjay Garage",
      contact_number: formData.phoneNumber,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, emailTemplate, publicKey).then(
      () => {
        setFormData(INITIAL_FORM_DATA);
        setSnackbar({
          isOpen: true,
          message:
            "Thank you for your inquiry. We will get back to you shortly.",
        });
      },
      () => {
        setSnackbar({
          isOpen: true,
          message: "Something when wrong. Please try again.",
        });
      }
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Box
      id="contact"
      sx={{
        backgroundImage: 'url("/background-image.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          paddingX: "5%",
          paddingY: "5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
            width: {
              xs: "100%",
              md: "640px",
            },
          }}
        >
          <Typography
            color="#D9D9D9"
            sx={{
              fontSize: {
                xs: "14px",
                md: "16px",
              },
            }}
          >
            Let's Talk!
          </Typography>
          <Typography
            color="#D9D9D9"
            sx={{
              fontSize: {
                xs: "22px",
                md: "40px",
              },
            }}
          >
            Contact Us
          </Typography>
          <Typography
            color="#D9D9D9"
            sx={{
              fontFamily: "Poppins",
              fontWeight: "light",
              fontSize: {
                xs: "14px",
                md: "16px",
              },
              textAlign: "center",
            }}
          >
            Let us help you on what you want. <br />
            Fill out the following form and we will get back at you in the next
            24 hours.
          </Typography>
          <form onSubmit={sendEmail}>
            <Grid container spacing={3} sx={{ marginTop: "32px" }}>
              {/* Name & Phone Fields */}
              <Grid item xs={12} md={6}>
                <Typography color="#D9D9D9" sx={{ fontSize: "12px" }}>
                  Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography color="#D9D9D9" sx={{ fontSize: "12px" }}>
                  Phone
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  type="tel"
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12}>
                <Typography color="#D9D9D9" sx={{ fontSize: "12px" }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              {/* Message Field */}
              <Grid item xs={12}>
                <Typography color="#D9D9D9" sx={{ fontSize: "12px" }}>
                  Message
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  margin="normal"
                  name="message"
                  placeholder="Type your message.."
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} display="flex" justifyContent="start">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ width: "30%" }}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.isOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        ContentProps={{
          sx: { backgroundColor: "#4BB543", fontFamily: "Poppins" },
        }}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbar({
            isOpen: false,
            message: "",
          });
        }}
        message={snackbar.message}
      />
    </Box>
  );
}
