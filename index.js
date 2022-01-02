const lift = document.getElementById('lift');
var lift_id_interval = null;
let lift_floors = [];


document.querySelectorAll('BUTTON').forEach(buttonElement => {
    buttonElement.addEventListener('click', () => {
        const currentfloor = buttonElement.parentElement.parentElement.parentElement;
        const targetFloor = document.getElementById('floor_'+buttonElement.value);
        moveLift(lift.offsetTop, targetFloor.offsetTop)
    })
})


function moveLift(fromPositionY, toPositionY) {
    var pos = fromPositionY;
    clearInterval(lift_id_interval);
    lift_id_interval = setInterval(frame, 10);
    function frame() {
        if (pos == toPositionY) {
            clearInterval(lift_id_interval);
        } else {
            if (fromPositionY <= toPositionY) {
                pos++;
            } else {
                pos = pos-1;
            }
            lift.style.top = pos + 'px';
        }
    }
}