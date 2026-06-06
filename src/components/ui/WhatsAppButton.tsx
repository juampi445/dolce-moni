import styles from "./WhatsAppButton.module.scss";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface Props {
  mensaje: string;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  className?: string;
}

export function WhatsAppButton({ mensaje, label, size = "md", variant = "solid", className }: Props) {
  const cls = [
    styles.button,
    size === "lg" ? styles.lg : size === "sm" ? styles.sm : "",
    variant === "outline" ? styles.outline : "",
    className ?? "",
  ].filter(Boolean).join(" ");
  return (
    <a className={cls} href={buildWhatsAppLink(mensaje)} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon className={styles.icon} />
      {label}
    </a>
  );
}
