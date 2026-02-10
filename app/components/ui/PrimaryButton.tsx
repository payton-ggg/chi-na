import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  href?: string;
}

export default function PrimaryButton({
  children,
  onClick,
  className = "",
  showArrow = true,
  href,
}: PrimaryButtonProps) {
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowRight
          size={20}
          className="relative z-10 transition-transform group-hover:translate-x-1"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-r from-primary-scarlet-500 to-primary-scarlet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  );

  const baseClasses = `group relative w-full sm:w-auto px-10 py-5 bg-primary-scarlet-600 hover:bg-primary-scarlet-700 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-scarlet-600/40 flex items-center justify-center gap-3 overflow-hidden ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
