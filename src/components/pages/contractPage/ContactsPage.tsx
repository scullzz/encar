import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { tg } from "../../../main";
interface Item {
  title: string;
  url: string;
  sequence_number: number;
}

function ContactsPage() {
  const [contracts, setContracts] = useState<Item[]>([]);

  const getContracts = async () => {
    try {
      const response = await fetch("https://api.a-b-d.ru/contact/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      });
      const res = await response.json();
      console.log(res);
      setContracts(res);
    } catch (err) {
      console.error("Error fetching contracts:", err);
    }
  };

  useEffect(() => {
    getContracts();
  }, []);

  return (
    <div
      style={{
        padding: "16px",
        fontFamily: "Roboto",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        paddingBottom: "66px",
      }}
    >
      {contracts.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "gray", marginTop: "20px" }}
        >
          Контактов на данный момент нет.
        </Typography>
      ) : (
        <List sx={{ backgroundColor: "#f9f9f9" }}>
          {contracts.map((contract) => (
            <ListItem
              key={contract.sequence_number}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "24px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                marginBottom: "8px",
                padding: "12px 16px",
                height: "54px",
              }}
              onClick={() => window.open(contract.url, "_blank")}
            >
              <ListItemText
                primary={contract.title}
                sx={{ fontFamily: "Actor", fontSize: "16px" }}
              />
              <IconButton>
                <ChevronRight sx={{ color: "#007AFF" }} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default ContactsPage;
