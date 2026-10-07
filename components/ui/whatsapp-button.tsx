import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({ phone, message = "Hello!", className }: WhatsAppButtonProps) {
  const href = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={cn("fixed bottom-24 right-6 z-40 rounded-full bg-emerald-500 p-4 text-white shadow-lg", className)}>
      <MessageCircle aria-hidden="true" />
    </a>
  );
}
