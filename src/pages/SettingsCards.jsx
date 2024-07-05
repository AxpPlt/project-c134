import React, { useState } from "react";

const SettingsCards = () => {
  const [formData, setFormData] = useState({
    ID: "",
    Field_Type: "",
    Field_Name: "",
    Must_Fill: false,
    Basic_field: false,
    For_object_type: "",
    For_structure_type: "",
    Extra_Parameters: "{}", // Инициализируется как строка, представляющая пустой объект
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка данных формы
    console.log(formData);
  };
  return (
    <div>
      <h1>Cards</h1>

      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="number"
            name="ID"
            value={formData.ID}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Тип поля:
          <input
            type="text"
            name="Field_Type"
            value={formData.Field_Type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Отображаемое имя:
          <input
            type="text"
            name="Field_Name"
            value={formData.Field_Name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Обязательность заполнения:
          <input
            type="checkbox"
            name="Must_Fill"
            checked={formData.Must_Fill}
            onChange={handleChange}
          />
        </label>
        <label>
          Является ли базовой структурой:
          <input
            type="checkbox"
            name="Basic_field"
            checked={formData.Basic_field}
            onChange={handleChange}
          />
        </label>
        <label>
          Для какого типа объектов поле:
          <input
            type="text"
            name="For_object_type"
            value={formData.For_object_type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Для какого типа записей поле:
          <input
            type="text"
            name="For_structure_type"
            value={formData.For_structure_type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Набор уникальных параметров, каждого типа поля (в формате JSON):
          <textarea
            name="Extra_Parameters"
            value={formData.Extra_Parameters}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default SettingsCards;
