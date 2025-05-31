import type { Ball } from "./entities/ball";
import type { Floor } from "./entities/floor";
import { Game } from "./lib/game";
import { Vector2d } from "./lib/vector";
import { applyMovement, applyGravity, handleFloorCollision, applyRotation } from "./update";
import { drawBackground, drawBall, drawCursor, drawFloor } from "./draw";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "./events";
import { Cursor } from "./entities/cursor";

export type GameState = {
	ball: Ball;
	floor: Floor;
	cursor: Cursor;
	view: {
		topLeft: Vector2d;
		topRight: Vector2d;
		bottomLeft: Vector2d;
		bottomRight: Vector2d;
	};
};

const game = new Game<GameState>({
	width: 320 * 2,
	height: 240 * 2,
	init() {
		const state = {
			ball: {
				radius: 16,
				position: new Vector2d(32, this.height - 16),
				velocity: new Vector2d(0, 0),
				bounciness: 0.8,
				friction: 0.2,
				angularVelocity: 0,
				angle: 0,
				bouncing: false,
				rolling: false,
				resting: false,
			},
			floor: {
				start: new Vector2d(0, this.height - 10),
				end: new Vector2d(this.width, this.height - 10),
			},
			cursor: {
				position: new Vector2d(this.width / 2, this.height / 2),
				pressed: false,
				held: false,
				heldPosition: null,
			},
			view: {
				topLeft: Vector2d.ZERO,
				topRight: new Vector2d(this.width, 0),
				bottomLeft: new Vector2d(0, this.height),
				bottomRight: new Vector2d(this.width, this.height),
			},
		};
		const boundMouseMoveHandler = handleMouseMove(this);
		const boundMouseDownHandler = handleMouseDown(this);
		const boundMouseUpHandler = handleMouseUp(this);
		this.ctx.canvas.addEventListener("mousedown", boundMouseDownHandler);
		this.ctx.canvas.addEventListener("mouseup", boundMouseUpHandler);
		this.ctx.canvas.addEventListener("mousemove", boundMouseMoveHandler);
		return state;
	},

	update(state, timeSeconds, deltaSeconds) {
		applyMovement(state, deltaSeconds);
		applyRotation(state, deltaSeconds);
		handleFloorCollision(state);
		applyGravity(state, deltaSeconds);
		return state;
	},

	draw(state, timeMs) {
		drawBackground(this.ctx, this.width, this.height);
		drawFloor(this.ctx, state.floor);
		drawBall(this.ctx, state.ball);
		drawCursor(this.ctx, state.cursor);
	},
});

console.log("game", game);
