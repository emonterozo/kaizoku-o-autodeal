import {
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { firestore, storage } from "../config/firebase";

const INITIAL_FORM_DATA = {
  model: "",
  price: "",
  description: "",
  details: "",
  financingDetails: "",
  downpayment: "",
  isActive: true,
  isFeatured: false,
  isSold: false,
};

export default function Product() {
  const { productId, id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [images, setImages] = useState<any[]>([]);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
  });

  useEffect(() => {
    if (productId) {
      const productDocRef = doc(collection(firestore, "products"), productId);
      getDoc(productDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // Document exists, you can access its data
            const productData: any = docSnapshot.data();

            let resultString = "";

            if (productData.financing_details?.terms) {
              resultString = productData.financing_details?.terms
                // @ts-ignore
                .map(({ term, amount }) => `${term} ${amount}`)
                .join("\n");
            }

            setFormData({
              model: productData.name,
              price: productData.price.toString(),
              description: productData.headline.replace(/\\n/g, "\n"),
              details: productData.details.join("\n"),
              isActive: productData.is_active,
              isFeatured: productData.is_featured,
              isSold: productData.is_sold,
              financingDetails: resultString,
              downpayment: productData.financing_details.downpayment,
            });
            setImages(productData.images);
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  }, [productId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePressAdd = async () => {
    const result = formData.financingDetails.split("\n").map((line) => {
      const [term, amount] = line.split(" ").map(Number);
      return { term, amount };
    });
    const data = {
      name: formData.model,
      price: parseInt(formData.price),
      headline: formData.description,
      details: formData.details.split("\n"),
      images: images,
      is_active: formData.isActive,
      is_featured: formData.isFeatured,
      is_sold: formData.isSold,
      financing_details:
        formData.financingDetails.length > 0
          ? {
              downpayment: parseInt(formData.downpayment),
              terms: result,
            }
          : [],
    };
    console.log(data);

    if (productId) {
      try {
        const docRef = doc(firestore, "products", productId);
        await updateDoc(docRef, data);
        setSnackbar({
          isOpen: true,
          message: "Existing product successfully updated.",
        });
        navigate(`/admin/${id}`);
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: "Error ocurred updating the product.",
        });
      }
    } else {
      try {
        await addDoc(collection(firestore, "products"), data);
        setFormData(INITIAL_FORM_DATA);
        setImages([]);
        setSnackbar({
          isOpen: true,
          message: "New product successfully added.",
        });
      } catch (error) {
        console.log(error);
        setSnackbar({
          isOpen: true,
          message: "Error ocurred adding new product.",
        });
      }
    }
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const imagesHolder = [...images];

    const storageRef = ref(storage, Date.now().toString());
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      () => {
        setSnackbar({
          isOpen: true,
          message: "Error ocurred uploading product image.",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imagesHolder.push(downloadURL);
          setImages(imagesHolder);
          setSnackbar({
            isOpen: true,
            message: "Successfully uploaded product image.",
          });
        });
      }
    );
  };

  const handlePickImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleImageChange;
    input.click();
  };

  const handleDeleteImage = (index: number) => {
    const filteredArray = images.filter((_, i) => i === index);
    const desertRef = ref(storage, filteredArray[0]);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setSnackbar({
          isOpen: true,
          message: "Successfully deleted product image.",
        });
      })
      .catch(() => {
        setSnackbar({
          isOpen: true,
          message: "Error ocurred deleting product image.",
        });
      });
  };

  const handlePressDeleteProduct = async () => {
    if (productId) {
      try {
        const docRef = doc(firestore, "products", productId);
        await deleteDoc(docRef);
        images.forEach(async (image) => {
          await deleteObject(ref(storage, image));
        });

        setSnackbar({
          isOpen: true,
          message: "Successfully deleted the product.",
        });
        setTimeout(() => {
          navigate(`/admin/${id}`);
        }, 3000);
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: "Error ocurred deleting the product.",
        });
      }
    }
  };

  const toggleSwitch = (
    key: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [key]: event.target.checked,
    });
  };

  if (id === process.env.REACT_APP_ADMIN_KEY) {
    return (
      <Box component="main" p={5}>
        <Grid container spacing={2}>
          {/* Left column for images */}
          <Grid item xs={12} md={7}>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
              {images.map((image, index) => (
                <Box
                  key={index}
                  position="relative"
                  style={{
                    width: "100%",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    src={image}
                    alt="Uploaded"
                  />
                  <IconButton
                    style={{
                      backgroundColor: "#BE3012",
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                    }}
                    onClick={() => handleDeleteImage(index)}
                    aria-label="delete"
                  >
                    <ClearIcon style={{ color: "white" }} />
                  </IconButton>
                </Box>
              ))}
              <Button fullWidth sx={{ p: 0 }} onClick={handlePickImage}>
                <img
                  style={{
                    height: "auto",
                    marginBottom: 10,
                  }}
                  src={process.env.PUBLIC_URL + "/image-gallery.png"}
                  alt="upload"
                />
              </Button>
            </Box>
          </Grid>
          {/* Right column for product description */}
          <Grid item xs={12} md={5}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Switch
                checked={formData.isActive}
                onChange={(e) => toggleSwitch("isActive", e)}
              />
              <Typography variant="body1">Display</Typography>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Switch
                checked={formData.isFeatured}
                onChange={(e) => toggleSwitch("isFeatured", e)}
              />
              <Typography variant="body1">Featured</Typography>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Switch
                checked={formData.isSold}
                onChange={(e) => toggleSwitch("isSold", e)}
              />
              <Typography variant="body1">Sold</Typography>
            </Box>
            <TextField
              fullWidth
              label="Model"
              variant="outlined"
              margin="normal"
              name="model"
              value={formData.model}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    color: "black",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              margin="normal"
              name="price"
              value={formData.price}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    color: "black",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Details"
              variant="outlined"
              margin="normal"
              multiline
              rows={10}
              name="details"
              value={formData.details}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& textarea": {
                    color: "black",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& textarea": {
                    color: "black",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Downpayment"
              variant="outlined"
              margin="normal"
              multiline
              rows={10}
              name="downpayment"
              value={formData.downpayment}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& textarea": {
                    color: "black",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Financing Details"
              variant="outlined"
              margin="normal"
              multiline
              rows={10}
              name="financingDetails"
              value={formData.financingDetails}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& textarea": {
                    color: "black",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: 5 }}
          onClick={handlePressAdd}
        >
          {`${productId ? "Save" : "Add"} Product`}
        </Button>
        {productId && (
          <Button
            fullWidth
            variant="contained"
            color="error"
            size="large"
            sx={{ marginTop: 1 }}
            onClick={handlePressDeleteProduct}
          >
            Delete Product
          </Button>
        )}
        <Snackbar
          open={snackbar.isOpen}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
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
  } else {
    return <NotFoundPage />;
  }
}
