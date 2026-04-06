import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useContext, useEffect, useState } from "react";
import { getProductById } from "../api/products";
import { AuthContext } from "../usercontext/context/authContext";

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(id);
      if (response.success) {
        setProduct(response.data);
      } else {
        console.error(response.message);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const totalPrice = product ? product.price * quantity : 0;

  const handleQuantityChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = 1;
    if (value > 5) value = 5;
    setQuantity(value);
  };

  const handleCheckout = () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (user.kycStatus !== "approved") {
      alert("KYC Status is still pending.");
      return;
    }
    const orderData = {
      product,
      quantity,
    };

    localStorage.setItem("order", JSON.stringify(orderData));
    navigate(`/checkout/${id}`);
  };

  return (
    <Box display="flex" justifyContent="center" p={4}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: 400 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <ShoppingCartIcon color="primary" />
          <Typography variant="h5" fontWeight="bold">
            Order Summary
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {product.desc}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <CurrencyRupeeIcon fontSize="small" color="success" />
          <Typography variant="body1">Price: ₹{product.price}</Typography>
        </Box>

        <Box mt={2}>
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={handleQuantityChange}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Total</Typography>
          <Box display="flex" alignItems="center">
            <CurrencyRupeeIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              {totalPrice}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<AddShoppingCartIcon />}
          sx={{ mt: 3, borderRadius: 2 }}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </Paper>
    </Box>
  );
}
