import { Ball } from "./entities/ball";
import { Floor } from "./entities/floor";

export function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number): void {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, width, height);
}

export function drawBall(ctx: CanvasRenderingContext2D, ball: Ball): void {
	ctx.fillStyle = ball.color;
	ctx.beginPath();
	ctx.arc(...ball.position.xy, ball.radius, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
}

export function drawFloor(ctx: CanvasRenderingContext2D, floor: Floor): void {
	ctx.strokeStyle = "#fff";
	ctx.beginPath();
	ctx.moveTo(...floor.start.xy);
	ctx.lineTo(...floor.end.xy);
	ctx.stroke();
}
