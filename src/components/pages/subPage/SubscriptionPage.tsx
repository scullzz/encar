import { Card, CardContent, Typography, Button } from "@mui/material";
import style from "./subscription.module.css";
import { useEffect, useState } from "react";

interface ITariff {
  id: number;
  name: string;
  description: string;
  days_count: number;
  price: number;
  filters_count: number;
  create_dttm: string;
  update_dttm: string;
}

interface ISubscription {
  id: number;
  user_id: number;
  tariff: ITariff;
  subscription_end: string;
  create_dttm: string;
  update_dttm: string;
}

function SubscriptionPage() {
  const tg = window.Telegram?.WebApp;
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [noSubscriptionMessage, setNoSubscriptionMessage] = useState<
    string | null
  >(null);
  const [tariffs, setTariffs] = useState<ITariff[]>([]);

  const getSubscription = async () => {
    try {
      const response = await fetch("https://api.a-b-d.ru/subscription/active", {
        method: "GET",
        headers: {
          accept: "application/json",
          auth: tg?.initData,
        },
      });
      if (!response.ok) {
        if (response.status === 404) {
          const res = await response.json();
          if (res.detail === "Подписка не найдена") {
            setNoSubscriptionMessage(
              "Подписка не найдена. Пожалуйста, оформите подписку."
            );
            setSubscription(null);
          }
        } else {
          console.error("Ошибка запроса подписки:", response.status);
        }
      } else {
        const data: ISubscription = await response.json();
        setSubscription(data);
        setNoSubscriptionMessage(null);
      }
    } catch (err) {
      console.error("Ошибка загрузки данных подписки:", err);
    }
  };

  const getTariffs = async () => {
    try {
      const response = await fetch("https://api.a-b-d.ru/tariffs/", {
        method: "GET",
        headers: {
          accept: "application/json",
          auth: tg?.initData,
        },
      });
      const data: ITariff[] = await response.json();
      setTariffs(data);
    } catch (err) {
      console.error("Ошибка получения тарифов:", err);
    }
  };

  const ActivateSubscription = async (id: number) => {
    try {
      const response = await fetch("https://api.a-b-d.ru/payhistory/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          auth: tg?.initData,
        },
        body: JSON.stringify({
          tariff_id: id,
          email: "testEmail",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const redirectUrl = data.payment_url;

        window.location.href = redirectUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSubscription();
    getTariffs();
  }, []);

  return (
    <div
      className={style.subscription_container}
      style={{ overflow: "hidden" }}
    >
      {noSubscriptionMessage && (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "gray", marginBottom: "12px" }}
        >
          {noSubscriptionMessage}
        </Typography>
      )}

      {subscription ? (
        <Card
          key={subscription.id}
          className={style.subscription_card}
          sx={{ borderRadius: "24px", marginBottom: "12px" }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Abeezee" }}
            >
              {subscription.tariff.name || "Название не указано"}
            </Typography>
            <Typography
              className={style.subscription_description}
              sx={{ fontFamily: "Abeezee" }}
            >
              {subscription.tariff.description || "Описание не указано"}
            </Typography>
            <Button
              variant="contained"
              color="success"
              className={style.MuiButton_containedSuccess}
              sx={{ textTransform: "none", borderRadius: 2, marginTop: "12px" }}
            >
              Активна до {subscription.subscription_end || "дата не указана"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        tariffs.map((tariff) => (
          <Card
            key={tariff.id}
            className={style.subscription_card}
            sx={{ borderRadius: "24px", marginBottom: "12px" }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontFamily: "Abeezee" }}
              >
                {tariff.name || "Без названия"}
              </Typography>
              <Typography
                className={style.subscription_description}
                sx={{ fontFamily: "Abeezee" }}
              >
                {tariff.description}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontFamily: "Abeezee" }}>
                Цена: {tariff.price} ₩ <br />
                Срок: {tariff.days_count} дней <br />
                Фильтров в месяц: {tariff.filters_count}
              </Typography>
              <Button
                onClick={() => ActivateSubscription(tariff.id)}
                variant="contained"
                color="primary"
                className={style.MuiButton_containedPrimary}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  marginTop: "12px",
                }}
              >
                Активировать
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default SubscriptionPage;
