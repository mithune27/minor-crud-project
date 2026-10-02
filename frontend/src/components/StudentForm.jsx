import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Form,
  Row
} from "react-bootstrap";

const API_URL = "/api/students";

const initialForm = {
  name: "",
  registerNumber: "",
  department: "",
  email: "",
  phone: "",
  year: ""
};

function StudentForm({ selectedStudent, onSaved }) {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        registerNumber: selectedStudent.register_number,
        department: selectedStudent.department,
        email: selectedStudent.email,
        phone: selectedStudent.phone,
        year: selectedStudent.year
      });
    } else {
      setFormData(initialForm);
    }
  }, [selectedStudent]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      if (selectedStudent) {
        await axios.put(
          `${API_URL}/${selectedStudent.id}`,
          formData
        );

        setMessage("Student updated successfully.");
      } else {
        await axios.post(API_URL, formData);

        setMessage("Student added successfully.");
      }

      setFormData(initialForm);
      onSaved();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  const handleCancel = () => {
    setFormData(initialForm);
    setMessage("");
    onSaved();
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">
          {selectedStudent
            ? "Edit Student"
            : "Add Student"}
        </Card.Title>

        {message && (
          <div className="alert alert-info">
            {message}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label>Register Number</Form.Label>
              <Form.Control
                type="text"
                name="registerNumber"
                value={formData.registerNumber}
                onChange={handleChange}
                placeholder="Enter register number"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter department"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label>Year</Form.Label>

              <Form.Select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select year
                </option>

                <option value="1">
                  1st Year
                </option>

                <option value="2">
                  2nd Year
                </option>

                <option value="3">
                  3rd Year
                </option>

                <option value="4">
                  4th Year
                </option>
              </Form.Select>
            </Col>
          </Row>

          <Button type="submit">
            {selectedStudent
              ? "Update Student"
              : "Add Student"}
          </Button>

          {selectedStudent && (
            <Button
              type="button"
              variant="secondary"
              className="ms-2"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default StudentForm;