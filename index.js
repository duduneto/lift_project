const lift = document.getElementById('lift');
var lift_id_interval = null;
let lift_floors = [];

// lift.animate([
//     // keyframes
//     { transform: 'translateY(0px)' },
//     { transform: 'translateY(302px)' }
//   ], {
//     // timing options
//     duration: 1000
//   });

document.querySelectorAll('BUTTON').forEach(buttonElement => {
    buttonElement.addEventListener('click', () => {
        const floor = buttonElement.parentElement.parentElement.parentElement;
        moveLift(lift.offsetTop, floor.offsetTop)
        console.log(`Move to ${buttonElement.value} floor`)
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