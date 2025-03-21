import { useEffect, useState } from "react";
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

  // Списки для селектов
  const [manufactury, setManufactury] = useState<IReferenceItem[]>([]);
  const [model, setModel] = useState<IReferenceItem[]>([]);
  const [series, setSeries] = useState<IReferenceItem[]>([]);
  const [complectation, setComplectation] = useState<IReferenceItem[]>([]);
  const [engine, setEngine] = useState<IReferenceItem[]>([]);
  const [drive, setDrive] = useState<IReferenceItem[]>([]);
  const [color, setColor] = useState<IReferenceItem[]>([]);

  // =========== FETCH ФУНКЦИИ ============
  const getManufacturers = async () => {
    try {
      const response = await fetch(
        "https://api.a-b-d.ru/references/manufactury",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: "123",
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
            auth: "123",
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
            auth: "123",
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
            auth: "123",
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
            auth: "123",
          },
        }
      );
      const res = await response.json();
      setEngine(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getDrive = async () => {
    try {
      const response = await fetch(
        `https://api.a-b-d.ru/references/driveType`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: "123",
          },
        }
      );
      const res = await response.json();
      setDrive(res);
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
          auth: "123",
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
    getDrive();
    getColor();
  }, []);

  // =========== ОБРАБОТЧИК SELECT'ОВ ============
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
          await getModel(Number(selectedId)); // переводим строку в number
          // Сбрасываем связанные поля
          setValues((prev) => ({
            ...prev,
            Модель: "",
            Серия: "",
            Комплектация: "",
            [field]: selectedId,
          }));
          setModel([]);
          setSeries([]);
          setComplectation([]);
        } else {
          setModel([]);
          setSeries([]);
          setComplectation([]);
        }
        break;

      case "Модель":
        if (!values["Производитель"]) {
          alert("Сначала выберите производителя");
          setValues((prev) => ({ ...prev, Модель: "" }));
          return;
        }
        if (selectedId) {
          await getSeriece(Number(selectedId));
          setValues((prev) => ({
            ...prev,
            Серия: "",
            Комплектация: "",
            [field]: selectedId,
          }));
          setSeries([]);
          setComplectation([]);
        } else {
          setSeries([]);
          setComplectation([]);
        }
        break;

      case "Серия":
        if (!values["Модель"]) {
          alert("Сначала выберите модель");
          setValues((prev) => ({ ...prev, Серия: "" }));
          return;
        }
        if (selectedId) {
          await getComplectation(Number(selectedId));
          setValues((prev) => ({
            ...prev,
            Комплектация: "",
            [field]: selectedId,
          }));
          setComplectation([]);
        } else {
          setComplectation([]);
        }
        break;

      default:
        break;
    }
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: e.target.value, // строка
    }));
  };

  const handleSave = async () => {
    const payload = {
      user_id: 123,
      manufacture_id: Number(values["Производитель"] || 0),
      model_id: Number(values["Модель"] || 0),
      series_id: Number(values["Серия"] || 0),
      equipment_id: Number(values["Комплектация"] || 0),
      engine_type_id: Number(values["Двигатель"] || 0),
      drive_type_id: Number(values["Привод"] || 0),
      car_color_id: Number(values["Цвет кузова"] || 0),
      mileage_from: Number(values["Пробег от (км)"] || 0),
      mileage_defore: Number(values["Пробег до (км)"] || 0),
      price_from: Number(values["Цена от ₩"] || 0),
      price_defore: Number(values["Цена до ₩"] || 0),

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
          auth: "123",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Успешно сохранён фильтр:", result);
    } catch (err) {
      console.error("Ошибка при сохранении фильтра", err);
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
      }}
    >
      {/* Производитель */}
      <FormControl fullWidth>
        <InputLabel>Производитель</InputLabel>
        <Select
          value={values["Производитель"] || ""}
          onChange={(e) => handleChange(e, "Производитель")}
          sx={{ borderRadius: "16px" }}
        >
          {manufactury.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Модель */}
      <FormControl fullWidth>
        <InputLabel>Модель</InputLabel>
        <Select
          disabled={!values["Производитель"]}
          value={values["Модель"] || ""}
          onChange={(e) => handleChange(e, "Модель")}
          sx={{ borderRadius: "16px" }}
        >
          {model.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Серия */}
      <FormControl fullWidth>
        <InputLabel>Серия</InputLabel>
        <Select
          disabled={!values["Модель"]}
          value={values["Серия"] || ""}
          onChange={(e) => handleChange(e, "Серия")}
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
        <InputLabel>Комплектация</InputLabel>
        <Select
          disabled={!values["Серия"]}
          value={values["Комплектация"] || ""}
          onChange={(e) => handleChange(e, "Комплектация")}
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
        <InputLabel>Двигатель</InputLabel>
        <Select
          value={values["Двигатель"] || ""}
          onChange={(e) => handleChange(e, "Двигатель")}
          sx={{ borderRadius: "16px" }}
        >
          {engine.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Привод */}
      <FormControl fullWidth>
        <InputLabel>Привод</InputLabel>
        <Select
          value={values["Привод"] || ""}
          onChange={(e) => handleChange(e, "Привод")}
          sx={{ borderRadius: "16px" }}
        >
          {drive.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Цвет кузова */}
      <FormControl fullWidth>
        <InputLabel>Цвет кузова</InputLabel>
        <Select
          value={values["Цвет кузова"] || ""}
          onChange={(e) => handleChange(e, "Цвет кузова")}
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
        <FormControl fullWidth>
          <InputLabel>Пробег от (км)</InputLabel>
          <Select
            value={values["Пробег от (км)"] || ""}
            onChange={(e) => handleChange(e, "Пробег от (км)")}
            sx={{ borderRadius: "16px" }}
          >
            <MenuItem value="0">0</MenuItem>
            <MenuItem value="5000">5 000</MenuItem>
            <MenuItem value="10000">10 000</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Пробег до (км)</InputLabel>
          <Select
            value={values["Пробег до (км)"] || ""}
            onChange={(e) => handleChange(e, "Пробег до (км)")}
            sx={{ borderRadius: "16px" }}
          >
            <MenuItem value="20000">20 000</MenuItem>
            <MenuItem value="50000">50 000</MenuItem>
            <MenuItem value="100000">100 000</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Цена от/до */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Цена от ₩</InputLabel>
          <Select
            value={values["Цена от ₩"] || ""}
            onChange={(e) => handleChange(e, "Цена от ₩")}
            sx={{ borderRadius: "16px" }}
          >
            <MenuItem value="1000000">1 000 000</MenuItem>
            <MenuItem value="2000000">2 000 000</MenuItem>
            <MenuItem value="3000000">3 000 000</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Цена до ₩</InputLabel>
          <Select
            value={values["Цена до ₩"] || ""}
            onChange={(e) => handleChange(e, "Цена до ₩")}
            sx={{ borderRadius: "16px" }}
          >
            <MenuItem value="5000000">5 000 000</MenuItem>
            <MenuItem value="10000000">10 000 000</MenuItem>
            <MenuItem value="20000000">20 000 000</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Даты выпуска (от/до) */}
      {/* Пример с обычными date- полями */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          label="Дата выпуска от"
          type="date"
          fullWidth
          value={values["date_release_from"] || ""}
          onChange={(e) => handleDateChange(e, "date_release_from")}
          InputLabelProps={{ shrink: true }} // чтобы лейбл не перекрывал
        />
        <TextField
          label="Дата выпуска до"
          type="date"
          fullWidth
          value={values["date_release_defor"] || ""}
          onChange={(e) => handleDateChange(e, "date_release_defor")}
          InputLabelProps={{ shrink: true }}
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
    </Box>
  );
}
