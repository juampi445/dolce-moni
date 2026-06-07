import styles from "./ShapeDivider.module.scss";

type Variant = "waves" | "curve";
type Position = "top" | "bottom";

// Decorative shape dividers. The svg path is filled with `currentColor`, so the
// surrounding section colours it via CSS (defaults to the sunken surface). Each
// divider is positioned OUTSIDE its section — overlapping the neighbour — so the
// transparent areas reveal the neighbour's background and the solid edge meets
// the host section seamlessly.
const PATHS: Record<Variant, string> = {
  waves:
    "M0 0v60c9 0 18-3 25-10 13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s37 13 50 0c14-14 37-14 50 0 7 7 16 10 25 10V0H0Z",
  curve: "M1000 100C500 100 500 4 0 4V0h1000v100Z",
};

export function ShapeDivider({
  variant,
  position,
  flipX = false,
  flipY = false,
  className,
}: {
  variant: Variant;
  position: Position;
  flipX?: boolean;
  flipY?: boolean;
  className?: string;
}) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;

  return (
    <div
      className={[styles.divider, styles[variant], styles[position], className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        style={{ transform: `scale(${sx}, ${sy})` }}
      >
        <path d={PATHS[variant]} />
      </svg>
    </div>
  );
}
