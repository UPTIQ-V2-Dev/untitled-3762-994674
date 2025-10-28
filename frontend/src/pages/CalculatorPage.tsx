import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calculator } from '../components/Calculator/Calculator';

export const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Calculator />
        </CardContent>
      </Card>
    </div>
  );
};