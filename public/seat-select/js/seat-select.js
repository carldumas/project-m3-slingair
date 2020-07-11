const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

let selection = '';

const renderSeats = (data) => {
    document.querySelector('.form-container').style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s - 1]}`;
            const seat = document.createElement('li');

            // Two types of seats to render
            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;
            
            // TODO: render the seat availability based on the data...
            if (data.find(seat => seat.id === seatNumber).isAvailable) {
                seat.innerHTML = seatAvailable;
            } else {
                seat.innerHTML = seatOccupied
            }
            
            row.appendChild(seat);
        }
    }

    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach((seat) => {
        seat.onclick = () => {
        selection = seat.value;
        seatMap.forEach((x) => {
            if (x.value !== seat.value) {
                document.getElementById(x.value).classList.remove('selected');
            }
        });
        document.getElementById(seat.value).classList.add('selected');
        document.getElementById('seat-number').innerText = `(${selection})`;
        confirmButton.disabled = false;
        };
    });
};

const toggleFormContent = (event) => {
    const flightNumber = flightInput.value;
    console.log('toggleFormContent: ', flightNumber);
    // Only contact the server if the flight number is this format 'SA###'.
    if (flightNumber === 'SA123' || flightNumber === 'SA231') {
        fetch(`/flights/${flightNumber}`)
            .then((res) => res.json())
            .then((data) => {
                // Pass the response data to renderSeats to create the appropriate seat-type.
                renderSeats(data);
            });
    } else {
        // error message if the number is not valid
        return console.log('Bad data');
    }    

};

const handleConfirmSeat = (event) => {
    event.preventDefault();
    // TODO: everything in here!
    fetch('/users', {
        method: 'POST',
        body: JSON.stringify({
        givenName: document.getElementById('givenName').value,
        }),
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
    });
};

flightInput.addEventListener('blur', toggleFormContent);
