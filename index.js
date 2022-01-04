const lift = document.getElementById('lift');
let lift_id_interval = null;
let lift_moving = false;
let lift_queue = [];
let lift_queue_vertical_position = [];
let lift_direction = null; // "up" | "down"

// Configure all floor buttons
document.querySelectorAll('BUTTON').forEach(buttonElement => {
    buttonElement.addEventListener('click', () => {
        const currentfloor = buttonElement.parentElement.parentElement.parentElement;
        const targetFloor = document.getElementById('floor_' + buttonElement.value);

        // lift_queue = [...lift_queue, currentfloor.getAttribute('floor'), targetFloor.getAttribute('floor')];
        callFloor(currentfloor.offsetTop, targetFloor.offsetTop);
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

function callFloor(currentCallingFloorPosition, targetFloorPosition) {
    if (!lift_moving) {
        lift_queue_vertical_position = [...lift_queue_vertical_position, currentCallingFloorPosition, targetFloorPosition];
        startLift();
    } else {
        calculateCallFloor(currentCallingFloorPosition, targetFloorPosition);
    }
    console.log(lift_queue_vertical_position)
}

function startLift() {
    if (!!lift_queue_vertical_position.length) {
        lift_moving = true;
        lift_direction = lift_queue_vertical_position[0] > lift.offsetTop ? "down" : "up";
        moveLift();
    } else {
        // WILL STOP THE LIFT IF IT DOESN'T HAS MORE QUEUED FLOORS
        lift_moving = false;
    }
}

function reachFloor() {
    // Clean QUEUE
    lift_queue_vertical_position.splice(0, 1);
    lift_queue.splice(0, 1);

    setTimeout(startLift, 1000)
}

function calculateCallFloor(currentCallingFloorPosition, targetFloorPosition) {
    const liftPosition = lift.offsetTop;
    if (currentCallingFloorPosition > liftPosition) {
        // WHEN THE LIFT IS DOWNING
        if (lift_queue_vertical_position[0] > liftPosition) {
            // SET A SUDDEN FLOOR REQUEST INNER LIFT PATH AND DIRECTION
            lift_queue_vertical_position.unshift(currentCallingFloorPosition)
            if(lift_queue_vertical_position[0] < targetFloorPosition) {
                // IF THE SUDDEN REQUEST TARGET FLOOR IS PREVIOUS FROM THE MAIN LIFT TARGET
                lift_queue_vertical_position.splice(1,0,targetFloorPosition);
            } else {
                // IF THE SUDDEN REQUEST TARGET FLOOR IS NEXT FROM THE MAIN LIFT TARGET
                lift_queue_vertical_position.splice(2,0,targetFloorPosition);            }
        } else {
            lift_queue_vertical_position = [...lift_queue_vertical_position, currentCallingFloorPosition, targetFloorPosition]
        }
    } else {

    }
}