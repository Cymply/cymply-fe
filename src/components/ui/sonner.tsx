import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast custom-toast bg-black-500",
          description: "custom-description",
          actionButton: "custom-action-button !bg-transparent",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
