const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    width: 40,
    height: 40,
    speed: 5,
};

const bullets = []; // Array to hold bullets
const targets = []; // Array to hold targets

// Draw the player
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Move the player based on keyboard input
function handlePlayerMovement(event) {
    if (event.key === "ArrowLeft") {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight") {
        player.x += player.speed;
    }

    if (player.x < 0) {
        player.x = 0; // Prevent moving off the left edge
    } else if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width; // Prevent moving off the right edge
    }
}

// Shoot a bullet
function shootBullet() {
    const bullet = {
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 10,
        speed: 7,
    };
    bullets.push(bullet); // Add the new bullet to the array
}

// Draw bullets and move them
function drawBullets() {
    ctx.fillStyle = "yellow";
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        bullet.y -= bullet.speed; // Move the bullet upward

        // Remove bullets that go off-screen
        if (bullet.y < 0) {
            bullets.splice(i, 1);
            i--; // Adjust index after removal
        } else {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height); // Draw the bullet
        }
    }
}

// Create random targets
function createTarget() {
    const target = {
        x: Math.random() * (canvas.width - 30),
        y: -30, // Start off-screen
        width: 30,
        height: 30,
        speed: 3,
    };
    targets.push(target);
}

// Draw and move targets
function drawTargets() {
    ctx.fillStyle = "red";
    for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        target.y += target.speed; // Move the target downward

        // Remove targets that go off-screen
        if (target.y > canvas.height) {
            targets.splice(i, 1);
            i--; // Adjust index
        } else {
            ctx.fillRect(target.x, target.y, target.width, target.height); // Draw the target
        }
    }
}

// Check for bullet-target collisions
function checkCollisions() {
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        for (let j = 0; j < targets.length; j++) {
            const target = targets[j];

            // Collision detection
            if (
                bullet.x < target.x + target.width &&
                bullet.x + bullet.width > target.x &&
                bullet.y < target.y + target.height &&
                bullet.y + bullet.height > target.y
            ) {
                bullets.splice(i, 1); // Remove the bullet
                targets.splice(j, 1); // Remove the target
                i--; // Adjust indices
                j--;
                break;
            }
        }
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    
    drawPlayer(); // Draw the player
    drawBullets(); // Draw bullets and move them
    drawTargets(); // Draw and move targets
    checkCollisions(); // Check for collisions
    
    requestAnimationFrame(gameLoop); // Loop the game
}

// Handle keyboard events
window.addEventListener("keydown", (event) => {
    handlePlayerMovement(event);
    if (event.key === " ") {
        shootBullet(); // Shoot when space bar is pressed
    }
});

// Create a new target every 2 seconds
setInterval(createTarget, 2000);

// Start the game loop
gameLoop();
