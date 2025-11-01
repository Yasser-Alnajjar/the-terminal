/**
 * Convert definition.items (containers) -> flat widgets[]
 * Each widget gets metadata: containerIndex, colIndex
 */
export function definitionToWidgets(def: any) {
  const res: any[] = [];
  (def.items || []).forEach((container: any, containerIndex: number) => {
    (container.items || []).forEach((item: any, colIndex: number) => {
      // القيم الافتراضية
      let w = 4;
      let h = 4;

      // 🟩 أي line chart تاخد المساحة الكاملة
      if (item.type === "line") {
        w = 12;
        h = 6;
      }

      res.push({
        ...item,
        __containerIndex: containerIndex,
        __colIndex: colIndex,
        layout: {
          i: item.id,
          x: 0,
          y: containerIndex * 4,
          w,
          h,
        },
      });
    });
  });
  return res;
}

/**
 * Convert widgets (flat) back -> definition object (mutates/returns newDef)
 * Uses original definition to keep other fields (period, etc.)
 */
export function widgetsToDefinition(widgets: any[], originalDef: any) {
  const newDef = { ...originalDef, items: [] as any[] };

  const containersMap: Map<number, any[]> = new Map();
  widgets.forEach((w) => {
    const c = typeof w.__containerIndex === "number" ? w.__containerIndex : 0;
    if (!containersMap.has(c)) containersMap.set(c, []);

    const copy = { id: w.id, type: w.type, options: w.options || {} };
    containersMap.get(c)!.push(copy);
  });

  const indexes = Array.from(containersMap.keys()).sort((a, b) => a - b);
  newDef.items = indexes.map((idx) => ({
    type: "container",
    items: containersMap.get(idx),
  }));

  return newDef;
}

/**
 * Create a new TH item conforming to TheHive schema minimal shape
 */
export function makeNewItem(type: string) {
  const id = Math.random().toString(36).slice(2);
  const baseOptions: any = { title: `New ${type}` };

  // default small templates per type
  if (type === "line")
    baseOptions.series = [
      {
        agg: "count",
        label: "New series",
        entity: "alert",
        dateField: "_createdAt",
      },
    ];
  if (type === "donut")
    baseOptions.customize = [
      { name: "a", label: "A", color: "#36cfc9", value: 0 },
    ];
  if (type === "counter") baseOptions.series = [{ label: "KPI", value: 0 }];
  if (type === "gauge") baseOptions.value = 0;
  if (type === "radar")
    baseOptions.customize = [{ name: "a", label: "A", value: 0 }];

  // 🟩 line chart full width by default
  const layout =
    type === "line"
      ? { i: id, x: 0, y: 0, w: 12, h: 6 }
      : { i: id, x: 0, y: 0, w: 4, h: 4 };

  return {
    id,
    type,
    options: baseOptions,
    __containerIndex: 0,
    __colIndex: 0,
    layout,
  };
}
