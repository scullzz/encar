import React, { useEffect, useState } from "react";
import {
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { tg } from "../../../main";
import { useNavigate } from "react-router-dom";
import WheelDatePicker from "./DateWheelPicker";

interface Values {
  [key: string]: string | string[];
}

interface IReferenceItem {
  id: number;
  name: string;
  translated: string;
}

// ограничение размеров выпадающих списков
const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
      width: 240,
    },
  },
};

export default function FilterComponent() {
  const [values, setValues] = useState<Values>({ Комплектация: [] });
  const [manufactury, setManufactury] = useState<IReferenceItem[]>([]);
  const [model, setModel] = useState<IReferenceItem[]>([]);
  const [series, setSeries] = useState<IReferenceItem[]>([]);
  const [complectation, setComplectation] = useState<IReferenceItem[]>([]);
  const [engine, setEngine] = useState<IReferenceItem[]>([]);
  const [driveType, setDriveType] = useState<IReferenceItem[]>([]);
  const [color, setColor] = useState<IReferenceItem[]>([]);
  const [showWheelFrom, setShowWheelFrom] = useState(false);
  const [showWheelTo, setShowWheelTo] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const nav = useNavigate();

  useEffect(() => {
    getManufacturers();
    getEngine();
    getDriveType();
    getColor();
  }, []);

  const formatMonthYear = (iso: string): string => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${year}`;
  };

  async function getManufacturers() {
    try {
      const res = await fetch("https://api.a-b-d.ru/references/manufactury", {
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }).then((r) => r.json());
      setManufactury(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function getModel(id: number) {
    try {
      const res = await fetch(`https://api.a-b-d.ru/references/model/${id}`, {
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }).then((r) => r.json());
      setModel(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function getSeriece(id: number) {
    try {
      const res = await fetch(`https://api.a-b-d.ru/references/series/${id}`, {
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }).then((r) => r.json());
      setSeries(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function getComplectation(id: number) {
    try {
      const res = await fetch(
        `https://api.a-b-d.ru/references/equipment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            auth: tg?.initData,
          },
        }
      ).then((r) => r.json());
      setComplectation(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function getEngine() {
    try {
      const res = await fetch(`https://api.a-b-d.ru/references/engineType`, {
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }).then((r) => r.json());
      setEngine(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDriveType() {
    try {
      const res = await fetch(`https://api.a-b-d.ru/references/driveType`, {
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }).then((r) => r.json());
      setDriveType(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function getColor() {
    try {
      const res = await fetch(`https://api.a-b-d.ru/references/carColor`, {
        headers: {
          "Content-Type": "application/json",
          auth: tg?.initData,
        },
      }).then((r) => r.json());
      setColor(res);
    } catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleChange = async (
    event: SelectChangeEvent<string>,
    field: string
  ) => {
    const selectedId = event.target.value;
    setValues((prev) => ({ ...prev, [field]: selectedId }));
    switch (field) {
      case "Производитель":
        setModel([]);
        setSeries([]);
        setComplectation([]);
        if (selectedId) {
          await getModel(Number(selectedId));
        }
        setValues((prev) => ({
          ...prev,
          Модель: "",
          Серия: "",
          Комплектация: [],
        }));
        break;
      case "Модель":
        setSeries([]);
        setComplectation([]);
        if (selectedId) {
          await getSeriece(Number(selectedId));
        }
        setValues((prev) => ({ ...prev, Серия: "", Комплектация: [] }));
        break;
      case "Серия":
        setComplectation([]);
        if (selectedId) {
          await getComplectation(Number(selectedId));
        }
        setValues((prev) => ({ ...prev, Комплектация: [] }));
        break;
    }
  };

  const handleMultiChange = (
    event: SelectChangeEvent<string[]>,
    field: string
  ) => {
    const arr = event.target.value as string[];
    setValues((prev) => ({ ...prev, [field]: arr }));
  };

  const handleSave = async () => {
    if (!values["Производитель"] || !values["Модель"] || !values["Серия"]) {
      setSnackbarMessage("Пожалуйста, заполните обязательные поля");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const stripZ = (iso: string) => iso.replace(/Z$/, "");

    const payload = {
      manufacture_id: Number(values["Производитель"] as string),
      model_id: Number(values["Модель"] as string),
      series_id: Number(values["Серия"] as string),
      equipment_ids: (values["Комплектация"] as string[]).map((v) => Number(v)),
      engine_type_id: values["Двигатель"]
        ? Number(values["Двигатель"] as string)
        : null,
      drive_type_id: values["Тип привода"]
        ? Number(values["Тип привода"] as string)
        : null,
      car_color_id: values["Цвет кузова"]
        ? Number(values["Цвет кузова"] as string)
        : null,
      mileage_from: values["Пробег от (км)"]
        ? Number(values["Пробег от (км)"] as string)
        : null,
      mileage_defore: values["Пробег до (км)"]
        ? Number(values["Пробег до (км)"] as string)
        : null,
      price_from: values["Цена от ₩"]
        ? Number(values["Цена от ₩"] as string)
        : null,
      price_defore: values["Цена до ₩"]
        ? Number(values["Цена до ₩"] as string)
        : null,
      date_release_from: values["date_release_from"]
        ? stripZ(new Date(values["date_release_from"] as string).toISOString())
        : null,
      date_release_defore: values["date_release_defore"]
        ? stripZ(
            new Date(values["date_release_defore"] as string).toISOString()
          )
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
      if (!response.ok) throw new Error(response.statusText);
      setSnackbarMessage("Фильтр успешно сохранён!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      nav("/");
    } catch (err) {
      console.error(err);
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

      {/* Производитель */}
      <FormControl fullWidth required>
        <InputLabel>Производитель</InputLabel>
        <Select<string>
          value={(values["Производитель"] as string) || ""}
          onChange={(e) => handleChange(e, "Производитель")}
          label="Производитель"
          MenuProps={menuProps}
          sx={{ borderRadius: 2 }}
        >
          {manufactury.map((i) => (
            <MenuItem key={i.id} value={String(i.id)}>
              {i.translated || i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Модель */}
      <FormControl fullWidth required>
        <InputLabel>Модель</InputLabel>
        <Select<string>
          value={(values["Модель"] as string) || ""}
          onChange={(e) => handleChange(e, "Модель")}
          disabled={!values["Производитель"]}
          label="Модель"
          MenuProps={menuProps}
          sx={{ borderRadius: 2 }}
        >
          {model.map((i) => (
            <MenuItem key={i.id} value={String(i.id)}>
              {i.translated || i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Модельный год */}
      <FormControl fullWidth required>
        <InputLabel>Модельный год</InputLabel>
        <Select<string>
          value={(values["Серия"] as string) || ""}
          onChange={(e) => handleChange(e, "Серия")}
          disabled={!values["Модель"]}
          label="Модельный год"
          MenuProps={menuProps}
          sx={{ borderRadius: 2 }}
        >
          {series.map((i) => (
            <MenuItem key={i.id} value={String(i.id)}>
              {i.translated || i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Комплектация */}
      <FormControl fullWidth>
        <InputLabel>Комплектация</InputLabel>
        <Select<string[]>
          multiple
          value={
            Array.isArray(values["Комплектация"])
              ? (values["Комплектация"] as string[])
              : []
          }
          onChange={(e) => handleMultiChange(e, "Комплектация")}
          renderValue={(selected) =>
            (selected as string[])
              .map((v) => {
                const it = complectation.find((x) => String(x.id) === v);
                return it?.translated || it?.name || v;
              })
              .join(", ")
          }
          label="Комплектация"
          MenuProps={menuProps}
          sx={{ borderRadius: 2 }}
        >
          {complectation.map((i) => (
            <MenuItem key={i.id} value={String(i.id)}>
              {i.translated || i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Двигатель */}
      <FormControl fullWidth>
        <InputLabel id="engine-label">Двигатель</InputLabel>
        <Select<string>
          labelId="engine-label"
          value={(values["Двигатель"] as string) || ""}
          onChange={(e) => handleChange(e, "Двигатель")}
          label="Двигатель"
          MenuProps={menuProps}
          sx={{ borderRadius: 2 }}
        >
          {engine.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Трансмиссия */}
      <FormControl fullWidth>
        <InputLabel id="drive-label">Трансмиссия</InputLabel>
        <Select<string>
          labelId="drive-label"
          value={(values["Тип привода"] as string) || ""}
          onChange={(e) => handleChange(e, "Тип привода")}
          label="Тип привода"
          MenuProps={menuProps}
          sx={{ borderRadius: 2 }}
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
        <Select<string>
          labelId="color-label"
          value={(values["Цвет кузова"] as string) || ""}
          onChange={(e) => handleChange(e, "Цвет кузова")}
          label="Цвет кузова"
          MenuProps={menuProps}
          sx={{ borderRadius: 2 }}
        >
          {color.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.translated || item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Пробег от/до и Цена от/до */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          label="Пробег от (км)"
          type="number"
          fullWidth
          value={values["Пробег от (км)"] || ""}
          onChange={(e) => handleInputChange(e, "Пробег от (км)")}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Пробег до (км)"
          type="number"
          fullWidth
          value={values["Пробег до (км)"] || ""}
          onChange={(e) => handleInputChange(e, "Пробег до (км)")}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          label="Цена от ₩"
          type="number"
          fullWidth
          value={values["Цена от ₩"] || ""}
          onChange={(e) => handleInputChange(e, "Цена от ₩")}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Цена до ₩"
          type="number"
          fullWidth
          value={values["Цена до ₩"] || ""}
          onChange={(e) => handleInputChange(e, "Цена до ₩")}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Даты выпуска */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          label="Дата выпуска от"
          value={
            values["date_release_from"]
              ? formatMonthYear(values["date_release_from"] as string)
              : ""
          }
          fullWidth
          onFocus={() => setShowWheelFrom(true)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ readOnly: true }}
        />
        <TextField
          label="Дата выпуска до"
          value={
            values["date_release_defore"]
              ? formatMonthYear(values["date_release_defore"] as string)
              : ""
          }
          fullWidth
          onFocus={() => setShowWheelTo(true)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ readOnly: true }}
        />
      </Box>

      {/* Кнопка Сохранить */}
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

      {/* Колёса выбора дат */}
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
            setValues((prev) => ({ ...prev, date_release_defore: dateStr }));
            setShowWheelTo(false);
          }}
          onCancel={() => setShowWheelTo(false)}
        />
      )}
    </Box>
  );
}
