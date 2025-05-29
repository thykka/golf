import { Game } from "./lib/game";
import { Vector2d } from "./lib/vector";
import { lineCircle as CollideLineCircle } from "./lib/collide";

type GameState = {
	ball: {
		radius: number;
		position: Vector2d;
		velocity: Vector2d;
		bounciness: number;
		friction: number;
	};
	floor: {
		start: Vector2d;
		end: Vector2d;
	};
};

function applyMovement({ ball }: GameState) {
	ball.position = ball.position.add(ball.velocity);
}

function handleFloorCollision({ ball, floor }: GameState) {
	if (CollideLineCircle(floor.start, floor.end, ball.position, ball.radius)) {
		const velocityDamping = Math.max(0.1, 1 - Math.abs(ball.velocity.y) * 0.05);
		const effectiveBounciness = ball.bounciness * velocityDamping;
		ball.velocity.y = -ball.velocity.y * effectiveBounciness;
		ball.velocity.x *= ball.friction;
	}
}

function applyGravity({ ball }: GameState) {
	ball.velocity.y = Math.min(ball.velocity.y + 0.01, 9);
}

const game = new Game<GameState>({
	width: 320 * 2,
	height: 240 * 2,
	init() {
		const state = {
			ball: {
				radius: 5,
				position: new Vector2d(this.width / 2, this.height / 2),
				velocity: new Vector2d(0),
				bounciness: 0.7,
				friction: 0.98,
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
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.beginPath();
		this.ctx.arc(...state.ball.position.xy, state.ball.radius, 0, Math.PI * 2);
		this.ctx.closePath();
		this.ctx.fillStyle = "#fff";
		this.ctx.fill();

		this.ctx.strokeStyle = "#fff";
		this.ctx.beginPath();
		this.ctx.moveTo(...state.floor.start.xy);
		this.ctx.lineTo(...state.floor.end.xy);
		this.ctx.stroke();
	},
});

console.log("game", game);
