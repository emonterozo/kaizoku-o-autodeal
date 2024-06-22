import {
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  TextField,
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

            setFormData({
              model: productData.name,
              price: productData.price.toString(),
              description: productData.description.replace(/\\n/g, "\n"),
              details: productData.details.join("\n"),
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
    const data = {
      name: formData.model,
      price: parseInt(formData.price),
      description: formData.description,
      details: formData.details.split("\n"),
      images: images,
    };

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
            <TextField
              fullWidth
              label="Model"
              variant="outlined"
              margin="normal"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              margin="normal"
              name="price"
              value={formData.price}
              onChange={handleChange}
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
