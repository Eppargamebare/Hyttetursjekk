
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;

    if (password === 'Eppar') {
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.content-container').style.display = 'block';
        sessionStorage.setItem('loggedUser', username);
        generateWeekends();
    } else {
        alert('Ugyldig brukernavn eller passord');
    }
});

function generateWeekends() {
    const table = document.getElementById('availability-table');
    const year = new Date().getFullYear();
    let date = new Date();
    let weekends = [];

    while (date.getFullYear() === year) {
        if (date.getDay() === 6) { // Saturday
            let weekend = [new Date(date), new Date(date)];
            weekend[1].setDate(weekend[1].getDate() + 1); // Sunday
            weekends.push(weekend);
        }
        date.setDate(date.getDate() + 1);
    }

    weekends.forEach(weekend => {
        if (weekend[0] >= new Date()) {
            let row = table.insertRow();
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);
            let cell4 = row.insertCell(4);

            cell0.innerHTML = `${weekend[0].toISOString().slice(0, 10)} til ${weekend[1].toISOString().slice(0, 10)}`;
            cell1.className = "editable";
            cell1.setAttribute('data-user', 'tom');
            cell2.className = "editable";
            cell2.setAttribute('data-user', 'haukur');
            cell3.className = "editable";
            cell3.setAttribute('data-user', 'mats');
            cell4.className = "editable";
            cell4.setAttribute('data-user', 'tommy');
        }
    });

    document.querySelectorAll('.editable').forEach(cell => {
        cell.addEventListener('click', () => {
            const loggedUser = sessionStorage.getItem('loggedUser');
            if (cell.getAttribute('data-user') === loggedUser) {
                cell.classList.toggle('available');
            }
        });
    });
}
