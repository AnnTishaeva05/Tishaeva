import { Container, IconButton, Typography } from "@mui/material";

export default function UserCard({ name, surname, company, onEdit, onDelete }) {
  return (
    <Container
      disableGutters
      sx={{
        width: 600,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1,
        px: 2,
        borderRadius: 1,
        border: 3,
        borderColor: "#F06292",
        "&:hover": {
          backgroundColor: "action.hover",
          "& .actions": {
            opacity: 1,
          },
        },
      }}
    >
      <Typography variant="body1">
        {name} {surname}, {company}
      </Typography>
    </Container>
  );
}
