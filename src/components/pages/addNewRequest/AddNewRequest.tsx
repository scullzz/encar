import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
} from "@mui/material";

interface Values {
  [key: string]: string;
}

export default function FilterComponent() {
  const [values, setValues] = useState<Values>({});

  const handleChange = (event: SelectChangeEvent<string>, name: string) => {
    setValues((prev) => ({ ...prev, [name]: event.target.value as string }));
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
      <FormControl fullWidth>
        <InputLabel>Производитель</InputLabel>
        <Select
          value={values["Производитель"] || ""}
          onChange={(e) => handleChange(e, "Производитель")}
          sx={{ borderRadius: "16px" }}
        >
          <MenuItem value="Toyota">Toyota</MenuItem>
          <MenuItem value="BMW">BMW</MenuItem>
          <MenuItem value="Audi">Audi</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Модель</InputLabel>
        <Select
          value={values["Модель"] || ""}
          onChange={(e) => handleChange(e, "Модель")}
          sx={{ borderRadius: "16px" }}
        >
          <MenuItem value="Corolla">Corolla</MenuItem>
          <MenuItem value="X5">X5</MenuItem>
          <MenuItem value="A6">A6</MenuItem>
        </Select>
      </FormControl>

      {/* Серия */}
      <FormControl fullWidth>
        <InputLabel>Серия</InputLabel>
        <Select
          value={values["Серия"] || ""}
          onChange={(e) => handleChange(e, "Серия")}
          sx={{ borderRadius: "16px" }}
        >
          <MenuItem value="Premium">Premium</MenuItem>
          <MenuItem value="Sport">Sport</MenuItem>
          <MenuItem value="Standard">Standard</MenuItem>
        </Select>
      </FormControl>

      {/* Комплектация */}
      <FormControl fullWidth>
        <InputLabel>Комплектация</InputLabel>
        <Select
          value={values["Комплектация"] || ""}
          onChange={(e) => handleChange(e, "Комплектация")}
          sx={{ borderRadius: "16px" }}
        >
          <MenuItem value="Luxury">Luxury</MenuItem>
          <MenuItem value="Comfort">Comfort</MenuItem>
          <MenuItem value="Basic">Basic</MenuItem>
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
          <MenuItem value="1.6L">1.6L</MenuItem>
          <MenuItem value="2.0L">2.0L</MenuItem>
          <MenuItem value="3.0L">3.0L</MenuItem>
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
          <MenuItem value="FWD">Передний</MenuItem>
          <MenuItem value="RWD">Задний</MenuItem>
          <MenuItem value="AWD">Полный</MenuItem>
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
          <MenuItem value="Red">Красный</MenuItem>
          <MenuItem value="Blue">Синий</MenuItem>
          <MenuItem value="White">Белый</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Пробег от (км)</InputLabel>
          <Select
            value={values["Пробег от (км)"] || ""}
            onChange={(e) => handleChange(e, "Пробег от (км)")}
            sx={{ borderRadius: "16px" }}
          >
            <MenuItem value="0">0</MenuItem>
            <MenuItem value="5000">5000</MenuItem>
            <MenuItem value="10000">10000</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Пробег до (км)</InputLabel>
          <Select
            value={values["Пробег до (км)"] || ""}
            onChange={(e) => handleChange(e, "Пробег до (км)")}
            sx={{ borderRadius: "16px" }}
          >
            <MenuItem value="20000">20000</MenuItem>
            <MenuItem value="50000">50000</MenuItem>
            <MenuItem value="100000">100000</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Цена */}
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

      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          padding: "12px 0",
          borderRadius: "16px",
        }}
      >
        Сохранить
      </Button>
    </Box>
  );
}
