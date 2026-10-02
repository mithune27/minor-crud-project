import { useEffect, useState } from "react";
import axios from "axios";

import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

const API_URL = "/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);

      setStudents(response.data);
    } catch (error) {
      console.error(
        "Error loading students:",
        error
      );
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSaved = () => {
    setSelectedStudent(null);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      fetchStudents();
    } catch (error) {
      console.error(
        "Error deleting student:",
        error
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1>Student Record Management</h1>

        <p className="text-muted">
          CRUD Application
        </p>
      </div>

      <StudentForm
        selectedStudent={selectedStudent}
        onSaved={handleSaved}
      />

      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;