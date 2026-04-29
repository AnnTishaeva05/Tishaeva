import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import {
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function About() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: 0,
    name: "",
    surname: "",
    company: "",
  });

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5013/profiles", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError("Сервер вернул не массив пользователей");
        }
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const onDeleteProfile = async (id) => {
    console.log(id);
    try {
      await fetch("http://localhost:5013/profiles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: id,
      });
      console.log("Удалено");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  const handleEditClick = (id) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditingUserId(id);
      setEditFormData({
        id: id,
        name: user.name,
        surname: user.surname,
        company: user.company,
      });
      setEditDialogOpen(true);
    }
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditingUserId(null);
    setEditFormData({ name: "", surname: "", company: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch("http://localhost:5013/profiles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }

      const updatedUser = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId ? { ...user, ...updatedUser } : user,
        ),
      );

      handleEditClose();
    } catch (error) {
      console.error("Ошибка ", error);
    }
  };

  if (error) return <div>Ошибка {error}</div>;
  if (!users.length) return <div>Нет пользователей</div>;

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            surname={user.surname}
            company={user.company}
            onDelete={onDeleteProfile}
            onEdit={handleEditClick}
          />
        ))}
      </div>

      <Dialog
        open={editDialogOpen}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Редактирование пользователя</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Имя"
            name="name"
            value={editFormData.name}
            onChange={handleEditChange}
            fullWidth
            variant="outlined"
            sx={{
              mb: 2,
              mt: 1,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "DeepPink",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "DeepPink",
              },
            }}
          />
          <TextField
            margin="dense"
            label="Фамилия"
            name="surname"
            value={editFormData.surname}
            onChange={handleEditChange}
            fullWidth
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "DeepPink",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "DeepPink",
              },
            }}
          />
          <TextField
            margin="dense"
            label="Компания"
            name="company"
            value={editFormData.company}
            onChange={handleEditChange}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "DeepPink",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "DeepPink",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} sx={{ color: "DeepPink" }}>
            Отмена
          </Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "DeepPink" }}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
