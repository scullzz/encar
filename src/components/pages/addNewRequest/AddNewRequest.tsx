import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { tg } from "../../../main";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WheelDatePicker from "./DateWheelPicker";

interface Values {
  [key: string]: string; // Всё храним как строки, включая даты
}

interface IReferenceItem {
  id: number;
  name: string;
  translated: string;
}

export default function FilterComponent() {
  const [values, setValues] = useState<Values>({});
  const nav = useNavigate();
  const [showWheelFrom, setShowWheelFrom] = useState(false);
  const [showWheelTo, setShowWheelTo] = useState(false);

  // Списки для селектов
  const [manufactury, setManufactury] = useState<IReferenceItem[]>([]);
  const [model, setModel] = useState<IReferenceItem[]>([]);
  const [series, setSeries] = useState<IReferenceItem[]>([]);
  const [complectation, setComplectation] = useState<IReferenceItem[]>([]);
  const [engine, setEngine] = useState<IReferenceItem[]>([]);
  const [driveType, setDriveType] = useState<IReferenceItem[]>([]);
  const [color, setColor] = useState<IReferenceItem[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // =========== FETCH ФУНКЦИИ ============
  const getManufacturers = async () => {
    try {
      const response = await fetch(
        "https://api.a-b-d.ru/references/manufactury",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: tg?.initData,
          },
        }
      );
      const res = await response.json();
      setManufactury(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getModel = async (manufacturyId: number) => {
    try {
      const response = await fetch(
        `https://api.a-b-d.ru/references/model/${manufacturyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: tg?.initData,
          },
        }
      );
      const res = await response.json();
      setModel(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getSeriece = async (modelId: number) => {
    try {
      const response = await fetch(
        `https://api.a-b-d.ru/references/series/${modelId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: tg?.initData,
          },
        }
      );
      const res = await response.json();
      setSeries(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getComplectation = async (seriesId: number) => {
    try {
      const response = await fetch(
        `https://api.a-b-d.ru/references/equipment/${seriesId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: tg?.initData,
          },
        }
      );
      const res = await response.json();
      setComplectation(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getEngine = async () => {
    try {
      const response = await fetch(
        `https://api.a-b-d.ru/references/engineType`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: tg?.initData,
          },
        }
      );
      const res = await response.json();
      setEngine(res);
    } catch (err) {
      console.log(err);
    }
  };

  // Новая функция для получения типов привода
  const getDriveType = async () => {
    try {
      const response = await fetch(
        `https://api.a-b-d.ru/references/driveType`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: tg?.initData,
          },
        }
      );
      const res = await response.json();
      setDriveType(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getColor = async () => {
    try {
      const response = await fetch(`https://api.a-b-d.ru/references/carColor`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      });
      const res = await response.json();
      setColor(res);
    } catch (err) {
      console.log(err);
    }
  };

  // Подгружаем часть справочников при первом рендере
  useEffect(() => {
    getManufacturers();
    getEngine();
    getDriveType();
    getColor();
  }, []);

  // =========== ОБРАБОТЧИКИ ВВОДА ============
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleChange = async (
    event: SelectChangeEvent<string>,
    field: string
  ) => {
    const selectedId = event.target.value; // строка

    // Записываем новое значение в values
    setValues((prev) => ({
      ...prev,
      [field]: selectedId,
    }));

    // Логика цепочек:
    switch (field) {
      case "Производитель":
        if (selectedId) {
          // Сбрасываем связанные поля
          setModel([]);
          setSeries([]);
          setComplectation([]);

          await getModel(Number(selectedId));
          setValues((prev) => ({
            ...prev,
            Производитель: selectedId,
            Модель: "",
            Серия: "",
            Комплектация: "",
          }));
        } else {
          setModel([]);
          setSeries([]);
          setComplectation([]);
          setValues((prev) => ({
            ...prev,
            Производитель: "",
            Модель: "",
            Серия: "",
            Комплектация: "",
          }));
        }
        break;

      case "Модель":
        if (!values["Производитель"]) {
          alert("Сначала выберите производителя");
          setValues((prev) => ({ ...prev, Модель: "" }));
          return;
        }
        if (selectedId) {
          setSeries([]);
          setComplectation([]);
          await getSeriece(Number(selectedId));
          setValues((prev) => ({
            ...prev,
            Модель: selectedId,
            Серия: "",
            Комплектация: "",
          }));
        } else {
          setSeries([]);
          setComplectation([]);
          setValues((prev) => ({
            ...prev,
            Модель: "",
            Серия: "",
            Комплектация: "",
          }));
        }
        break;

      case "Серия":
        if (!values["Модель"]) {
          alert("Сначала выберите модель");
          setValues((prev) => ({ ...prev, Серия: "" }));
          return;
        }
        if (selectedId) {
          setComplectation([]);
          await getComplectation(Number(selectedId));
          setValues((prev) => ({
            ...prev,
            Серия: selectedId,
            Комплектация: "",
          }));
        } else {
          setComplectation([]);
          setValues((prev) => ({
            ...prev,
            Серия: "",
            Комплектация: "",
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleSave = async () => {
    if (!values["Производитель"] || !values["Модель"] || !values["Серия"]) {
      setSnackbarMessage("Пожалуйста, заполните обязательные поля");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    const payload = {
      manufacture_id: values["Производитель"]
        ? Number(values["Производитель"])
        : null,
      model_id: values["Модель"] ? Number(values["Модель"]) : null,
      series_id: values["Серия"] ? Number(values["Серия"]) : null,
      equipment_id: values["Комплектация"]
        ? Number(values["Комплектация"])
        : null,
      engine_type_id: values["Двигатель"] ? Number(values["Двигатель"]) : null,
      drive_type_id: values["Тип привода"]
        ? Number(values["Тип привода"])
        : null,
      car_color_id: values["Цвет кузова"]
        ? Number(values["Цвет кузова"])
        : null,
      mileage_from: values["Пробег от (км)"]
        ? Number(values["Пробег от (км)"])
        : null,
      mileage_defore: values["Пробег до (км)"]
        ? Number(values["Пробег до (км)"])
        : null,
      price_from: values["Цена от ₩"] ? Number(values["Цена от ₩"]) : null,
      price_defore: values["Цена до ₩"] ? Number(values["Цена до ₩"]) : null,
      date_release_from: values["date_release_from"]
        ? new Date(values["date_release_from"]).toISOString()
        : null,
      date_release_defor: values["date_release_defor"]
        ? new Date(values["date_release_defor"]).toISOString()
        : null,
    };

    try {
      const response = await fetch("https://api.a-b-d.ru/filter/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.statusText}`);
      }

      setSnackbarMessage("Фильтр успешно сохранён!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      nav("/");
    } catch (err) {
      console.error("Ошибка при сохранении фильтра", err);
      setSnackbarMessage("Произошла ошибка при сохранении фильтра");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "24px",
        backgroundColor: "#f5f5f5",
        paddingBottom: "66px",
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Производитель (обязательное поле) */}
      <FormControl fullWidth required>
        <InputLabel id="manufacture-label">Производитель</InputLabel>
        <Select
          labelId="manufacture-label"
          id="manufacture-select"
          value={values["Производитель"] || ""}
          onChange={(e) => handleChange(e, "Производитель")}
          sx={{ borderRadius: "16px" }}
          label="Производитель"
        >
          {manufactury.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Модель (обязательное поле) */}
      <FormControl fullWidth required>
        <InputLabel id="model-label">Модель</InputLabel>
        <Select
          labelId="model-label"
          id="model-select"
          disabled={!values["Производитель"]}
          value={values["Модель"] || ""}
          onChange={(e) => handleChange(e, "Модель")}
          label="Модель"
          sx={{ borderRadius: "16px" }}
        >
          {model.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Серия (обязательное поле) */}
      <FormControl fullWidth required>
        <InputLabel id="series-label">Модельный год</InputLabel>
        <Select
          labelId="series-label"
          id="series-select"
          disabled={!values["Модель"]}
          value={values["Серия"] || ""}
          onChange={(e) => handleChange(e, "Серия")}
          label="Серия"
          sx={{ borderRadius: "16px" }}
        >
          {series.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Комплектация */}
      <FormControl fullWidth>
        <InputLabel id="complectation-label">Комплектация</InputLabel>
        <Select
          labelId="complectation-label"
          id="complectation-select"
          disabled={!values["Серия"]}
          value={values["Комплектация"] || ""}
          onChange={(e) => handleChange(e, "Комплектация")}
          label="Комплектация"
          sx={{ borderRadius: "16px" }}
        >
          {complectation.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Двигатель */}
      <FormControl fullWidth>
        <InputLabel id="engine-label">Двигатель</InputLabel>
        <Select
          labelId="engine-label"
          id="engine-select"
          value={values["Двигатель"] || ""}
          onChange={(e) => handleChange(e, "Двигатель")}
          label="Двигатель"
          sx={{ borderRadius: "16px" }}
        >
          {engine.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Тип привода (новое поле) */}
      <FormControl fullWidth>
        <InputLabel id="drive-label">Трансмиссия</InputLabel>
        <Select
          labelId="drive-label"
          id="drive-select"
          value={values["Тип привода"] || ""}
          onChange={(e) => handleChange(e, "Тип привода")}
          label="Тип привода"
          sx={{ borderRadius: "16px" }}
        >
          {driveType.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Цвет кузова */}
      <FormControl fullWidth>
        <InputLabel id="color-label">Цвет кузова</InputLabel>
        <Select
          labelId="color-label"
          id="color-select"
          value={values["Цвет кузова"] || ""}
          onChange={(e) => handleChange(e, "Цвет кузова")}
          label="Цвет кузова"
          sx={{ borderRadius: "16px" }}
        >
          {color.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Пробег от/до */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          id="mileage-from"
          label="Пробег от (км)"
          type="number"
          fullWidth
          value={values["Пробег от (км)"] || ""}
          onChange={(e) => handleInputChange(e, "Пробег от (км)")}
          sx={{ borderRadius: "16px" }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="mileage-to"
          label="Пробег до (км)"
          type="number"
          fullWidth
          value={values["Пробег до (км)"] || ""}
          onChange={(e) => handleInputChange(e, "Пробег до (км)")}
          sx={{ borderRadius: "16px" }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Цена от/до */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          id="price-from"
          label="Цена от ₩"
          type="number"
          fullWidth
          value={values["Цена от ₩"] || ""}
          onChange={(e) => handleInputChange(e, "Цена от ₩")}
          sx={{ borderRadius: "16px" }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="price-to"
          label="Цена до ₩"
          type="number"
          fullWidth
          value={values["Цена до ₩"] || ""}
          onChange={(e) => handleInputChange(e, "Цена до ₩")}
          sx={{ borderRadius: "16px" }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Даты выпуска */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          label="Дата выпуска от"
          value={values["date_release_from"] || ""}
          fullWidth
          onFocus={() => setShowWheelFrom(true)}
          sx={{ borderRadius: "16px" }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ readOnly: true }}
        />

        <TextField
          label="Дата выпуска до"
          value={values["date_release_defor"] || ""}
          fullWidth
          onFocus={() => setShowWheelTo(true)}
          sx={{ borderRadius: "16px" }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ readOnly: true }}
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          padding: "12px 0",
          borderRadius: "16px",
        }}
        onClick={handleSave}
      >
        Сохранить
      </Button>

      {showWheelFrom && (
        <WheelDatePicker
          onChange={(dateStr) => {
            setValues((prev) => ({ ...prev, date_release_from: dateStr }));
            setShowWheelFrom(false);
          }}
          onCancel={() => setShowWheelFrom(false)}
        />
      )}
      {showWheelTo && (
        <WheelDatePicker
          onChange={(dateStr) => {
            setValues((prev) => ({ ...prev, date_release_defor: dateStr }));
            setShowWheelTo(false);
          }}
          onCancel={() => setShowWheelTo(false)}
        />
      )}
    </Box>
  );
}
