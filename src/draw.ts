import { Ball } from "./entities/ball";
import { Cursor } from "./entities/cursor";
import { Floor } from "./entities/floor";
import { Vector2d } from "./lib/vector";

export function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number): void {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, width, height);
}

export function drawBall(ctx: CanvasRenderingContext2D, ball: Ball): void {
	const { width, height } = ctx.canvas;
	ctx.fillStyle = ball.resting ? "green" : ball.rolling ? "blue" : ball.bouncing ? "red" : "black";
	ctx.beginPath();
	ctx.arc(...ball.position.xy, ball.radius, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.fillStyle = "#fff";
	const dotPos = ball.position.add(
		new Vector2d(Math.cos(ball.angle) * (ball.radius - 4), Math.sin(ball.angle) * (ball.radius - 4))
	);
	ctx.beginPath();
	ctx.arc(...dotPos.xy, 4, 0, Math.PI * 2);
	ctx.closePath();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(width / 2, height / 2);
	const velocityPos = new Vector2d(
		width / 2 + ball.velocity.x * (1 / 15),
		height / 2 + ball.velocity.y * (1 / 15)
	);
	ctx.lineTo(...velocityPos.xy);
	const rollPos = velocityPos.add(new Vector2d(ball.angularVelocity, 0));
	ctx.lineTo(...rollPos.xy);
	ctx.stroke();
}

export function drawFloor(ctx: CanvasRenderingContext2D, floor: Floor): void {
	ctx.strokeStyle = "#fff";
	ctx.beginPath();
	ctx.moveTo(...floor.start.xy);
	ctx.lineTo(...floor.end.xy);
	ctx.stroke();
}

export function drawCursor(ctx: CanvasRenderingContext2D, cursor: Cursor): void {
	if (cursor.held && cursor.heldPosition) {
		ctx.strokeStyle = "#fff";
		ctx.beginPath();
		ctx.arc(...cursor.heldPosition.xy, 8, 0, Math.PI * 2);
		ctx.stroke();
		ctx.moveTo(...cursor.heldPosition.xy);
		ctx.lineTo(...cursor.position.xy);
		ctx.stroke();
	}
}
