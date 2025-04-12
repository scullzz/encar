import { useState, useEffect } from "react";
import "./WheelDatePicker.css";

const years = Array.from({ length: 50 }, (_, i) => `${1980 + i}`);
const months = Array.from({ length: 12 }, (_, i) =>
  `${i + 1}`.padStart(2, "0")
);

export default function WheelDatePicker({
  onChange,
  onCancel,
}: {
  onChange: (date: string) => void;
  onCancel: () => void;
}) {
  const [year, setYear] = useState("2000");
  const [month, setMonth] = useState("01");

  // Дефолтное значение дня — первое число
  const [day, setDay] = useState("01");

  useEffect(() => {
    // При изменении месяца сбрасываем день на 01
    setDay("01");
  }, [month]);

  const handleSubmit = () => {
    onChange(`${day}/${month}/${year}`); // формат dd/mm/yyyy
  };

  return (
    <div className="wheel-overlay">
      <div className="wheel-title">Выберите дату</div>

      <div className="wheel-selectors">
        <div className="wheel-column">
          <div className="wheel-label">Год</div>
          <div className="wheel-inner">
            {years.map((y) => (
              <div
                key={y}
                className={`wheel-item ${y === year ? "selected" : ""}`}
                onClick={() => setYear(y)}
              >
                {y}
              </div>
            ))}
          </div>
        </div>

        <div className="wheel-column">
          <div className="wheel-label">Месяц</div>
          <div className="wheel-inner">
            {months.map((m) => (
              <div
                key={m}
                className={`wheel-item ${m === month ? "selected" : ""}`}
                onClick={() => setMonth(m)}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wheel-buttons">
        <button className="cancel" onClick={onCancel}>
          Отмена
        </button>
        <button className="ok" onClick={handleSubmit}>
          ОК
        </button>
      </div>
    </div>
  );
}
