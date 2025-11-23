import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function PressableButton({ children, className = "", ...props }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Button
      {...props}
      className={`
        transition active:scale-95
        ${pressed ? "scale-95 opacity-90" : ""}
        ${className}
      `}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {children}
    </Button>
  );
}
