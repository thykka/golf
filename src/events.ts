import type { Game } from "./lib/game";
import type { GameState } from "./index";
import { Vector2d } from "./lib/vector";
import { isStationary } from "./entities/ball";

type MouseEventHandler = (event: MouseEvent) => void;

export function handleMouseMove(game: Game<GameState>): MouseEventHandler {
	return function (event) {
		const { cursor } = game.state;
		cursor.position.x = event.offsetX;
		cursor.position.y = event.offsetY;
	};
}

export function handleMouseUp(game: Game<GameState>): MouseEventHandler {
	return function (event) {
		const { cursor, ball } = game.state;
		if (cursor.held) {
			cursor.held = false;
			cursor.pressed = false;
			ball.velocity = cursor.position.subtract(cursor.heldPosition).scale(4);
			cursor.heldPosition = null;
		}
	};
}

export function handleMouseDown(game: Game<GameState>): MouseEventHandler {
	return function (event) {
		const { ball, cursor } = game.state;
		if (ball.resting) {
			if (!cursor.held) {
				cursor.pressed = true;
				cursor.held = true;
				cursor.heldPosition = new Vector2d(cursor.position.x, cursor.position.y);
			} else {
				cursor.pressed = false;
			}
		}
	};
}
