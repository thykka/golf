import type { Ball } from "./entities/ball";
import type { Floor } from "./entities/floor";
import { Game } from "./lib/game";
import { Vector2d } from "./lib/vector";
import { applyMovement, applyGravity, handleFloorCollision } from "./update";
import { drawBackground, drawBall, drawFloor } from "./draw";

export type GameState = {
	ball: Ball;
	floor: Floor;
};

const game = new Game<GameState>({
	width: 320 * 2,
	height: 240 * 2,
	init() {
		const state = {
			ball: {
				radius: 5,
				position: new Vector2d(16, this.height - 16),
				velocity: new Vector2d(0.25, -3.0),
				bounciness: 0.7,
				friction: 0.98,
				color: "white",
			},
			floor: {
				start: new Vector2d(0, this.height - 10),
				end: new Vector2d(this.width, this.height - 10),
			},
		};
		return state;
	},

	update(state, timeMs, deltaMs) {
		applyMovement(state);
		handleFloorCollision(state);
		applyGravity(state);
		return state;
	},

	draw(state, timeMs) {
		drawBackground(this.ctx, this.width, this.height);
		drawFloor(this.ctx, state.floor);
		drawBall(this.ctx, state.ball);
	},
});

console.log("game", game);
