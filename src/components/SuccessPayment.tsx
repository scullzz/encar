import { Typography, Button, Container, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SuccessPayment = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #e8f5e9, #ffffff)",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green", mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Платёж прошёл успешно!
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Спасибо за ваш платёж. Транзакция была завершена успешно.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => (window.location.href = "/")}
        >
          Вернуться на главную
        </Button>
      </Paper>
    </Container>
  );
};

export default SuccessPayment;
