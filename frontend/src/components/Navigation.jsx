import { Button, Container, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const styleButton = { backgroundColor: "DeepPink", margin: "0 12px" };

export default function Navigation() {
  return (
    <Container
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        height: "200%",
        paddingTop: 25,
      }}
    >
      <Button LinkComponent = {Link} to="/" variant="contained" size="large" sx={styleButton}>
        Первая страница
      </Button>
      <Button LinkComponent = {Link} to="/about" variant="contained" size="large" sx={styleButton}>
        Вторая страница
      </Button>
    </Container>
  );
}
