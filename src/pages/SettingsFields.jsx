import "../styles/SettingsPage.scss";

import { useState } from "react";
import Modal from "../components/Modal/Modal";
const SettingsFields = () => {
  const [modalState, setModalState] = useState({
    isActive: false,
    fieldData: null,
  });
  const [fields, setFields] = useState([
    {
      Basic_field: true,
      Extra_Parameters: {
        For_object_type: ["*"],
        List_values: ["Квартира", "Дом", "Земля", "Коммерческая недвижимость"],
      },
      Field_Name: "Тип объекта",
      Field_Type: "list",
      For_structure_type: ["*"],
      ID: 1,
      Must_fill: true,
    },
    {
      Basic_field: true,
      Extra_Parameters: {
        For_object_type: ["Квартира", "Дом"],
        data_type: "text",
        input_type: "field",
      },
      Field_Name: "Название объекта",
      Field_Type: "input",
      For_structure_type: ["*", "контакт"],
      ID: 2,
      Must_fill: true,
    },
  ]);
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
  function CheckType(currentName, array) {
    // Убедимся, что currentTypes всегда является массивом
    const typesArray = Array.isArray(currentName) ? currentName : [currentName];
    const allTypes = array[0].types; // Получаем массив всех типов из первого объекта в fieldTypes

    // Фильтруем массив typesArray, оставляя только те значения, которые есть в allTypes
    const validTypes = typesArray.filter((type) => allTypes.includes(type));
    const addTypes = array[0].types.map((type) => {
      return <option key={type}>{type}</option>;
    });
    if (validTypes.length >= 0) {
      const litstTypes = validTypes.map((type) => {
        return (
          <div key={type}>
            {type} <button>Удалить</button>
          </div>
        );
      });
      return (
        <div>
          Текущий: {litstTypes}
          <div>
            Добавить:
            <select name="" id="">
              {addTypes}
            </select>
          </div>
        </div>
      );
    } // Если не найдено ни одного совпадения, возвращаем null
    return validTypes.length >= 0 ? validTypes : null; // Возвращаем массив с допустимыми типами или null, если таких нет
  }
  const handleClick = (fieldData) => (e) => {
    e.preventDefault();
    setModalState({ isActive: true, fieldData }); // Установка активного и данных поля
  };
  const RenderFieldData = () => {
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
    const renderExtraParameters = (parameters) => {
      return Object.entries(parameters).map(([key, value]) => {
        // Проверка на массив

        if (Array.isArray(value)) {
          const elements = []; // Инициализируем массив для хранения элементов

          // Проверяем наличие ключа "For_object_type" и добавляем соответствующий элемент
          if (key === "For_object_type") {
            elements.push(
              <li key={`${key}-object`}>
                Для типов объектов: {CheckType(value, fieldTypes)}
              </li>
            );
          }

          // Проверяем наличие ключа "For_structure_type" и добавляем соответствующий элемент
          if (For_structure_type != null) {
            const AddType = For_structure_type.map((type) => {
              return (
                <div key={type}>
                  {type} <button>Удалить</button>
                </div>
              );
            });

            // Предполагая, что fieldStructureTypes[0] содержит массив типов, например ['type1', 'type2']
            const fieldStructureOptions = fieldStructureTypes[0].types.map(
              (type) => {
                return <option key={type}>{type}</option>;
              }
            );

            elements.push(
              <div>
                Для типов структур: Текущий: {AddType}
                <div>
                  Добавить:
                  <select name="" id="">
                    {fieldStructureOptions}
                  </select>
                </div>
              </div>
            );
          }

          // Возвращаем элементы, обернутые в фрагмент, если массив не пустой
          return elements.length > 0 ? <>{elements}</> : null;
        }
        // Проверка на объект
        else if (typeof value === "object" && value !== null) {
          return (
            <li key={key}>
              {key}: {JSON.stringify(value)}
            </li>
          );
        }
        // Проверка на булево значение
        else if (typeof value === "boolean") {
          return (
            <li key={key}>
              {key}: {value ? "Да" : "Нет"}
            </li>
          );
        }
        // Для строк и чисел
        else if (typeof value === "string" || typeof value === "number") {
          const elements = [];
          if (key === "data_type") {
            elements.push(<li key={key}>Тип данных: {value}</li>);
          } else if (key === "input_type") {
            elements.push(<li key={key}>Тип ввода: {value}</li>);
          }
          return elements.length > 0 ? <>{elements}</> : null;
        }
        return null;
      });
    };

    return (
      <div>
        <div className="field-name">
          Название поля:
          <input type="text" placeholder={`${Field_Name}`} />
        </div>
        <div className="field-name">ID: {ID}</div>
        <div className="field-name">Тип поля: {Field_Type}</div>
        <div className="field-name">
          Обязательное поле:
          <input type="checkbox" defaultChecked={Must_fill} />
        </div>
        <div className="field-name">
          Дополнительные параметры:
          <ul>{renderExtraParameters(Extra_Parameters)}</ul>
        </div>
        <button>Сохранить</button>
      </div>
    );
  };
  const addField = fields.map((field) => {
    return (
      <div className="field" key={field.ID}>
        <div className="field-name">{field.ID}</div>
        <div className="field-name">{field.Field_Name}</div>
        <button onClick={handleClick(field)}>Изменить</button>
        <button>Удалить</button>
      </div>
    );
  });

  return (
    <div id="settings-fields">
      <h1>Настройки полей</h1>
      {addField}
      <Modal
        active={modalState.isActive}
        setActive={(isActive) => setModalState({ ...modalState, isActive })}
      >
        {RenderFieldData()}
      </Modal>
    </div>
  );
};

export default SettingsFields;
