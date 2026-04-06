import { Grid, Typography, Box } from "@mui/material";
import Card from "./card/product-card";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../usercontext/context/authContext"; // adjust path if needed

export default function Dashboard() {
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();

      if (response.success) {
        setProducts(response.data);
      } else {
        console.error(response.message);
      }
    };
    fetchProducts();
  }, []);

const handleBuy = (id) => {
  if (!authenticated) {
    navigate("/login", { replace: true });
  } else {
    navigate(`/order/${id}`);
  }
};

  return (
    <Box p={3}>
      <Typography variant="h4"  mb={3} textAlign={"center"}>
        Dashboard
      </Typography>

      <Grid container spacing={6}  pl={6}>
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card
              name={item.name}
              desc={item.desc}
              price={item.price}
              discount={item.discount}
              image={item.image}
              onBuy={() => handleBuy(item.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
