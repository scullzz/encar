import { useState } from "react";
import "./WheelDatePicker.css";

// Список годов и месяцев
const years = Array.from({ length: 21 }, (_, i) => `${2010 + i}`);
const months = Array.from({ length: 12 }, (_, i) =>
  `${i + 1}`.padStart(2, "0")
);

export default function WheelDatePicker({
  onChange,
  onCancel,
}: {
  onChange: (date: string) => void; // получим "YYYY-MM"
  onCancel: () => void;
}) {
  // По умолчанию можно поставить текущий год/месяц
  const now = new Date();
  const [year, setYear] = useState(String(now.getFullYear()));
  const [month, setMonth] = useState(
    String(now.getMonth() + 1).padStart(2, "0")
  );

  const handleSubmit = () => {
    // Only year-month
    onChange(`${year}-${month}`);
  };

  return (
    <div className="wheel-overlay">
      <div className="wheel-title">Выберите год и месяц</div>

      <div className="wheel-selectors">
        {/* Колонка с годами */}
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

        {/* Колонка с месяцами */}
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
