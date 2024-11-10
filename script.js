// Array to hold employee data
let employees = [];

// Generate a unique ID for each employee
let currentEmpId = 1;

// Function to render the employee table
function renderEmployeeTable() {
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = ''; // Clear the table before re-rendering

    employees.forEach(employee => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>
                <button class="edit" onclick="editEmployee(${employee.id})">Edit</button>
                <button class="delete" onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Add a new employee
document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const name = document.getElementById('empName').value;
    const role = document.getElementById('empRole').value;
    const department = document.getElementById('empDept').value;
    const salary = parseFloat(document.getElementById('empSalary').value);
    const empId = document.getElementById('empId').value;

    // Form validation
    if (name && role && department && salary && salary >= 1000) {
        if (empId) {
            // Update existing employee
            const empIndex = employees.findIndex(emp => emp.id === parseInt(empId));
            if (empIndex > -1) {
                employees[empIndex] = { id: parseInt(empId), name, role, department, salary };
            }
            document.getElementById('form-title').innerText = "Add New Employee";
        } else {
            // Add new employee
            employees.push({
                id: currentEmpId++,
                name,
                role,
                department,
                salary
            });
        }
        
        // Reset form
        document.getElementById('employeeForm').reset();
        document.getElementById('empId').value = '';
        renderEmployeeTable();
    } else {
        alert('Please fill out all fields with valid values!');
    }
});

// Edit employee details
function editEmployee(empId) {
    const emp = employees.find(emp => emp.id === empId);
    if (emp) {
        document.getElementById('empName').value = emp.name;
        document.getElementById('empRole').value = emp.role;
        document.getElementById('empDept').value = emp.department;
        document.getElementById('empSalary').value = emp.salary;
        document.getElementById('empId').value = emp.id;
        document.getElementById('form-title').innerText = `Edit Employee - ${emp.name}`;
    }
}

// Delete employee details
function deleteEmployee(empId) {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
        employees = employees.filter(emp => emp.id !== empId);
        renderEmployeeTable();
    }
}

// Initial render
renderEmployeeTable();
