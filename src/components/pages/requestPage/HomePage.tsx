import React from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import {
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  SwipeAction,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarIcon from "./image/calendar.png";
import CarIcon from "./image/car.png";
import CashIcon from "./image/cash.png";
import GraphIcon from "./image/graph.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [requests, setRequests] = React.useState([
    { id: 100, model: "Audi A3", mileage: "-", year: "-", price: "-" },
    { id: 101, model: "Audi A3", mileage: "-", year: "-", price: "-" },
  ]);

  const handleDelete = (id: number) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  const trailingActions = (id: number) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handleDelete(id)}>
        <Box
          sx={{
            backgroundColor: "#ff3a30",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "100%",
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
            boxShadow: "none",
          }}
        >
          <DeleteIcon />
        </Box>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        <SwipeableList type={ListType.IOS}>
          {requests.map((request, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "16px",
                marginBottom: "12px",
                height: "130px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "#ff3a30",
                  borderRadius: "16px",
                  zIndex: 0,
                }}
              />

              <SwipeableListItem
                trailingActions={trailingActions(request.id)}
                fullSwipe={false}
                maxSwipe={0.35}
                listType={ListType.IOS}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: "12px 16px",
                    borderRadius: "16px",
                    width: "100%",
                    boxSizing: "border-box",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Stack spacing={1} sx={{ fontFamily: "ABeeZee" }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={CarIcon}
                        alt="Car"
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      № {request.id}, {request.model}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={GraphIcon}
                        alt="Graph"
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      Пробег: {request.mileage}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={CalendarIcon}
                        alt="Calendar"
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      Год: {request.year}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={CashIcon}
                        alt="Cash"
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      Цена: {request.price}
                    </Typography>
                  </Stack>
                </Paper>
              </SwipeableListItem>
            </Box>
          ))}
        </SwipeableList>
      </Box>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          zIndex: 2,
        }}
      >
        <Button
          onClick={() => navigate("/add")}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontFamily: "Roboto" }}
        >
          + Добавить запрос
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
