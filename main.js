// Define the Google Sheets API URL
const googleSheetAPI = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMlDHyVSmk_YHpAUZm2snAiDVuQyCmYRjOfcSRsS2AjjR8o-MtRwCjXwnqMmyy5cejvbvR61FzOKrD/pubhtml?gid=0&single=true';

// Function to fetch and display student data
async function fetchStudentData() {
  try {
    // Fetch the student data from the Google Sheet
    const response = await fetch(googleSheetAPI);

    // Check if the response was successful
    if (!response.ok) {
      throw new Error('Error fetching data:', response.status);
    }

    // Convert the response to JSON
    const data = await response.json();

    // Sort the student data by skill scores
    data.sort((a, b) => b.score - a.score);

    // Get the student list element
    const studentList = document.getElementById('student-list');

    // Clear the student list element
    studentList.innerHTML = '';

    // Iterate over the student data and add each student to the list
    data.forEach(student => {
      studentList.innerHTML += `
        <div>
          <img src="${student.image}" alt="${student.name}">
          <p>Name: ${student.name}</p>
          <p>Department: ${student.department}</p>
          <p>SkillRack Score: ${student.score}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}

// Periodically update data
setInterval(fetchStudentData, 60000); // Update every 60 seconds

// Initial data load
fetchStudentData();
