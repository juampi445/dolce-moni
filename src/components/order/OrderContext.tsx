"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Producto } from "@/types/producto";

export interface OrderItem {
  producto: Producto;
  cantidad: number;
  variante: string | null;
}

interface OrderContextValue {
  items: OrderItem[];
  count: number;
  totalARS: number;
  isOpen: boolean;
  add: (producto: Producto, variante?: string | null) => void;
  remove: (id: string, variante: string | null) => void;
  setCantidad: (id: string, variante: string | null, cantidad: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const Ctx = createContext<OrderContextValue | null>(null);

function sameLine(a: OrderItem, id: string, variante: string | null): boolean {
  return a.producto.id === id && a.variante === variante;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((producto: Producto, variante: string | null = null) => {
    setItems((prev) => {
      const idx = prev.findIndex((l) => sameLine(l, producto.id, variante));
      if (idx >= 0) {
        const next = prev.slice();
        next[idx] = { ...next[idx], cantidad: next[idx].cantidad + 1 };
        return next;
      }
      return [...prev, { producto, variante, cantidad: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((id: string, variante: string | null) => {
    setItems((prev) => prev.filter((l) => !sameLine(l, id, variante)));
  }, []);

  const setCantidad = useCallback((id: string, variante: string | null, cantidad: number) => {
    setItems((prev) => {
      if (cantidad <= 0) return prev.filter((l) => !sameLine(l, id, variante));
      return prev.map((l) => (sameLine(l, id, variante) ? { ...l, cantidad } : l));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<OrderContextValue>(() => {
    const count = items.reduce((s, l) => s + l.cantidad, 0);
    const totalARS = items.reduce((s, l) => s + l.producto.precio * l.cantidad, 0);
    return {
      items,
      count,
      totalARS,
      isOpen,
      add,
      remove,
      setCantidad,
      clear,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((v) => !v),
    };
  }, [items, isOpen, add, remove, setCantidad, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}
