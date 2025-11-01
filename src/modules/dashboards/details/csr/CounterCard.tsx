export function CounterCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-emerald-600 text-white rounded-lg p-4 flex flex-col items-center justify-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm mt-1 text-center">{label}</div>
    </div>
  );
}
