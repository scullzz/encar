import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

function ContactsPage() {
  return (
    <div
      style={{
        padding: "16px",
        fontFamily: "ABeeZee",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <List sx={{ backgroundColor: "#f9f9f9" }}>
        <ListItem
          sx={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            marginBottom: "8px",
            padding: "12px 16px",
            height: "54px",
          }}
        >
          <ListItemText
            primary="Наш telegram канал"
            sx={{ fontFamily: "Actor", fontSize: "16px" }}
          />
          <IconButton>
            <ChevronRight sx={{ color: "#007AFF" }} />
          </IconButton>
        </ListItem>
        <ListItem
          sx={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            padding: "12px 16px",
            height: "54px",
          }}
        >
          <ListItemText
            primary="Техническая поддержка"
            sx={{ fontFamily: "Actor", fontSize: "16px" }}
          />
          <IconButton>
            <ChevronRight sx={{ color: "#007AFF" }} />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
}

export default ContactsPage;
