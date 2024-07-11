let editId = null;

async function createData() {
    const dataInput = document.getElementById('data').value;
    const response = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: dataInput })
    });
    const result = await response.json();
    loadData();
}

async function loadData() {
    const response = await fetch('http://localhost:3000/read');
    const dataList = await response.json();
    const dataListElement = document.getElementById('data-list');
    dataListElement.innerHTML = '';
    dataList.forEach(dataItem => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.innerHTML = `
            ${dataItem.content}
            <button onclick="editData('${dataItem.id}', '${dataItem.content}')">Edit</button>
            <button onclick="deleteData('${dataItem.id}')">Delete</button>
        `;
        dataListElement.appendChild(div);
    });
}

async function deleteData(id) {
    await fetch(`http://localhost:3000/delete/${id}`, { method: 'DELETE' });
    loadData();
}

async function editData(id, content) {
    editId = id;
    document.getElementById('edit-data').value = content;
    document.getElementById('edit-form').style.display = 'block';
}

async function updateData() {
    const content = document.getElementById('edit-data').value;
    await fetch(`http://localhost:3000/update/${editId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    });
    editId = null;
    document.getElementById('edit-form').style.display = 'none';
    loadData();
}

function cancelEdit() {
    editId = null;
    document.getElementById('edit-form').style.display = 'none';
}

window.onload = loadData;
