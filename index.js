const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2;

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw()  {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }

    move(angle, quantify) {
        if(angle === 'right') {
            this.position.x += quantify;
        }

        if(angle === 'left') {
            this.position.x -= quantify;
        }
    }
    controls(control, value = 0) {
        if(control === 'jump') {
            this.position.x += value;
        }

        if(control === 'move') {
            this.position.x += value;
        }
    }

    update() {
        this.draw()
        this.position.y += gravity
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else { this.velocity.y += gravity}
    }
}

const player = new Sprite({
    position: {
        x: 90,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    }
})
player.draw()

const enemy = new Sprite({
    position: {
        x: 400,
        y: 400,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})
enemy.draw()
console.log(player)


function animate() {
    window.requestAnimationFrame(animate)
    console.log('go')
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate()
let quantifyKeys = {
    d: 0,
    a: 0,
};
window.addEventListener('keydown', (event) => {

    switch(event.key) {
        case 'd':
            quantifyKeys.d += 1;
            quantifyKeys.a = 0;
            console.log(quantifyKeys)
            if(quantifyKeys.d === 2) {
                player.move('right', 100)
                quantifyKeys.d = 0
                console.log(quantifyKeys)
            } else {
                player.controls('right', 20)
            }
        break;
        case 'a':
            quantifyKeys.d += 0;
            quantifyKeys.a += 1;
            if(quantifyKeys.a === 2) {
                player.move('left', 100)
                quantifyKeys.a = 0
            } else {
                player.controls('left', 20)
            }
        break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            player.controls('move', 20)
        break;
    }
});