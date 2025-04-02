import { Routes, Route } from "react-router-dom";
import useTelegramWebAppInit from "../utils/telegramInit";
import HomePage from "./pages/requestPage/HomePage";
import SubscriptionPage from "./pages/subPage/SubscriptionPage";
import ContactsPage from "./pages/contractPage/ContactsPage";
import Navigation from "./Navigation";
import AddNewRequest from "./pages/addNewRequest/AddNewRequest";
import { useEffect } from "react";
import SuccessPayment from "./SuccessPayment";
import { tg } from "../main";

function App() {
  useTelegramWebAppInit();
  const getUser = async () => {
    try {
      const response = await fetch("https://api.a-b-d.ru/test-telegram-auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      });

      const res = await response.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div style={{ height: "100%", overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddNewRequest />}></Route>
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/success" element={<SuccessPayment />}></Route>
        </Routes>
      </div>

      <Navigation />
    </div>
  );
}

export default App;
