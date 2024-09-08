const headerData = ["ID", "Name", "Gender", "DOB", "City", "Actions"];

class Student {
  #data;
  constructor(id, name, gender, dob, city) {
    this.#data = { id, name, gender, dob, city };
  }

  getData() {
    return { ...this.#data };
  }

  modifyData(newData) {
    this.#data = { ...this.#data, ...newData };
  }

  deleteData() {
    this.#data = {
      id: null,
      name: null,
      gender: null,
      dob: null,
      city: null,
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add_student");

  const loadLocalStorage = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    return students.map(
      (s) => new Student(s.id, s.name, s.gender, s.dob, s.city)
    );
  };

  const studentList = loadLocalStorage();


  const saveLocalStorage = () => {
    const data = studentList.map((student) => student.getData());
    localStorage.setItem("students", JSON.stringify(data));
  };

  const handleCreateStudent = (data) => {
    studentList.push(
      new Student(data.id, data.name, data.gender, data.dob, data.city)
    );
    saveLocalStorage(); 
    renderTable(); 
  };

  const handleEditStudent = (data) => {
    const student = studentList.find(
      (student) => student.getData().id === data.id
    );
    if (student) {
      student.modifyData(data);
      saveLocalStorage(); 
      renderTable(); 
    }
  };

  const handleDeleteStudent = (id) => {
    const studentIndex = studentList.findIndex(
      (student) => student.getData().id === id
    );
    if (studentIndex !== -1) {
      studentList.splice(studentIndex, 1);
      saveLocalStorage();
      renderTable();
    }
  };

  const createTableElement = (tag, content = null) => {
    const element = document.createElement(tag);
    if (content) element.textContent = content;
    return element;
  };

  const renderTable = () => {
    const tableContainer = document.getElementById("student_container");
    tableContainer.innerHTML = "";

    const table = createTableElement("table");
    const headerRow = createTableElement("tr");

    headerData.forEach((text) => {
      headerRow.appendChild(createTableElement("th", text));
    });
    table.appendChild(headerRow);

    studentList.forEach((student) => {
      const row = createTableElement("tr");
      Object.values(student.getData()).forEach((value) => {
        row.appendChild(createTableElement("td", value));
      });

      const actions = createTableElement("td");
      const button_container = createTableElement("div");
      const editButton = createTableElement("button", "Chỉnh sửa");
      const deleteButton = createTableElement("button", "Xóa");
      button_container.classList.add("button_container");
      editButton.classList.add("edit_button");
      deleteButton.classList.add("delete_button");

      editButton.addEventListener("click", () => {
        handleEditStudent({
          id: student.getData().id,
          name: prompt("Nhập tên: ", student.getData().name),
          gender: prompt("Nhập giới tính: ", student.getData().gender),
          dob: prompt("Nhập ngày sinh: ", student.getData().dob),
          city: prompt("Nhập thành phố: ", student.getData().city),
        });
      });

      deleteButton.addEventListener("click", () => {
        handleDeleteStudent(student.getData().id);
      });

      button_container.appendChild(editButton);
      button_container.appendChild(deleteButton);
      actions.appendChild(button_container);
      row.appendChild(actions);
      table.appendChild(row);
    });

    tableContainer.appendChild(table);
  };

  addButton.addEventListener("click", () => {
    const id = document.getElementById("add_id").value;
    const name = document.getElementById("add_name").value;
    const gender = document.getElementById("add_gender").value;
    const dob = document.getElementById("add_dob").value;
    const city = document.getElementById("add_city").value;

    handleCreateStudent({ id, name, gender, dob, city });

    document.getElementById("add_id").value = "";
    document.getElementById("add_name").value = "";
    document.getElementById("add_gender").value = "";
    document.getElementById("add_dob").value = "";
    document.getElementById("add_city").value = "";
  });

  renderTable();
});
