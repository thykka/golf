import { Vector2d } from "../lib/vector";

export type Cursor = {
	position: Vector2d;
	pressed: boolean;
	held: boolean;
	heldPosition: Vector2d | null;
};
