const renderArrayError = (error: any) => {
  if (!error) return null;

  if (typeof error === "string") return <span>{error}</span>;

  if (Array.isArray(error)) {
    const seen = new Set<string>();

    return (
      <ul className="list-disc list-inside text-xs text-error-300">
        {error.flatMap((rowError) => {
          if (rowError && typeof rowError === "object") {
            return Object.entries(rowError).map(([col, msg]) => {
              const key = `${col}-${msg}`;
              if (seen.has(key)) return null; // skip duplicate
              seen.add(key);
              return <li key={key}>{msg as string}</li>;
            });
          } else if (rowError) {
            if (seen.has(rowError)) return null;
            seen.add(rowError);
            return <li key={rowError}>{rowError}</li>;
          }
          return null;
        })}
      </ul>
    );
  }

  return null;
};

export { renderArrayError };
