import { PropsWithChildren } from "react";
import "./styles.scss";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  onClick?: () => void;
  tooltipText?: string;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  size = "medium",
  color = "primary",
  onClick,
  tooltipText = "",
  children,
}) => {
  return (
    <button
      className={`shared-button color-${color} size-${size}`}
      onClick={onClick}
      title={tooltipText}
      aria-label={tooltipText || undefined}
    >
      {children}
    </button>
  );
};

export default Button;
