export function clamp(a: number, b: number, c: number): number {
	return Math.max(Math.min(a, b), Math.min(Math.max(a, b), c));
}
