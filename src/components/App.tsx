import { Routes, Route } from "react-router-dom";
import useTelegramWebAppInit from "../utils/telegramInit";
import Header from "./Header";
import HomePage from "./pages/requestPage/HomePage";
import SubscriptionPage from "./pages/subPage/SubscriptionPage";
import ContactsPage from "./pages/contractPage/ContactsPage";
import Navigation from "./Navigation";
import AddNewRequest from "./pages/addNewRequest/AddNewRequest";

function App() {
  useTelegramWebAppInit();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />

      <div style={{ flex: 1, overflow: "auto", paddingBottom: "56px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddNewRequest />}></Route>
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </div>

      <Navigation />
    </div>
  );
}

export default App;
