import {
  Button,
  Card,
  Table
} from "react-bootstrap";

function StudentTable({
  students,
  onEdit,
  onDelete
}) {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>
          Student Records
        </Card.Title>

        {students.length === 0 ? (
          <p className="text-muted mt-3">
            No student records found.
          </p>
        ) : (
          <div className="table-responsive mt-3">
            <Table
              striped
              bordered
              hover
              responsive
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Register No.</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>

                    <td>
                      {student.register_number}
                    </td>

                    <td>
                      {student.department}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.phone}
                    </td>

                    <td>
                      {student.year}
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() =>
                            onEdit(student)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            onDelete(student.id)
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default StudentTable;