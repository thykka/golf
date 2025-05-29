export interface Vector2d extends Readonly<[number, number]> {}

export class Vector2d {
	x: number;
	y: number;

	constructor(x: number, y?: number) {
		this.x = x;
		this.y = y ?? x;
	}

	get xy(): [number, number] {
		return [this.x, this.y];
	}

	*[Symbol.iterator](): Generator<number, void, unknown> {
		yield this.x;
		yield this.y;
	}

	add(operand: Vector2d): Vector2d {
		return new Vector2d(this.x + operand.x, this.y + operand.y);
	}

	subtract(operand: Vector2d): Vector2d {
		return new Vector2d(this.x - operand.x, this.y - operand.y);
	}

	scale(scalar: number): Vector2d {
		return new Vector2d(this.x * scalar, this.y * scalar);
	}

	multiply(operand: Vector2d): Vector2d {
		return new Vector2d(this.x * operand.x, this.y * operand.y);
	}

	dot(operand: Vector2d): number {
		return this.x * operand.x + this.y * operand.y;
	}

	get magnitudeSquared(): number {
		return this.x * this.x + this.y * this.y;
	}

	get magnitude(): number {
		return Math.sqrt(this.magnitudeSquared);
	}

	distance(operand: Vector2d): number {
		return this.subtract(operand).magnitude;
	}

	normalized(): Vector2d {
		const mag = this.magnitude;
		return mag === 0 ? Vector2d.ZERO : this.scale(1 / mag);
	}

	static readonly ZERO = new Vector2d(0);
	static readonly UP = new Vector2d(0, -1);
	static readonly DOWN = new Vector2d(0, 1);
	static readonly LEFT = new Vector2d(-1, 0);
	static readonly RIGHT = new Vector2d(1, 0);
}
