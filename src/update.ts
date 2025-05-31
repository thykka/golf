import { lineCircle as CollideLineCircle } from "./lib/collide";
import type { GameState } from "./index";
import { clamp } from "./lib/math";

export function applyMovement({ ball }: GameState, deltaSeconds: number) {
	const newPosition = ball.position.add(ball.velocity.scale(deltaSeconds));
	const mag = newPosition.subtract(ball.position).magnitudeSquared;
	ball.resting = mag < 0.01;
	ball.position = newPosition;
}

export function applyRotation({ ball }: GameState, deltaSeconds: number) {
	ball.angle += ball.angularVelocity * deltaSeconds;
}

export function handleFloorCollision({ ball, floor, view }: GameState) {
	if (
		CollideLineCircle(floor.start, floor.end, ball.position, ball.radius) ||
		ball.position.y > floor.start.y - ball.radius
	) {
		ball.position.y = floor.start.y - ball.radius;
		const newVelocityY = -ball.velocity.y * ball.bounciness;
		// check if ball should roll or slide
		const expectedRollingVelocity = ball.angularVelocity * ball.radius;
		const velocityDifference = ball.velocity.x - expectedRollingVelocity;
		if (Math.abs(newVelocityY) < 40 && Math.abs(velocityDifference) < 20) {
			ball.rolling = true;
			// Rolling; sync linear and angular velocities
			ball.velocity.y = 0;
			ball.velocity.x = expectedRollingVelocity;
			// Apply rolling friction
			ball.velocity.x *= 1 - ball.friction * 0.02;
			ball.angularVelocity = ball.velocity.x / ball.radius;
		} else {
			ball.bouncing = true;
			// Bouncing or sliding
			ball.velocity.y = newVelocityY;
			ball.velocity.x *= 1 - ball.friction;
			ball.angularVelocity += (velocityDifference * ball.friction) / ball.radius;
		}
	} else {
		ball.bouncing = false;
		ball.rolling = false;
	}
	const collideLeftWall = ball.position.x < view.topLeft.x + ball.radius;
	const collideRightWall = ball.position.x > view.topRight.x - ball.radius;
	if (collideLeftWall || collideRightWall) {
		ball.position.x = clamp(
			view.topLeft.x + ball.radius,
			ball.position.x,
			view.topRight.x - ball.radius
		);
		ball.velocity.x = -ball.velocity.x * (1 - ball.friction);
		ball.bouncing = true;
	}
	if (Math.abs(ball.velocity.x) < 5 && Math.abs(ball.velocity.y) < 5) {
		ball.resting = true;
	}
}

export function applyGravity({ ball }: GameState, deltaSeconds: number) {
	ball.velocity.y = ball.velocity.y + 980 * deltaSeconds;
}
