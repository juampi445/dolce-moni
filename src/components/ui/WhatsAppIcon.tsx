interface Props {
  /** CSS size for both width and height. Defaults to "1em" so it scales with text. */
  size?: string | number;
  className?: string;
}

/**
 * Single source of truth for the WhatsApp glyph.
 * Defaults to 1em so it tracks the surrounding font-size — buttons, links, the
 * contact card and the floating action all consume this so the icon never
 * looks larger or smaller than the type next to it.
 */
export function WhatsAppIcon({ size = "1em", className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.6 15.05L2 22l5.06-1.33A10 10 0 0 0 22 12a9.94 9.94 0 0 0-2.95-7.09ZM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3 .79.8-2.93-.2-.31A8.13 8.13 0 1 1 20.13 12 8.14 8.14 0 0 1 12 20.13Zm4.47-6.1c-.24-.12-1.44-.71-1.66-.79s-.39-.12-.55.12-.63.79-.78.95-.28.18-.52.06a6.7 6.7 0 0 1-3.36-2.94c-.25-.43.25-.4.72-1.34a.45.45 0 0 0 0-.43c-.06-.12-.55-1.33-.76-1.83s-.4-.41-.55-.42h-.47a.91.91 0 0 0-.66.31 2.78 2.78 0 0 0-.87 2.06 4.82 4.82 0 0 0 1 2.56 11 11 0 0 0 4.22 3.74c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.56.1 2.55 2.55 0 0 0 1.67-1.18 2.07 2.07 0 0 0 .14-1.18c-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
