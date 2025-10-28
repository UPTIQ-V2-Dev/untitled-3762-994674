import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { CalculatorButtonConfig } from '../../types/calculator';

interface CalculatorButtonProps {
  button: CalculatorButtonConfig;
  onClick: (value: string) => void;
  disabled?: boolean;
}

export const CalculatorButton = ({ button, onClick, disabled }: CalculatorButtonProps) => {
  const handleClick = () => {
    onClick(button.value);
  };

  const getButtonVariant = () => {
    switch (button.type) {
      case 'number':
        return 'secondary';
      case 'operation':
        return 'default';
      case 'function':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Button
      variant={getButtonVariant()}
      size="lg"
      className={cn(
        'h-16 text-xl font-semibold transition-all duration-100 active:scale-95',
        button.type === 'number' && 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600',
        button.type === 'operation' && 'bg-orange-500 hover:bg-orange-600 text-white',
        button.type === 'function' && 'bg-gray-600 hover:bg-gray-500 text-white',
        button.className
      )}
      onClick={handleClick}
      disabled={disabled}
      data-testid={`btn-${button.value}`}
    >
      {button.label}
    </Button>
  );
};