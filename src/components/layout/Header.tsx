"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import { SITE } from "@/lib/config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { mensajeGenerico } from "@/lib/whatsapp";

const links = [
  { href: "#productos", label: "Carta" },
  { href: "#pedido", label: "Cómo pedir" },
  { href: "#mayoristas", label: "Mayoristas" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label={`${SITE.name} — inicio`}>
          <span className={styles.brandMark} aria-hidden="true">
            <Image src="/logo-muffin.svg" alt="" width={48} height={48} priority />
          </span>
          {SITE.name}
        </a>
        <nav className={styles.nav} aria-label="Secciones">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.navLink}>{l.label}</a>
          ))}
        </nav>
        <div className={styles.cta}>
          <WhatsAppButton mensaje={mensajeGenerico()} label="Pedir" size="sm" />
        </div>
      </div>
    </header>
  );
}
