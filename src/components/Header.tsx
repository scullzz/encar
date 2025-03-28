// src/components/Header.tsx
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Header() {
  const tg = window.Telegram?.WebApp;

  const handleClose = () => {
    tg?.close();
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Toolbar
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <IconButton edge="start" onClick={handleClose}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
          Encar
        </Typography>

        <IconButton edge="end">
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
