import { Box, Container, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";

export default function UserCard({ id, name, surname, company, onEdit, onDelete }) {
  return (
    <Container
      disableGutters
      sx={{
        width: 600,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1,
        mt: 2,
        borderRadius: 1,
        border: 3,
        borderColor: "#F06292",
      }}
    >
      <Typography variant="body1" sx={{ pl: 2 }}>
        {name} {surname}, {company}
      </Typography>
      <Box className="actions" sx={{ display: "flex", gap: 1 }}>
        <IconButton color="default" onClick={() => onEdit(id)} aria-label="редактировать">
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(id)} color="error" aria-label="удалить">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Container>
  );
}