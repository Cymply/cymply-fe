import { JSX } from "react";

export interface AlertButton {
  label: string;
  action: () => void;
}

export interface AlertConfig {
  open: boolean;
  title: string | JSX.Element;
  message: string | JSX.Element;
  buttons?: AlertButton[];
}
