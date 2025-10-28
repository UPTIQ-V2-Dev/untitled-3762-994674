# Calculator App - Technical Implementation Plan

## Project Overview
Simple calculator app built with React 19, Vite, shadcn/ui, and Tailwind CSS v4.

## Pages & Components Structure

### 1. Main Calculator Page (`/`)
**File**: `src/pages/CalculatorPage.tsx`
- **Components Used**:
  - `Calculator` - Main calculator component
  - `Card` (shadcn/ui) - Container wrapper
- **Features**:
  - Basic arithmetic operations (+, -, ×, ÷)
  - Clear/All Clear functionality
  - Decimal point support
  - Keyboard input support

### 2. Components

#### Calculator Component
**File**: `src/components/Calculator/Calculator.tsx`
- **Sub-components**:
  - `Display` - Shows current number and calculations
  - `ButtonGrid` - Layout for calculator buttons
  - `CalculatorButton` - Individual button component
- **State Management**:
  - Current display value
  - Previous value
  - Current operation
  - Calculation history (optional)

#### Display Component
**File**: `src/components/Calculator/Display.tsx`
- Shows current input/result
- Handles number formatting
- Error display for invalid operations

#### ButtonGrid Component
**File**: `src/components/Calculator/ButtonGrid.tsx`
- Grid layout for all calculator buttons
- Uses shadcn/ui `Button` component
- Responsive design with Tailwind

#### CalculatorButton Component
**File**: `src/components/Calculator/CalculatorButton.tsx`
- Extends shadcn/ui `Button`
- Different variants for numbers/operations
- Click and keyboard event handling

### 3. Hooks

#### useCalculator Hook
**File**: `src/hooks/useCalculator.ts`
- Manages calculator state and logic
- Handles arithmetic operations
- Input validation
- Error handling (division by zero, etc.)

#### useKeyboardInput Hook
**File**: `src/hooks/useKeyboardInput.ts`
- Keyboard event listeners
- Key mapping to calculator functions
- Focus management

### 4. Utils

#### Calculator Utils
**File**: `src/utils/calculator.ts`
- `performCalculation(a, b, operation)` - Core math operations
- `formatNumber(number)` - Number display formatting
- `isValidInput(input)` - Input validation
- `parseInput(input)` - Input parsing

#### Constants
**File**: `src/utils/constants.ts`
- Button configurations
- Operation mappings
- Error messages
- Keyboard key mappings

### 5. Types

#### Calculator Types
**File**: `src/types/calculator.ts`
```typescript
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
```

### 6. Styles

#### Calculator Styles
**File**: `src/components/Calculator/Calculator.module.css` (if needed)
- Custom animations for button presses
- Calculator-specific responsive breakpoints
- Dark/light theme variations using CSS variables

### 7. Layout & Common Components

#### Layout Component (if needed)
**File**: `src/components/Layout/Layout.tsx`
- Basic app wrapper
- Theme provider integration
- Responsive container

## Technical Implementation Details

### State Management
- Use React's `useReducer` for complex calculator state
- Context API for theme management (already available via next-themes)

### Styling Approach
- Tailwind CSS v4 utility classes
- shadcn/ui component variants
- Responsive design (mobile-first)
- Support for existing theme system

### Keyboard Support
- Number keys (0-9)
- Operation keys (+, -, *, /)
- Enter for equals
- Escape for clear
- Backspace for delete last digit

### Error Handling
- Division by zero
- Invalid operations
- Number overflow
- Input validation

## Testing Strategy

### Unit/Component Tests
**Framework**: Vitest + React Testing Library

#### Test File Organization
```
src/
├── components/
│   └── Calculator/
│       ├── __tests__/
│       │   ├── Calculator.test.tsx
│       │   ├── Display.test.tsx
│       │   ├── ButtonGrid.test.tsx
│       │   └── CalculatorButton.test.tsx
├── hooks/
│   └── __tests__/
│       ├── useCalculator.test.ts
│       └── useKeyboardInput.test.ts
├── utils/
│   └── __tests__/
│       └── calculator.test.ts
└── pages/
    └── __tests__/
        └── CalculatorPage.test.tsx
```

#### Test Setup Files
- `src/setupTests.ts` - Test environment configuration
- `src/test-utils.tsx` - Custom render with providers
- `vitest.config.ts` - Vitest configuration

#### Key Test Cases

**Calculator Component Tests**:
- Basic arithmetic operations (2+2=4)
- Chain operations (2+2+2=6)
- Decimal calculations (1.5+2.5=4)
- Clear functionality
- Error states (division by zero)
- Display updates correctly

**Display Component Tests**:
- Number formatting
- Long number handling
- Error message display
- Decimal point display

**ButtonGrid Tests**:
- Button rendering
- Click events
- Keyboard events
- Button variants/styling

**Hooks Tests**:
- `useCalculator`: State transitions, calculations, error handling
- `useKeyboardInput`: Key mapping, event handling

**Utils Tests**:
- `performCalculation`: All arithmetic operations, edge cases
- `formatNumber`: Number formatting, scientific notation
- `isValidInput`: Input validation rules

#### Service/API Mocking Strategy
**Framework**: MSW (Mock Service Worker)
- Not required for basic calculator (no API calls)
- If adding features like calculation history storage:
  - Mock localStorage operations
  - Mock API endpoints for cloud sync

#### Test Utilities
**File**: `src/test-utils.tsx`
```typescript
// Custom render with theme providers
export function renderWithProviders(ui: ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider>{children}</ThemeProvider>
    ),
    ...options,
  });
}

// Calculator test helpers
export const calculatorTestUtils = {
  clickButton: (container: HTMLElement, value: string),
  typeSequence: (container: HTMLElement, sequence: string[]),
  getDisplay: (container: HTMLElement) => string,
};
```

#### Example Test Patterns

**Component Test Example**:
```typescript
// Calculator.test.tsx
describe('Calculator Component', () => {
  test('performs basic addition', async () => {
    const { getByText, getByTestId } = renderWithProviders(<Calculator />);
    
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('='));
    
    expect(getByTestId('display')).toHaveTextContent('4');
  });
});
```

**Hook Test Example**:
```typescript
// useCalculator.test.ts
describe('useCalculator Hook', () => {
  test('handles chain calculations', () => {
    const { result } = renderHook(() => useCalculator());
    
    act(() => result.current.inputNumber('2'));
    act(() => result.current.inputOperation('+'));
    act(() => result.current.inputNumber('3'));
    act(() => result.current.calculate());
    
    expect(result.current.display).toBe('5');
  });
});
```

#### Test Scripts (package.json)
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

## Implementation Phases

### Phase 1: Core Structure
1. Create basic calculator layout
2. Implement display component
3. Add number input functionality

### Phase 2: Operations
1. Implement basic arithmetic operations
2. Add clear/reset functionality
3. Handle decimal point operations

### Phase 3: Enhanced Features
1. Keyboard input support
2. Error handling and validation
3. Polish UI/UX with animations

### Phase 4: Testing & Polish
1. Comprehensive test suite
2. Accessibility improvements
3. Performance optimizations
4. Cross-browser testing

## Dependencies Required
All necessary dependencies are already included in the current `package.json`. No additional installations needed.

## File Structure Summary
```
src/
├── components/
│   └── Calculator/
│       ├── Calculator.tsx
│       ├── Display.tsx
│       ├── ButtonGrid.tsx
│       └── CalculatorButton.tsx
├── hooks/
│   ├── useCalculator.ts
│   └── useKeyboardInput.ts
├── pages/
│   └── CalculatorPage.tsx
├── types/
│   └── calculator.ts
├── utils/
│   ├── calculator.ts
│   └── constants.ts
└── __tests__/ (distributed alongside components)
```