import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';

export const renderWithProviders = (ui: ReactElement, options = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <BrowserRouter>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    ),
    ...options,
  });
};

// Calculator test helpers
export const calculatorTestUtils = {
  clickButton: (container: HTMLElement, value: string) => {
    const button = container.querySelector(`[data-testid="btn-${value}"]`);
    if (button) {
      (button as HTMLElement).click();
    }
  },
  typeSequence: (container: HTMLElement, sequence: string[]) => {
    sequence.forEach(value => calculatorTestUtils.clickButton(container, value));
  },
  getDisplay: (container: HTMLElement): string => {
    const display = container.querySelector('[data-testid="display"]');
    return display?.textContent || '';
  },
};