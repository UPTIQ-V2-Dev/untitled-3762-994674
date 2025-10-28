export type Operation = '+' | '-' | '*' | '/' | '=';
export type ButtonType = 'number' | 'operation' | 'function';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation | null;
  waitingForOperand: boolean;
}

export interface CalculatorButton {
  label: string;
  value: string;
  type: ButtonType;
  className?: string;
}

export interface CalculatorButtonConfig {
  label: string;
  value: string;
  type: ButtonType;
  className?: string;
  gridArea?: string;
}