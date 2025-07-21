import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

export default function Portal({ children, containerId }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    if (containerId) {
      const el = document.getElementById(containerId);
      if (el) setContainer(el);
    }
  }, [containerId]);

  if (!mounted) return null;

  return createPortal(children, container ?? document.body);
}
