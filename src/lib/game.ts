export type UserInitFunction<T> = (this: Game<T>, state?: T) => T;
export type UserUpdateFunction<T> = (this: Game<T>, state: T, timeMs: number, deltaMs: number) => T;
export type UserDrawFunction<T> = (this: Game<T>, state: T, timeMs: number) => void;

export type GameOptions<T> = {
	init: UserInitFunction<T>;
} & Partial<{
	canvasSelector: string;
	width: number;
	height: number;
	update: UserUpdateFunction<T>;
	draw: UserDrawFunction<T>;
}>;

export class Game<T = unknown> {
	width = 100;
	height = 100;
	ctx: CanvasRenderingContext2D;
	state: T = {} as T;
	init: UserInitFunction<T> = () => this.state;
	update: UserUpdateFunction<T> = () => this.state;
	draw: UserDrawFunction<T> = () => {};

	private canvas: HTMLCanvasElement;
	private lastTick?: number;

	constructor(options: GameOptions<T>) {
		const {
			canvasSelector = "#game-canvas",
			width,
			height,
			init,
			update,
			draw,
			...customMethods
		} = options;
		Object.assign(this, customMethods);
		if (width) this.width = width;
		if (height) this.height = height;
		this.init = init;
		if (update) this.update = update;
		if (draw) this.draw = draw;
		this.canvas = this.initCanvas(canvasSelector);
		this.ctx = this.getContext();
		this.state = this.init(this.state);
		this.start();
	}

	private initCanvas(selector: string): HTMLCanvasElement {
		const foundCanvas = document.querySelector(selector);
		if (foundCanvas instanceof HTMLCanvasElement) {
			this.resizeCanvas(foundCanvas);
			return foundCanvas;
		} else {
			throw Error("canvas element not found");
		}
	}

	private getContext(canvas = this.canvas): CanvasRenderingContext2D {
		const context = canvas.getContext("2d");
		if (!context) throw Error("could not get 2d rendering context");
		return context;
	}

	public resizeCanvas(canvas = this.canvas, width = this.width, height = this.height): void {
		canvas.width = width;
		canvas.height = height;
	}

	public start() {
		this.queueTick();
	}

	private queueTick() {
		requestAnimationFrame((time) => {
			this.tick(time);
			this.queueTick();
		});
	}

	private tick(timeMs: number): void {
		const deltaMs = timeMs - (this.lastTick ?? timeMs);
		this.state = this.update(this.state, timeMs, deltaMs);
		this.draw(this.state, timeMs);
		this.lastTick = timeMs;
	}
}
