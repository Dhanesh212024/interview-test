import { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("order"));

    if (!data) {
      navigate("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(data);
  }, []);

  if (!order) return <Typography>Loading...</Typography>;

  const total = order.product.price * order.quantity;

  return (
    <Box display="flex" justifyContent="center" p={4}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: 400 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <ShoppingBagIcon color="primary" />
          <Typography variant="h5" fontWeight="bold">
            Order Placed
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6">{order.product.name}</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {order.product.desc}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CurrencyRupeeIcon fontSize="small" color="success" />
          <Typography>Price: ₹{order.product.price}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Inventory2Icon fontSize="small" color="action" />
          <Typography>Quantity: {order.quantity}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Total</Typography>

          <Box display="flex" alignItems="center">
            <CurrencyRupeeIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              {total}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
