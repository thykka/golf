import { lineCircle as CollideLineCircle } from "./lib/collide";
import type { GameState } from "./index";

export function applyMovement({ ball }: GameState) {
	ball.position = ball.position.add(ball.velocity);
}

export function handleFloorCollision({ ball, floor }: GameState) {
	if (CollideLineCircle(floor.start, floor.end, ball.position, ball.radius)) {
		ball.color = "red";
		const velocityDamping = Math.max(0.1, 1 - Math.abs(ball.velocity.y) * 0.05);
		const effectiveBounciness = ball.bounciness * velocityDamping;
		ball.position.y = floor.start.y - ball.radius;
		ball.velocity.y = -ball.velocity.y * effectiveBounciness;
		ball.velocity.x *= ball.friction;
	} else {
		ball.color = "white";
	}
}

export function applyGravity({ ball }: GameState) {
	ball.velocity.y = Math.min(ball.velocity.y + 0.01, 9);
}
