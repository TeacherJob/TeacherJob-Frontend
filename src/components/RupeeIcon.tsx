// components/icons/RupeeIcon.tsx
import { LucideProps } from "lucide-react";

const RupeeIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="M6 13l8.5 8" />
    <path d="M6 13h3a6 6 0 0 0 0-12" />
  </svg>
);

export default RupeeIcon;
