import "../styles/SettingsPage.scss";

import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import DataBaseDo from "../hooks/database";

const SettingsFields = () => {
  const DataBase = new DataBaseDo();
  const [modalState, setModalState] = useState({
    isActive: false,
    fieldData: null,
  });
  const [addModalState, setAddModalState] = useState(false);
  const [fields, setFields] = useState([{ ID: 0, Field_Name: "Загрузка..." }]);
  const [fieldTypes, setFieldTypes] = useState([
    {
      types: ["Квартира", "Дом", "Земля", "Коммерческая недвижимость", "*"],
    },
  ]);
  const [fieldStructureTypes, setFieldStructureTypes] = useState([
    {
      types: ["контакт", "объект недвижимости", "*"],
    },
  ]);
  useEffect(() => {
    DataBase.getData("https://ihor24.pythonanywhere.com/api/v1/fields/").then(
      (result) => {
        setFields(result);
      }
    );
  }, []);
  //   const addFieldType = fieldTypes.map((fieldType) => {
  //     return (
  //       <div className="field-type" key={fieldType.ID}>
  //         <select>
  //           {fieldType.types.map((type) => {
  //             return <option key={type}>{type}</option>;
  //           })}
  //         </select>
  //       </div>
  //     );
  //   });

  const handleClick = (fieldData) => (e) => {
    e.preventDefault();
    setModalState({ isActive: true, fieldData }); // Установка активного и данных поля
  };

  const handleSubmitField = (e, data) => {
    e.preventDefault();
    DataBase.sendData(data, "https://ihor24.pythonanywhere.com/api/v1/fields/");
  };

  const RenderFieldData = () => {
    const [formData, setFormData] = useState();

    if (!modalState.fieldData) return null;
    const {
      Field_Type,
      Field_Name,
      ID,
      Must_fill,
      Extra_Parameters,
      For_structure_type,
    } = modalState.fieldData;
    // Преобразование Extra_Parameters в элементы списка
    // const renderExtraParameters = (parameters) => {
    //   function CheckType(currentName, array) {
    //     // Убедимся, что currentTypes всегда является массивом
    //     const typesArray = Array.isArray(currentName)
    //       ? currentName
    //       : [currentName];
    //     const allTypes = array[0].types; // Получаем массив всех типов из первого объекта в fieldTypes

    //     // Фильтруем массив typesArray, оставляя только те значения, которые есть в allTypes
    //     const validTypes = typesArray.filter((type) => allTypes.includes(type));
    //     const addTypes = array[0].types.map((type) => {
    //       return <option key={type}>{type}</option>;
    //     });
    //     if (validTypes.length >= 0) {
    //       const litstTypes = validTypes.map((type) => {
    //         return (
    //           <div key={type}>
    //             {type} <button>Удалить</button>
    //           </div>
    //         );
    //       });
    //       return (
    //         <div>
    //           Текущий: {litstTypes}
    //           <div>
    //             Добавить:
    //             <select name="" id="">
    //               {addTypes}
    //             </select>
    //           </div>
    //         </div>
    //       );
    //     } // Если не найдено ни одного совпадения, возвращаем null
    //     return validTypes.length >= 0 ? validTypes : null; // Возвращаем массив с допустимыми типами или null, если таких нет
    //   }
    //   return Object.entries(parameters).map(([key, value]) => {
    //     // Проверка на массив

    //     if (Array.isArray(value)) {
    //       const elements = []; // Инициализируем массив для хранения элементов

    //       // Проверяем наличие ключа "For_object_type" и добавляем соответствующий элемент
    //       if (key === "For_object_type") {
    //         elements.push(
    //           <li key={`${key}-object`}>
    //             Для типов объектов: {CheckType(value, fieldTypes)}
    //           </li>
    //         );
    //       }

    //       // Проверяем наличие ключа "For_structure_type" и добавляем соответствующий элемент
    //       // if (For_structure_type != null) {
    //       //   const AddType = For_structure_type.map((type) => {
    //       //     return (
    //       //       <div key={type}>
    //       //         {type} <button>Удалить</button>
    //       //       </div>
    //       //     );
    //       //   });

    //       //   // Предполагая, что fieldStructureTypes[0] содержит массив типов, например ['type1', 'type2']
    //       //   const fieldStructureOptions = fieldStructureTypes[0].types.map(
    //       //     (type) => {
    //       //       return <option key={type}>{type}</option>;
    //       //     }
    //       //   );

    //       //   elements.push(
    //       //     <div>
    //       //       Для типов структур: Текущий: {AddType}
    //       //       <div>
    //       //         Добавить:
    //       //         <select name="" id="">
    //       //           {fieldStructureOptions}
    //       //         </select>
    //       //       </div>
    //       //     </div>
    //       //   );
    //       // }

    //       // Возвращаем элементы, обернутые в фрагмент, если массив не пустой
    //       return elements.length > 0 ? <>{elements}</> : null;
    //     }
    //     // Проверка на объект
    //     else if (typeof value === "object" && value !== null) {
    //       return (
    //         <li key={key}>
    //           {key}: {JSON.stringify(value)}
    //         </li>
    //       );
    //     }
    //     // Проверка на булево значение
    //     else if (typeof value === "boolean") {
    //       return (
    //         <li key={key}>
    //           {key}: {value ? "Да" : "Нет"}
    //         </li>
    //       );
    //     }
    //     // Для строк и чисел
    //     else if (typeof value === "string" || typeof value === "number") {
    //       const elements = [];
    //       if (key === "data_type") {
    //         elements.push(<li key={key}>Тип данных: {value}</li>);
    //       } else if (key === "input_type") {
    //         elements.push(<li key={key}>Тип ввода: {value}</li>);
    //       }
    //       return elements.length > 0 ? <>{elements}</> : null;
    //     }
    //     return null;
    //   });
    // };
    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   });
    // };
    const { For_object_type, List_values } = Extra_Parameters;
    // console.log(List_values);
    console.log(modalState.fieldData);
    return (
      <div id="modal-add-field">
        <p>Изменить поле</p>
        <form onSubmit={handleClick()}>
          <label htmlFor="field-type"> Тип поля: </label>
          <select
            name="field-type"
            id="field-type"
            defaultValue={Field_Type}
            // onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="list">Список</option>
            <option value="input">Поле значений</option>
          </select>
          <label htmlFor="field-name"> Название поля: </label>
          <input
            type="text"
            name="field-name"
            id="field-name"
            value={Field_Name}
            // onChange={(e) => setFieldName(e.target.value)}
          />
          <div>
            <label htmlFor="must-fill"> Обязательное поле: </label>
            <input
              type="checkbox"
              name="must-fill"
              id="must-fill"
              checked={Must_fill}
              // onChange={(e) => setMustFill(e.target.checked)}
            />
          </div>
          <label htmlFor="for-structure-type"> Для: </label>
          <select
            name="for-structure-type"
            id="for-structure-type"
            value={For_structure_type}
            // onChange={(e) => setForStructureType(e.target.value)}
          >
            <option value="">Всё</option>
            {/* <option value="">Аренды</option>
            <option value="">Ещё хуйня</option> */}
          </select>
          <p>Дополнительные параметры</p>

          {Field_Type === "list" ? (
            <div id="current-type-list">
              <div>
                <p>Для типов объектов:</p>
                <select
                  id="for-object-type"
                  // value={forObjectType}
                  // onChange={(e) => setForObjectType(e.target.value)}
                >
                  <option>*</option>
                  <option>Дом</option>
                  <option>Земля</option>
                  <option>Коммерческая недвижимость</option>
                </select>
              </div>
              <div>
                Лист значений:
                {List_values.map((input, i) => (
                  <div key={i}>
                    #{i + 1}
                    <input
                      type="text"
                      defaultValue={input}
                      // onChange={(e) => updateInput(input.id, e.target.value)}
                    />
                  </div>
                ))}
                <button>Добавить значение</button>
                <button>Удалить значение</button>
              </div>
            </div>
          ) : Field_Type === "input" ? (
            <div id="current-type-input">
              <div>
                <p>Для типов объектов:</p>
                <select
                  id="for-object-type"
                  // value={forObjectType}
                  // onChange={(e) => setForObjectType(e.target.value)}
                >
                  <option>*</option>
                  <option>Дом</option>
                  <option>Земля</option>
                  <option>Коммерческая недвижимость</option>
                </select>
              </div>
              <div>
                <label htmlFor="input-default-value">
                  Значение по умолчанию:
                </label>
                <input
                  // type={inputTypeValue}
                  id="input-default-value"
                  // value={inputDefaultValue}
                  // onChange={(e) => setInputDefaultValue(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="data_type">Тип данных:</label>
                <select
                  // value={inputTypeValue}
                  // onChange={(e) => setInputTypeValue(e.target.value)}
                  name="data_type"
                  id="data_type"
                >
                  <option value="text">Текст</option>
                  <option value="number">Число</option>
                  <option value="date">Дата</option>
                </select>
              </div>
              <div>
                <label htmlFor="input-type">Тип поля:</label>
                <select
                  name="input-type"
                  id="input-type"
                  // value={inputType}
                  // onChange={(e) => setInputType(e.target.value)}
                >
                  <option value="field">стандартное полее ввода</option>
                  <option value="textarea">
                    поле ввода изменяемого размера
                  </option>
                  <option value="contact_field">
                    поле для привязки контакта
                  </option>
                  <option value="dual_input">шо</option>
                </select>
              </div>
            </div>
          ) : null}
          <button type="submit">Изменить поле</button>
        </form>
      </div>
    );
  };
  const RenderAddField = () => {
    const [selectedValue, setSelectedValue] = useState("list");
    const [inputTypeValue, setInputTypeValue] = useState("text");
    const [inputs, setInputs] = useState([{ id: 0, value: "" }]);
    const [fieldName, setFieldName] = useState(""); // Добавлено состояние для названия поля
    const [mustFill, setMustFill] = useState(false); // Добавлено состояние для обязательного поля
    const [forStructureType, setForStructureType] = useState(""); // Добавлено состояние для типа структуры
    const [forObjectType, setForObjectType] = useState(["*"]); // Добавлено состояние для типа объекта
    const [inputDefaultValue, setInputDefaultValue] = useState(""); // Добавлено состояние для значения по умолчанию
    const [inputType, setInputType] = useState("field"); // Добавлено состояние для типа поля ввода

    const addInput = (e) => {
      e.preventDefault();
      setInputs([...inputs, { id: inputs.length, value: "" }]);
    };
    const removeInput = (e) => {
      e.preventDefault();

      if (inputs.length === 1) {
        return;
      } else if (inputs.length > 0) {
        setInputs(inputs.slice(0, inputs.length - 1));
      }
    };

    const updateInput = (id, newValue) => {
      const updatedInputs = inputs.map((input) => {
        if (input.id === id) {
          return { ...input, value: newValue };
        }
        return input;
      });
      setInputs(updatedInputs);
    };
    const handleClick = (fieldData) => (e) => {
      e.preventDefault();
      const createFormData = () => {
        const formData = {
          Basic_field: true,
          Extra_Parameters: {
            For_object_type: forObjectType,
          },
          Field_Name: fieldName,
          Field_Type: selectedValue,
          For_structure_type: ["*"],
          Must_fill: mustFill,
        };
        if (selectedValue === "input") {
          formData.Extra_Parameters = {
            ...formData.Extra_Parameters, // Копируем все текущие параметры

            // Default_value: inputDefaultValue,
            data_type: inputTypeValue,
            input_type: inputType,
          };
        } else if (selectedValue === "list") {
          formData.Extra_Parameters = {
            ...formData.Extra_Parameters, // Копируем все текущие параметры
            List_values: inputs.map((input) => input.value),
          };
        } else {
          console.error("Неизвестный тип поля");
        }

        return formData;
      };
      const data = createFormData();
      console.log([data]);
      DataBase.sendData(
        [data],
        "https://ihor24.pythonanywhere.com/api/v1/fields/"
      );
    };
    return (
      <div id="modal-add-field">
        <p>Добавить поле</p>
        <form onSubmit={handleClick()}>
          <label htmlFor="field-type"> Тип поля: </label>
          <select
            name="field-type"
            id="field-type"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="list">Список</option>
            <option value="input">Поле значений</option>
          </select>
          <label htmlFor="field-name"> Название поля: </label>
          <input
            type="text"
            name="field-name"
            id="field-name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
          />
          <div>
            <label htmlFor="must-fill"> Обязательное поле: </label>
            <input
              type="checkbox"
              name="must-fill"
              id="must-fill"
              checked={mustFill}
              onChange={(e) => setMustFill(e.target.checked)}
            />
          </div>
          <label htmlFor="for-structure-type"> Для: </label>
          <select
            name="for-structure-type"
            id="for-structure-type"
            value={forStructureType}
            onChange={(e) => setForStructureType(e.target.value)}
          >
            <option value="">Всё</option>
            {/* <option value="">Аренды</option>
            <option value="">Ещё хуйня</option> */}
          </select>
          <p>Дополнительные параметры</p>

          {selectedValue === "list" ? (
            <div id="current-type-list">
              <div>
                <p>Для типов объектов:</p>
                <select
                  id="for-object-type"
                  value={forObjectType}
                  onChange={(e) => setForObjectType(e.target.value)}
                >
                  <option>*</option>
                  <option>Дом</option>
                  <option>Земля</option>
                  <option>Коммерческая недвижимость</option>
                </select>
              </div>
              <div>
                Лист значений:
                {inputs.map((input) => (
                  <div key={input.id}>
                    #{input.id + 1}
                    <input
                      type="text"
                      value={input.value}
                      onChange={(e) => updateInput(input.id, e.target.value)}
                    />
                  </div>
                ))}
                <button onClick={addInput}>Добавить значение</button>
                <button onClick={removeInput}>Удалить значение</button>
              </div>
            </div>
          ) : selectedValue === "input" ? (
            <div id="current-type-input">
              <div>
                <p>Для типов объектов:</p>
                <select
                  id="for-object-type"
                  value={forObjectType}
                  onChange={(e) => setForObjectType(e.target.value)}
                >
                  <option>*</option>
                  <option>Дом</option>
                  <option>Земля</option>
                  <option>Коммерческая недвижимость</option>
                </select>
              </div>
              <div>
                <label htmlFor="input-default-value">
                  Значение по умолчанию:
                </label>
                <input
                  type={inputTypeValue}
                  id="input-default-value"
                  value={inputDefaultValue}
                  onChange={(e) => setInputDefaultValue(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="data_type">Тип данных:</label>
                <select
                  value={inputTypeValue}
                  onChange={(e) => setInputTypeValue(e.target.value)}
                  name="data_type"
                  id="data_type"
                >
                  <option value="text">Текст</option>
                  <option value="number">Число</option>
                  <option value="date">Дата</option>
                </select>
              </div>
              <div>
                <label htmlFor="input-type">Тип поля:</label>
                <select
                  name="input-type"
                  id="input-type"
                  value={inputType}
                  onChange={(e) => setInputType(e.target.value)}
                >
                  <option value="field">стандартное полее ввода</option>
                  <option value="textarea">
                    поле ввода изменяемого размера
                  </option>
                  <option value="contact_field">
                    поле для привязки контакта
                  </option>
                  <option value="dual_input">шо</option>
                </select>
              </div>
            </div>
          ) : null}
          <button type="submit">Добавить поле</button>
        </form>
      </div>
    );
  };
  const addField = fields.map((field) => {
    return (
      <div className="field" key={field.ID}>
        {/* <div className="field-name">{field.ID}</div> */}
        <div className="field-name">{field.Field_Name}</div>
        <div className="field-btn">
          <button onClick={handleClick(field)}>Изменить</button>
          <button>Удалить</button>
        </div>
      </div>
    );
  });

  return (
    <div id="settings-fields">
      <h1>
        Настройки полей
        <button
          onClick={() => {
            setAddModalState(true);
          }}
        >
          Добавить поле
        </button>
      </h1>
      {addField}
      <Modal
        active={modalState.isActive}
        setActive={(isActive) => setModalState({ ...modalState, isActive })}
      >
        {RenderFieldData()}
      </Modal>
      <Modal active={addModalState} setActive={() => setAddModalState(false)}>
        {RenderAddField()}
      </Modal>
    </div>
  );
};

export default SettingsFields;
