interface Pattern {
  _id: string;
  patternId: string;
  name: string;
  children?: Pattern[];
}

function groupPatterns(patterns: Pattern[]): Pattern[] {
  const patternMap = new Map<string, Pattern>();
  const result: Pattern[] = [];

  for (const pattern of patterns) {
    patternMap.set(pattern.patternId, { ...pattern, children: [] });
  }

  for (const pattern of patterns) {
    const parts = pattern.patternId.split(".");
    if (parts.length > 1) {
      const parentId = parts[0];
      const parent = patternMap.get(parentId);
      if (parent) {
        parent.children!.push(patternMap.get(pattern.patternId)!);
      }
    }
  }

  for (const [id, pattern] of patternMap.entries()) {
    if (!id.includes(".")) {
      result.push(pattern);
    }
  }

  return result;
}

export { groupPatterns };
