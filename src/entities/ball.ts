import { Vector2d } from "../lib/vector";

export type Ball = {
	radius: number;
	position: Vector2d;
	velocity: Vector2d;
	angularVelocity: number;
	bounciness: number;
	friction: number;
	bouncing: boolean;
	rolling: boolean;
	resting: boolean;
	angle: number;
};
