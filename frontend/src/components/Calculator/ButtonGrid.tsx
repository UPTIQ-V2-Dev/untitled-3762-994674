import { CalculatorButton } from './CalculatorButton';
import { CALCULATOR_BUTTONS } from '../../utils/constants';

interface ButtonGridProps {
  onButtonClick: (value: string) => void;
}

export const ButtonGrid = ({ onButtonClick }: ButtonGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {CALCULATOR_BUTTONS.map((button, index) => (
        <CalculatorButton
          key={`${button.value}-${index}`}
          button={button}
          onClick={onButtonClick}
        />
      ))}
    </div>
  );
};