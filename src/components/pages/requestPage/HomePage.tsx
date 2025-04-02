import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
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
import { tg } from "../../../main";

interface IRequest {
  id: number;
  manufacture_name: string;
  model_name: string;
  series_name: string;
  equipment_name: string;
  mileage_from: number;
  mileage_defore: number;
  price_from: number;
  price_defore: number;
  date_release_from: string;
  date_release_defor: string;
}

function HomePage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getRequest = async () => {
    try {
      const response = await fetch("https://api.a-b-d.ru/filter/{user_id}", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      });
      const res = await response.json();
      setRequests(res);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRequest = async (id: number) => {
    try {
      const response = await fetch(`https://api.a-b-d.ru/filter/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          auth: "abcd-1234",
          login: "admin",
        },
      });

      const data = await response.json();
      if (data.success) {
        // Успешное удаление
        setRequests((prev) => prev.filter((request) => request.id !== id));
        setSnackbarOpen(true);
      } else {
        console.log("Не удалось удалить запрос!");
      }
    } catch (err) {
      console.log("Произошла ошибка при удалении!", err);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const trailingActions = (id: number) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteRequest(id)}>
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            paddingBottom: "132px",
          }}
        >
          {requests.length === 0 ? (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "gray", marginTop: "20px" }}
            >
              У вас пока нет запросов.
            </Typography>
          ) : (
            <SwipeableList type={ListType.IOS}>
              {requests.map((request) => (
                <Box
                  key={request.id}
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
                          № {request.id}, {request.model_name}
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
                          Пробег: {request.mileage_from} км -{" "}
                          {request.mileage_defore} км
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
                          Год: {request.date_release_from?.slice(0, 4) || "N/A"}{" "}
                          -{" "}
                          {request?.date_release_defor?.slice(0, 4) ||
                            new Date().getFullYear()}
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
                          Цена: {request.price_from} ₩ - {request.price_defore}{" "}
                          ₩
                        </Typography>
                      </Stack>
                    </Paper>
                  </SwipeableListItem>
                </Box>
              ))}
            </SwipeableList>
          )}
        </Box>

        <Box
          sx={{
            position: "sticky",
            bottom: 56,
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Запрос успешно удален!
        </Alert>
      </Snackbar>
    </>
  );
}

export default HomePage;
