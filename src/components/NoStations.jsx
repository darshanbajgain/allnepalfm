import { AlertCircle } from "lucide-react";

export function NoStationsMessage({ province }) {
  return (
    <div className="flex items-center justify-center p-8 bg-yellow-50 rounded-lg">
      <AlertCircle className="w-6 h-6 text-yellow-500 mr-2" />
      <p className="text-lg font-medium text-yellow-700">
        No stations available for {province}
      </p>
    </div>
  );
}
