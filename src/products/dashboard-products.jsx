import { Grid, Typography, Box } from "@mui/material";
import Card from "../products/card/product-card";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

export default function Dashboard() {
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
              onBuy={item.product}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
