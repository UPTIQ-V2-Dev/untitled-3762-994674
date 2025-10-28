import { cn } from '../../lib/utils';

interface DisplayProps {
  value: string;
  className?: string;
}

export const Display = ({ value, className }: DisplayProps) => {
  const displayValue = value || '0';
  
  // Adjust font size based on display length to prevent overflow
  const getFontSizeClass = () => {
    if (displayValue.length > 12) return 'text-2xl';
    if (displayValue.length > 8) return 'text-3xl';
    if (displayValue.length > 6) return 'text-4xl';
    return 'text-5xl';
  };

  return (
    <div
      className={cn(
        'bg-black text-white p-6 rounded-lg mb-4 min-h-20 flex items-center justify-end',
        className
      )}
    >
      <div
        className={cn(
          'font-mono font-light tracking-wider break-all text-right',
          getFontSizeClass()
        )}
        data-testid="display"
      >
        {displayValue}
      </div>
    </div>
  );
};