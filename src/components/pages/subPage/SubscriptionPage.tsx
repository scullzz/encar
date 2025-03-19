// src/pages/SubscriptionPage.tsx
import { Card, CardContent, Typography, Button } from "@mui/material";
import style from "./subscription.module.css";

function SubscriptionPage() {
  return (
    <div className={style.subscription_container}>
      <Card className={style.subscription_card} sx={{ borderRadius: "24px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: "Abeezee" }}>
            Название подписки
          </Typography>
          <Typography
            className={style.subscription_description}
            sx={{ fontFamily: "Abeezee" }}
          >
            • описание ограничений подписки...
          </Typography>

          <Button
            variant="contained"
            color="success"
            className={style.MuiButton_containedSuccess}
            sx={{ textTransform: "none", borderRadius: 2, marginTop: "12px" }}
          >
            Активна до 13.04.2025
          </Button>
        </CardContent>
      </Card>

      <Card className={style.subscription_card} sx={{ borderRadius: "24px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: "Abeezee" }}>
            Название подписки
          </Typography>
          <Typography
            className={style.subscription_description}
            sx={{ fontFamily: "Abeezee" }}
          >
            • описание ограничений подписки...
          </Typography>

          <Typography variant="body2" sx={{ mb: 1, fontFamily: "Abeezee" }}>
            Цена: 1250 руб <br />
            Срок подписки: 1 месяц
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={style.MuiButton_containedPrimary}
            sx={{ textTransform: "none", borderRadius: 2, marginTop: "12px" }}
          >
            Активировать
          </Button>
        </CardContent>
      </Card>

      <Card className={style.subscription_card} sx={{ borderRadius: "24px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: "Abeezee" }}>
            Название подписки
          </Typography>
          <Typography
            className={style.subscription_description}
            sx={{ fontFamily: "Abeezee" }}
          >
            • описание ограничений подписки...
          </Typography>

          <Typography variant="body2" sx={{ mb: 1, fontFamily: "Abeezee" }}>
            Цена: 1250 руб <br />
            Срок подписки: 1 месяц
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={style.MuiButton_containedPrimary}
            sx={{ textTransform: "none", borderRadius: 2, marginTop: "12px" }}
          >
            Активировать
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default SubscriptionPage;
