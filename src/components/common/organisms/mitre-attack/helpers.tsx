type Pattern = {
  patternId: string;
  name: string;
  description: string;
  url: string;
  tactics: string[];
  dataSources?: string[];
  defenseBypassed?: string[];
  permissionsRequired?: string[];
  platforms?: string[];
  version?: string;
};

type TacticCategory = {
  label: string;
  items: Pattern[];
};

export const categorizeByTactic = (patterns: Pattern[]) => {
  const result: Record<string, TacticCategory> = {};

  for (const pattern of patterns) {
    for (const tactic of pattern.tactics) {
      if (!result[tactic]) {
        result[tactic] = {
          label: tactic
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" "),
          items: [],
        };
      }
      result[tactic].items.push(pattern);
    }
  }

  return result;
};
