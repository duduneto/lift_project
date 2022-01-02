const lift = document.getElementById('lift');
var lift_id_interval = null;
let lift_queue = [];
let lift_queue_vertical_position = [];

// Configure all floor buttons
document.querySelectorAll('BUTTON').forEach(buttonElement => {
    buttonElement.addEventListener('click', () => {
        const currentfloor = buttonElement.parentElement.parentElement.parentElement;
        const targetFloor = document.getElementById('floor_' + buttonElement.value);
        lift_queue_vertical_position = [...lift_queue_vertical_position, currentfloor.offsetTop, targetFloor.offsetTop];
        lift_queue = [...lift_queue, currentfloor.getAttribute('floor'), targetFloor.getAttribute('floor')];
        startLift()
    })
})


// LIFT CONTROLLERS

function moveLift() {
    var pos = lift.offsetTop;
    clearInterval(lift_id_interval);
    lift_id_interval = setInterval(frame, 10);
    function frame() {
        if (pos == lift_queue_vertical_position[0]) {
            clearInterval(lift_id_interval);
            // Reach Target Floor
            reachFloor();
        } else {
            if (lift.offsetTop <= lift_queue_vertical_position[0]) {
                pos++;
            } else {
                pos = pos - 1;
            }
            lift.style.top = pos + 'px';
        }
    }
}

function startLift() {
    if (!!lift_queue_vertical_position.length) {
        moveLift();
    }
}

function reachFloor() {
    // Clean QUEUE
    lift_queue_vertical_position.splice(0, 1);
    lift_queue.splice(0, 1);

    setTimeout(startLift, 1000)
}