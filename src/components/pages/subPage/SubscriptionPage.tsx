import { Card, CardContent, Typography, Button } from "@mui/material";
import style from "./subscription.module.css";
import { useEffect, useState } from "react";

interface IDetail {
  id: number;
  name: string;
  description: string;
  filter_count: number;
  subscription_end: string;
}

function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState<IDetail[]>([]);
  const [noSubscriptionMessage, setNoSubscriptionMessage] = useState<
    string | null
  >(null);

  const getSubscription = async () => {
    try {
      const response = await fetch(
        "https://api.a-b-d.ru/subscription/{user_id}",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: `123`,
          },
        }
      );
      const res = await response.json();

      if (res.detail === "Подписка не найдена") {
        setNoSubscriptionMessage(
          "Подписка не найдена. Пожалуйста, оформите подписку."
        );
        setSubscriptions([]);
      } else if (Array.isArray(res)) {
        setSubscriptions(res); // Если API возвращает массив
      } else if (res && typeof res === "object") {
        setSubscriptions([res]); // Если API возвращает объект, помещаем его в массив
      }
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
    }
  };

  useEffect(() => {
    getSubscription();
  }, []);

  return (
    <div className={style.subscription_container}>
      {noSubscriptionMessage && (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "gray", marginBottom: "12px" }}
        >
          {noSubscriptionMessage}
        </Typography>
      )}

      {subscriptions.map((sub) => (
        <Card
          key={sub.id}
          className={style.subscription_card}
          sx={{ borderRadius: "24px", marginBottom: "12px" }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Abeezee" }}
            >
              {sub.name || "Название не указано"}
            </Typography>

            <Typography
              className={style.subscription_description}
              sx={{ fontFamily: "Abeezee" }}
            >
              {sub.description || "Описание не указано"}
            </Typography>

            <Button
              variant="contained"
              color="success"
              className={style.MuiButton_containedSuccess}
              sx={{ textTransform: "none", borderRadius: 2, marginTop: "12px" }}
            >
              Активна до {sub.subscription_end || "дата не указана"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default SubscriptionPage;

{
  /* <Card className={style.subscription_card} sx={{ borderRadius: "24px" }}>
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
      </Card> */
}
