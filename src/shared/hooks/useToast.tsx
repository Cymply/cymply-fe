import Image from "next/image";
import { toast } from "sonner";

interface ToastProps {
  message: string;
  type?: "default" | "success" | "warning" | "error";
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export const useToast = () => {
  const addToast = ({ message, type }: ToastProps) => {
    switch (type) {
      case "success":
        toast.success(message, {
          icon: (
            <Image
              src="/icons/ico-toast-success.svg"
              alt="ico-toast-success"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          ),
          action: {
            label: (
              <Image
                src="/icons/ico-close-white.svg"
                alt="ico-close-white"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            ),
            onClick: () => {
              toast.dismiss();
            },
          },
        });
        break;
      case "warning":
        toast.warning(message, {
          icon: (
            <Image
              src="/icons/ico-toast-warning.svg"
              alt="ico-toast-warning"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          ),
          action: {
            label: (
              <Image
                src="/icons/ico-close-white.svg"
                alt="ico-close-white"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            ),
            onClick: () => {
              toast.dismiss();
            },
          },
        });
        break;
      case "error":
        toast.error(message, {
          icon: (
            <Image
              src="/icons/ico-toast-warning.svg"
              alt="ico-toast-warning"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          ),
          action: {
            label: (
              <Image
                src="/icons/ico-close-white.svg"
                alt="ico-close-white"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            ),
            onClick: () => {
              toast.dismiss();
            },
          },
        });
        break;
      default:
        toast(message, {
          icon: (
            <Image
              src="/icons/ico-toast-warning.svg"
              alt="ico-toast-warning"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          ),
          action: {
            label: (
              <Image
                src="/icons/ico-close-white.svg"
                alt="ico-close-white"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            ),
            onClick: () => {
              toast.dismiss();
            },
          },
        });
        break;
    }
  };

  return { addToast };
};
