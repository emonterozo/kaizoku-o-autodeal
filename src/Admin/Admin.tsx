import {
    Box,
    Typography,
  } from "@mui/material";
  import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
  
  
  
export default function Admin() {
    const { id } = useParams();

    if (id === process.env.REACT_APP_ADMIN_KEY) {
        return (
            <Box component="main">
                <Typography>Welcome Admin</Typography>
            </Box>
        );
    } else {
        return <NotFoundPage />
    }
}
  