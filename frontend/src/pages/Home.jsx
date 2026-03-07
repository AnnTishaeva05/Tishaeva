import React from "react";
import { Box, Button, Container, FormControl } from "@mui/material";
import { TextField } from "@mui/material";

const styleButton = { backgroundColor: "DeepPink", margin: "0 12px" };

const styleTextField = {
  width: 300,
  "& .MuiInputBase-root": { height: 60, fontSize: "1.5 rem" },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "deeppink" },
  "& .MuiInputLabel-root.Mui-focused": { color: "deeppink" },
};

export default function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("АбраКадабра");
  };
  return (
    <>
      <Container
        sx={{
          paddingTop: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              width: 450,
              height: 500,
              borderRadius: 3,
              backgroundColor: "#eceff1",
              gap: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Имя пользователя"
              variant="outlined"
              sx={styleTextField}
            />
            <TextField
              label="Фамилия пользователя"
              variant="outlined"
              sx={styleTextField}
            />
            <TextField
              label="Компания"
              variant="outlined"
              sx={styleTextField}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={styleButton}
            >
              Сохранить
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}
