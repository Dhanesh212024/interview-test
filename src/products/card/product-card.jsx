import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button } from "@mui/material";
import { getUserById } from "../../api/users";

export default function Card({ name, desc, price, discount, image }) {
  const navigate = useNavigate();
  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const freshUser = await getUserById(user.id);

      if (freshUser.kycStatus !== "approved") {
        alert("KYC is pending. Please wait for approval.");
        return;
      }

      navigate("/checkout");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  return (
    <Paper elevation={3} sx={{ borderRadius: 3 }}>
      <Box
        component="img"
        src={`${image}?auto=format&fit=crop&w=400&q=80`}
        alt={name}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover",
        }}
      />
      <Box p={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="success.main">
            {discount}% OFF
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {desc}
        </Typography>

        <Button variant="contained" fullWidth onClick={handleCheckout}>
          ₹{price}
        </Button>
      </Box>
    </Paper>
  );
}
