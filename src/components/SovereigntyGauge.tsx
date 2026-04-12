import { SovereigntyScoreCategory } from '../types';

interface SovereigntyGaugeProps {
	score: number;
	category: SovereigntyScoreCategory;
	size?: number;
}

// Kategorie-Farben für das Gauge
const CATEGORY_COLORS: Record<SovereigntyScoreCategory, string> = {
	insufficient: '#D32F2F', // Rot
	minimal: '#F57C00', // Orange
	adequate: '#F9A825', // Gelb
	good: '#7CB342', // Hellgrün
	excellent: '#388E3C', // Grün
	outstanding: '#1B5E20', // Dunkelgrün
};

// Kategorie-Ranges für Winkel-Berechnung (0-270° Tachometer)
const CATEGORY_RANGES = [
	{ category: 'insufficient' as const, min: 0, max: 30, angle: 0 },
	{ category: 'minimal' as const, min: 31, max: 45, angle: 45 },
	{ category: 'adequate' as const, min: 46, max: 60, angle: 90 },
	{ category: 'good' as const, min: 61, max: 75, angle: 135 },
	{ category: 'excellent' as const, min: 76, max: 90, angle: 180 },
	{ category: 'outstanding' as const, min: 91, max: 100, angle: 225 },
];

/**
 * Konvertiert einen Score (0-100) in einen Winkel (0-270°)
 * Wird für die Gauge-Nadel verwendet (Tachometer-Stil)
 */
function scoreToAngle(score: number): number {
	const clampedScore = Math.max(0, Math.min(100, score));
	return (clampedScore / 100) * 270;
}

/**
 * Konvertiert einen Winkel (Grad) in SVG-Koordinaten für Kurve
 * Rotiert für Tachometer-Layout mit Öffnung unten mittig
 * 0° → 135° (unten-links), 90° → 45° (oben-rechts), 270° → 315° (unten-rechts)
 */
function angleToRadians(angle: number): number {
	return (angle + 135) * (Math.PI / 180);
}

/**
 * Berechnet SVG-Koordinaten für einen Punkt auf dem Kreis
 */
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number; y: number } {
	const angleInRadians = angleToRadians(angleInDegrees);
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians),
	};
}

/**
 * Erstellt einen SVG-Bogen für die Gauge-Ringe
 */
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
	const start = polarToCartesian(x, y, radius, endAngle);
	const end = polarToCartesian(x, y, radius, startAngle);
	const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
	return ['M', start.x, start.y, 'A', radius, radius, 0, largeArc, 0, end.x, end.y].join(' ');
}

export function SovereigntyGauge({ score, category, size = 200 }: SovereigntyGaugeProps) {
	const radius = size / 2 - 30;
	const innerRadius = radius - 12;
	const outerRadius = radius - 4;
	const centerX = size / 2;
	const centerY = size / 2;

	const angle = scoreToAngle(score);
	const color = CATEGORY_COLORS[category];

	// Gauge-Ring Segmente für alle Kategorien (Hintergrund)
	const segmentPaths = CATEGORY_RANGES.map((range, idx) => {
		const nextRange = CATEGORY_RANGES[idx + 1];
		const endAngle = nextRange ? nextRange.angle : 270;
		const path = describeArc(centerX, centerY, outerRadius, range.angle, endAngle);

		return (
			<g key={range.category}>
				{/* Hintergrund-Segment (hell) */}
				<path d={path} stroke={CATEGORY_COLORS[range.category]} strokeWidth={outerRadius - innerRadius} fill="none" opacity="0.2" />
			</g>
		);
	});

	// Aktiver Gauge-Ring (zeigt Score)
	const activePath = describeArc(centerX, centerY, outerRadius, 0, angle);

	// Nadel/Zeiger
	const needleEnd = polarToCartesian(centerX, centerY, innerRadius - 8, angle);

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			className="sovereignty-gauge"
			role="img"
			aria-label={`Sovereignty Score: ${score}/100 (${category})`}
		>
			{/* Hintergrund-Segmente (alle Kategorien) */}
			{segmentPaths}

			{/* Aktiver Fortschritts-Ring */}
			<path
				d={activePath}
				stroke={color}
				strokeWidth={outerRadius - innerRadius}
				fill="none"
				strokeLinecap="round"
				style={{
					transition: 'all 0.5s ease-in-out',
					filter: `drop-shadow(0 0 4px ${color}40)`,
				}}
			/>

			{/* Kategorie-Markierungs-Linien */}
			{CATEGORY_RANGES.map((range) => {
				const start = polarToCartesian(centerX, centerY, innerRadius - 2, range.angle);
				const end = polarToCartesian(centerX, centerY, outerRadius + 6, range.angle);
				return <line key={`marker-${range.angle}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#999" strokeWidth="1" opacity="0.5" />;
			})}

			{/* Nadel/Zeiger */}
			<line
				x1={centerX}
				y1={centerY}
				x2={needleEnd.x}
				y2={needleEnd.y}
				stroke={color}
				strokeWidth="3"
				strokeLinecap="round"
				style={{
					transition: 'all 0.5s ease-in-out',
					filter: `drop-shadow(0 0 2px ${color}60)`,
				}}
			/>

			{/* Mittelpunkt-Kreis */}
			<circle cx={centerX} cy={centerY} r="6" fill={color} opacity="0.8" />

			{/* Score-Text Hintergrund-Rechteck (unten in der Lücke) */}
			<rect x={centerX - 28} y={centerY + radius - 10} width="56" height="30" rx="5" ry="5" fill="white" stroke={color} strokeWidth="2" opacity="0.95" />

			{/* Score-Text in der unteren Lücke */}
			<text x={centerX} y={centerY + radius + 5} textAnchor="middle" dominantBaseline="middle" fontSize={Math.round(size * 0.16)} fontWeight="700" fill={color}>
				{score}
			</text>
		</svg>
	);
}
