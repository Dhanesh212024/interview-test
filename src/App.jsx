import Router from "./router";
import Button from '@mui/material/Button';

export default function App() {
  return (
    <>
      <h1>Hello MUI</h1>
      <Button variant="contained" color="primary">
        Click Me
      </Button>

      <Router />

    </>
  );
}
