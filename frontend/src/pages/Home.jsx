import React, { useState } from "react";
import { Button, Container, FormControl } from "@mui/material";
import { TextField } from "@mui/material";

const styleButton = { backgroundColor: "DeepPink", margin: "0 12px" };
const styleTextField = {
  width: 300,
  "& .MuiInputBase-root": { height: 60, fontSize: "1.5rem" },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "deeppink" },
  "& .MuiInputLabel-root.Mui-focused": { color: "deeppink" },
};

export default function Home() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [company, setCompany] = useState("");

  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [companyError, setCompanyError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError) setNameError("");
  };
  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
    if (surnameError) setSurnameError("");
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
    if (companyError) setCompanyError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setNameError("");
    setSurnameError("");
    setCompanyError("");

    let isValid = true;

    if (!name.trim()) {
      setNameError("Имя должно быть заполнено");
      isValid = false;
    } else if (name.length < 3) {
      setNameError("Имя должно содержать минимум 3 символа");
      isValid = false;
    }

    if (!surname.trim()) {
      setSurnameError("Фамилия должна быть заполнена");
      isValid = false;
    } else if (surname.length < 3) {
      setSurnameError("Фамилия должна содержать минимум 3 символа");
      isValid = false;
    }

    if (!company.trim()) {
      setCompanyError("Компания должна быть заполнена");
      isValid = false;
    }

    if (!isValid) return;

    try {
      await fetch("http://localhost:5013/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, company }),
      });
      console.log("Отправлено");

      setName ("");
      setSurname("");
      setCompany("");
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  return (
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
            value={name}
            onChange={handleNameChange}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            label="Фамилия пользователя"
            variant="outlined"
            sx={styleTextField}
            value={surname}
            onChange={handleSurnameChange}
            error={!!surnameError}
            helperText={surnameError}
          />
          <TextField
            label="Компания"
            variant="outlined"
            sx={styleTextField}
            value={company}
            onChange={handleCompanyChange}
            error={!!companyError}
            helperText={companyError}
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
  );
}
