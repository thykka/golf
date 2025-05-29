import { Vector2d } from "../lib/vector";

export type Ball = {
	radius: number;
	position: Vector2d;
	velocity: Vector2d;
	bounciness: number;
	friction: number;
	color: string;
};
