// Define the Google Sheets API URL
const googleSheetAPI = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMlDHyVSmk_YHpAUZm2snAiDVuQyCmYRjOfcSRsS2AjjR8o-MtRwCjXwnqMmyy5cejvbvR61FzOKrD/pubhtml?gid=0&single=true';

// Function to fetch and display student data
async function fetchStudentData() {
    try {
        const response = await fetch(googleSheetAPI);
        const data = await response.json();

        // Sort data by skill scores
        data.sort((a, b) => b.score - a.score);

        const studentList = document.getElementById('student-list');

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
        console.error('Error fetching data:', error);
    }
}

// Periodically update data
setInterval(fetchStudentData, 60000); // Update every 60 seconds

// Initial data load
fetchStudentData();
