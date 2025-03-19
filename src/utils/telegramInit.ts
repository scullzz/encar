import { useEffect } from "react";

function useTelegramWebAppInit() {
  useEffect(() => {
    const tg = Telegram?.WebApp;
    if (!tg) return;
    tg.expand();
    tg.MainButton?.setParams({ text: "Сохранить", color: "#229ED9" });
    tg.MainButton?.hide();
  }, []);
}
export default useTelegramWebAppInit;
