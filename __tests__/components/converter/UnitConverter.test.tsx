import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnitConverter from '@/components/converter/UnitConverter';
import '@testing-library/jest-dom';

// Mock the data/units module
jest.mock('@/data/units', () => ({
  ...jest.requireActual('@/data/units'), // Import and retain default behavior
  getUnitsByType: (unitType: string) => {
    if (unitType === 'length') {
      return [
        { value: 'cm', label: '센티미터', symbol: 'cm' },
        { value: 'm', label: '미터', symbol: 'm' },
        { value: 'km', label: '킬로미터', symbol: 'km' },
        { value: 'inch', label: '인치', symbol: 'in' },
        { value: 'ft', label: '피트', symbol: 'ft' },
      ];
    }
    if (unitType === 'weight') {
      return [
        { value: 'g', label: '그램', symbol: 'g' },
        { value: 'kg', label: '킬로그램', symbol: 'kg' },
        { value: 'lb', label: '파운드', symbol: 'lb' },
      ];
    }
    if (unitType === 'temperature') {
        return [
            { value: 'celsius', label: '섭씨', symbol: '°C' },
            { value: 'fahrenheit', label: '화씨', symbol: '°F' },
            { value: 'kelvin', label: '켈빈', symbol: 'K' },
        ];
    }
    return [];
  },
  convertUnit: (value: number, fromUnit: string, toUnit: string, unitType: string) => {
    // Simplified mock conversion for testing UI flow, not actual logic
    if (value === 0) return 0;
    if (unitType === 'length') {
      if (fromUnit === 'cm' && toUnit === 'm') return value / 100;
      if (fromUnit === 'm' && toUnit === 'cm') return value * 100;
    }
    if (unitType === 'weight') {
      if (fromUnit === 'g' && toUnit === 'kg') return value / 1000;
      if (fromUnit === 'kg' && toUnit === 'g') return value * 1000;
    }
    if (unitType === 'temperature') {
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return (value * 9/5) + 32;
    }
    return value; // Fallback
  },
}));

describe('UnitConverter', () => {
  test('renders initial content with default tab (length)', () => {
    render(<UnitConverter />);
    
    // Check if the "길이" tab is active/present
    expect(screen.getByRole('tab', { name: '길이' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '길이' })).toHaveAttribute('aria-selected', 'true');

    // Check for input elements related to length
    expect(screen.getByLabelText('변환할 값')).toBeInTheDocument();
    
    // Check for default selected units in SelectTriggers
    // For "from-unit" (센티미터)
    const fromUnitSelect = screen.getByRole('combobox', { name: '변환 전 단위' });
    expect(fromUnitSelect).toHaveTextContent(/센티미터/);
    expect(fromUnitSelect).toHaveTextContent(/cm/);

    // For "to-unit" (미터)
    const toUnitSelect = screen.getByRole('combobox', { name: '변환 후 단위' });
    expect(toUnitSelect).toHaveTextContent(/미터/);
    expect(toUnitSelect).toHaveTextContent(/m/);
    
    // Check if result section is present
    expect(screen.getByText('변환 결과')).toBeInTheDocument();
  });

  test('switches tabs and updates content', async () => {
    render(<UnitConverter />);
    
    // Switch to "무게" (weight) tab
    const weightTab = screen.getByRole('tab', { name: '무게' });
    await userEvent.click(weightTab);

    expect(weightTab).toHaveAttribute('aria-selected', 'true');

    // Check for default selected units in SelectTriggers for weight
    let fromUnitSelect = screen.getByRole('combobox', { name: '변환 전 단위' });
    expect(fromUnitSelect).toHaveTextContent(/그램/);
    let toUnitSelect = screen.getByRole('combobox', { name: '변환 후 단위' });
    expect(toUnitSelect).toHaveTextContent(/킬로그램/);
    
    // Switch to "온도" (temperature) tab
    const tempTab = screen.getByRole('tab', { name: '온도' });
    await userEvent.click(tempTab);
    expect(tempTab).toHaveAttribute('aria-selected', 'true');

    // Check for default selected units in SelectTriggers for temperature
    fromUnitSelect = screen.getByRole('combobox', { name: '변환 전 단위' });
    expect(fromUnitSelect).toHaveTextContent(/섭씨/);
    toUnitSelect = screen.getByRole('combobox', { name: '변환 후 단위' });
    expect(toUnitSelect).toHaveTextContent(/화씨/);
  });

  test('performs a basic conversion and result updates', async () => {
    render(<UnitConverter />);
    
    const input = screen.getByLabelText('변환할 값') as HTMLInputElement;
    await userEvent.type(input, '100'); // Input 100
    
    // Default units (length): cm to m. Mock: 100cm -> 1m
    let resultDisplay = await screen.findByTestId("conversion-result");
    expect(resultDisplay).toHaveTextContent("1 m");

    // Change to weight tab
    const weightTab = screen.getByRole('tab', { name: '무게' });
    await userEvent.click(weightTab); // Defaults to g -> kg

    // Input value persists, clear and type new
    fireEvent.change(input, { target: { value: '' } }); // Clear the input directly
    expect(input.value).toBe(''); // Check if input is cleared
    fireEvent.change(input, { target: { value: '1000' } }); // Input 1000 using fireEvent.change
    expect(input.value).toBe('1000'); // Check new input value
        
    // Default units (weight): g to kg. Mock: 1000g -> 1kg
    resultDisplay = await screen.findByTestId("conversion-result");
    expect(resultDisplay).toHaveTextContent("1 kg");
  });
});
