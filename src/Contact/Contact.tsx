import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { Variant } from "@mui/material/styles/createTypography";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
}

export default function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
  });
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  let variant: Variant | "inherit" = "h2";
  if (isXs) variant = "h4";
  if (isXs) variant = "h4";
  if (isSm) variant = "h3";
  if (isMd) variant = "h2";

  const handlePressSocial = (type: "facebook" | "tiktok") => {
    const url =
      type === "facebook"
        ? "https://www.facebook.com/kaizokuoautodeal"
        : "https://www.tiktok.com/@kaizokuoautodeal?_t=8l5DzkY0Wl5&_r=1";
    window.open(url, "_blank");
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAIL_JS_SERVICE_ID ?? "";
    const templateId = process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID ?? "";
    const publicKey = process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY ?? "";

    const emailTemplate = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: "Kaizoku-O Autodeal",
      contact_number: formData.phoneNumber,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, emailTemplate, publicKey).then(
      () => {
        setFormData(INITIAL_FORM_DATA)
        setSnackbar({
          isOpen: true,
          message: 'Thank you for your inquiry. We will get back to you shortly.'
        })
      },
      () => {
        setSnackbar({
          isOpen: true,
          message: 'Something when wrong. Please try again.'
         })
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
    <Box id="contact">
      <Box sx={{ backgroundColor: "whitesmoke", padding: 5 }}>
        <Typography variant={variant} align="center" gutterBottom>
          Contact Us
        </Typography>
        {/* Contact form fields */}
        <form onSubmit={sendEmail}>
          <Box display="flex" justifyContent="space-between" gap={2}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, width: "15%" }}
          >
            Send
          </Button>
        </form>
        <Box mt={4} display="flex" justifyContent="center">
          <IconButton
            aria-label="Facebook"
            onClick={() => handlePressSocial("facebook")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 256 256"
              width="40px"
              height="40px"
            >
              <g fill="#1e2127" fillRule="nonzero">
                <g transform="scale(5.12)">
                  <path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM37,19h-2c-2.14,0 -3,0.5 -3,2v3h5l-1,5h-4v15h-5v-15h-4v-5h4v-3c0,-4 2,-7 6,-7c2.9,0 4,1 4,1z"></path>
                </g>
              </g>
            </svg>
          </IconButton>
          <IconButton
            aria-label="Twitter"
            onClick={() => handlePressSocial("tiktok")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 256 256"
              width="40px"
              height="40px"
            >
              <g
                fill="#1e2127"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M41,4h-32c-2.757,0 -5,2.243 -5,5v32c0,2.757 2.243,5 5,5h32c2.757,0 5,-2.243 5,-5v-32c0,-2.757 -2.243,-5 -5,-5zM37.006,22.323c-0.227,0.021 -0.457,0.035 -0.69,0.035c-2.623,0 -4.928,-1.349 -6.269,-3.388c0,5.349 0,11.435 0,11.537c0,4.709 -3.818,8.527 -8.527,8.527c-4.709,0 -8.527,-3.818 -8.527,-8.527c0,-4.709 3.818,-8.527 8.527,-8.527c0.178,0 0.352,0.016 0.527,0.027v4.202c-0.175,-0.021 -0.347,-0.053 -0.527,-0.053c-2.404,0 -4.352,1.948 -4.352,4.352c0,2.404 1.948,4.352 4.352,4.352c2.404,0 4.527,-1.894 4.527,-4.298c0,-0.095 0.042,-19.594 0.042,-19.594h4.016c0.378,3.591 3.277,6.425 6.901,6.685z"></path>
                </g>
              </g>
            </svg>
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
      <Snackbar
          open={snackbar.isOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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
