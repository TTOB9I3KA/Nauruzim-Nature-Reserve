const table = document.getElementById("table");
const buttonList = [];

const sendDeleteReq = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/database?deleteTour=${id}`, {
      method: 'POST'
    });
    if (response.status === 200) {
      // If deletion is successful, fetch and process rows again to update the table
      await fetchAndProcessRows();
			console.log('update')
    } else {
      console.error('Failed to delete record:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting record:', error.message);
  }
}

const addRow = (id, name, phone, booking, end, record_date) => {
	const newRow = document.createElement('tr');
	
	const cellId = document.createElement('td');
	cellId.textContent = id;
	newRow.appendChild(cellId);

	const cellName = document.createElement('td');
	cellName.textContent = name;
	newRow.appendChild(cellName);

	const cellPhone = document.createElement('td');
	cellPhone.textContent = phone;
	newRow.appendChild(cellPhone);

	const cellBooking = document.createElement('td');
	cellBooking.textContent = booking;
	newRow.appendChild(cellBooking);

	const cellEnd = document.createElement('td');
	cellEnd.textContent = end;
	newRow.appendChild(cellEnd);

	const cellRecordDate = document.createElement('td');
	cellRecordDate.textContent = record_date;
	newRow.appendChild(cellRecordDate);

	const cellBtn = document.createElement('td');
	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('deleteBtn');
	deleteBtn.id = id;
	deleteBtn.textContent = 'Delete Record';
	cellBtn.appendChild(deleteBtn);
	buttonList.push(deleteBtn);
	newRow.appendChild(cellBtn);

	// Append the new row to the table body
	document.querySelector('tbody').appendChild(newRow);
}

const clearTable = () => {
  const tableBody = document.querySelector('tbody');
  // Remove all child nodes from the table body
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

const fetchAndProcessRows = async() => {
	clearTable()

	fetch('http://localhost:3000/database/records')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    fillUpTable(data);
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}
const fillUpTable = async(data) => {
	for (const row of data['rows']) {
		addRow(row.id, row.name, row.phone, row.booking_date, row.end_date, row.record_date);
	}
	regBtns();
}
const regBtns = () => {
	console.log(buttonList.length);
	buttonList.forEach(btn => {
		btn.addEventListener('click', async () => {
			console.log(event.target.id);
			const btnId = event.target.id;
			await sendDeleteReq(btnId);
			console.log(btnId);
		})
	})
}

fetchAndProcessRows();
