const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2;


class Map {
    randomMap() {

    }
}


class PlayerStatus {
    allStatus() {
        return {
            force: 0,
            agility: 0,
            int: 0,
            sor: 0,
        }
    }
}




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
        if(control === 'stop') {
            this.position.x += 0;
        }
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else { this.velocity.y += gravity}
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
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

const keys = {
    d: {quantify: 0},
    a: {quantify: 0},
};

window.addEventListener('keydown', (event) => {

    switch(event.key) {
        case 'd':
            keys.d.quantify += 1;
            keys.a.quantify = 0;
            console.log(keys.a)
            if(keys.d.quantify === 2) {
                player.move('right', 2)
                keys.d.quantify = 0
                console.log(quantifyKeys)
            } else {
                player.controls('right', 1)
            }
        break;
        case 'a':
            keys.d.quantify += 0;
            keys.a.quantify += 1;
            if(keys.a.quantify === 2) {
                player.move('left', 2)
                keys.a.quantify = 0
            } else {
                player.move('left', 1)
            }
        break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            player.controls('stop')
        break;
        case 'a':
            player.controls('stop')
        break;
    }
});