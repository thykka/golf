import { Vector2d } from "./vector";

export function pointCircle(point: Vector2d, circlePos: Vector2d, circleRadius: number): boolean {
	return point.distance(circlePos) <= circleRadius;
}

export function linePoint(
	lineA: Vector2d,
	lineB: Vector2d,
	point: Vector2d,
	buffer = 0.1
): boolean {
	const distanceA = point.distance(lineA);
	const distanceB = point.distance(lineB);
	const lineLength = lineA.distance(lineB);
	// If the sum of distances are almost equal to the line length, the point is on the line
	return (
		distanceA + distanceB >= lineLength - buffer && distanceA + distanceB <= lineLength + buffer
	);
}

export function lineCircle(
	lineA: Vector2d,
	lineB: Vector2d,
	circlePos: Vector2d,
	circleRadius: number
): boolean {
	// Are endpoints inside cirlce?
	const insideA = pointCircle(lineA, circlePos, circleRadius);
	if (insideA) return true;
	const insideB = pointCircle(lineB, circlePos, circleRadius);
	if (insideB) return true;

	// Get dot product to see if the point is on the line
	const circleToLineA = circlePos.subtract(lineA);
	const lineDirection = lineB.subtract(lineA);
	const dot = circleToLineA.dot(lineDirection) / lineDirection.magnitudeSquared;

	// Find closest point on line
	const closestPoint = lineA.add(lineDirection.scale(dot));

	// Is point on line?
	const onLine = linePoint(lineA, lineB, closestPoint);
	if (!onLine) return false;

	// Check if closest point is within circle radius
	return closestPoint.distance(circlePos) <= circleRadius;
}

export default {};
