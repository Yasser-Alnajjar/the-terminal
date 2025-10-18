import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import moment from "moment";

/**
 * Returns the given `obj` without the `property`.
 *
 * @param {Object} obj
 * @param {String} property
 *
 * @returns {Object}
 */
type AnyObject = Record<string, any>;
type EnumValueType = string | number;
const withoutProperty = (obj: AnyObject, property: string) => {
  if (Object.keys(obj).find((k) => k === property)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [property]: unused, ...rest } = obj;
    return rest;
  } else return obj;
};

const removeObjectKeys = <T extends AnyObject>(
  obj: T,
  keysToRemove: string[]
): T => {
  const newObj = {} as T;

  for (const key in obj) {
    if (!keysToRemove.includes(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};

const removePartialPrefix = (str: string, prefix: string): string => {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length); // Removes 'partial_' from the beginning
  }
  return str; // Return the string unchanged if it doesn't start with 'partial_'
};

const loadJSON = (path: string) => {
  return fetch(`${path}.json`, {
    headers: { "Cache-Control": "no-cache" },
  }).then((res) => res.json());
};

const objToArrayOfKeyAndValue = (obj?: any): Array<any> | undefined => {
  if (!obj) return undefined;
  const results: Array<any> = [];
  Object.keys(obj).map((key) => {
    results.push({ [key]: obj[key] });
  });
  return results;
};

const convertArrayOfKeyAndValuesToString = (
  items?: Array<any>,
  separator: string = ";"
): string | undefined => {
  if (!items || items.length <= 0) return undefined;
  const keyValueStrings = items.map((item) => {
    const objKey = Object.keys(item)[0];
    return `${objKey}:${item[objKey]}`;
  });
  return keyValueStrings.join(separator);
};
const findKeyByValue = (obj: any, value: any) =>
  (Object.keys(obj) as (keyof typeof obj)[]).find((key) => {
    return !Array.isArray(obj[key])
      ? obj[key] === value
      : !!obj[key].includes(value);
  });

const ascendingSortedData = (items: Array<any>, sortField: string) =>
  items.slice().sort((a, b) => a[sortField].localeCompare(b[sortField]));

// Sort in descending order by name
const descendingSortedData = (items: Array<any>, sortField: string) =>
  items.slice().sort((a, b) => b[sortField].localeCompare(a[sortField]));

const getObjFirstKey = (obj?: object) => Object.keys(obj as object)[0] || "";

const getType = (p: any): string => {
  if (Array.isArray(p)) return "array";
  else if (typeof p == "string") return "string";
  else if (p != null && typeof p == "object") return "object";
  else return "other";
};

const getFileExtension = (fileName: string) => {
  const regex = /\.\w{3,4}($|\?)/;
  const matchResult = fileName.match(regex);
  return matchResult?.[0] || null;
};

const toPascalCase = (input: string): string => {
  if (input) {
    // Replace hyphens and underscores with spaces
    const stringWithSpaces = input.replace(/[-_]/g, " ");

    // Split the string into words
    const words = stringWithSpaces.split(" ");

    // Capitalize the first letter of each word and join them
    const pascalCaseString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return pascalCaseString;
  }
  return input;
};

const generateCode = (
  length: number,
  charsOnly = false,
  digitsOnly = false
) => {
  let result = "";
  const characters = charsOnly
    ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    : digitsOnly
    ? "0123456789"
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

/**
 * Remove all specified keys from an object, no matter how deep they are.
 * The removal is done in place, so run it on a copy if you don't want to modify the original object.
 * This function has no limit so circular objects will probably crash the browser
 *
 * @param obj The object from where you want to remove the keys
 * @param keys An array of property names (strings) to remove
 */
const removeKeysDeep = (obj: AnyObject, keys: Array<string>) => {
  let index;
  for (const prop in obj) {
    // important check that this is objects own property
    // not from prototype prop inherited
    if (obj.hasOwnProperty(prop)) {
      switch (typeof obj[prop]) {
        case "object":
          index = keys.indexOf(prop);
          if (index > -1) {
            delete obj[prop];
          } else {
            removeKeysDeep(obj[prop], keys);
          }
          break;
        default:
          keys.forEach((k) => {
            if (k === prop) delete obj[prop];
          });
          break;
      }
    }
  }
};

const enumKeyByValue = (enumObj: AnyObject, val: string): string => {
  const indexOfS = Object.values(enumObj).indexOf(
    val as unknown as typeof enumObj
  );

  const key = Object.keys(enumObj)[indexOfS];

  return key;
};

const decodeJWT = (token: string) =>
  JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

const formatDate = (
  date?: string,
  fromNow?: true,
  time?: "12" | "24",
  format?: string
): string => {
  if (!isNaN(new Date(date || "").getTime())) {
    let newDate = "";
    if (format) newDate = moment(date).format(format);
    else if (fromNow) newDate = moment(date).fromNow(true);
    else if (time) {
      switch (time) {
        case "12":
          newDate = moment(date).format("DD MMM YYYY h:mm A");
          break;
        default:
          newDate = moment(date).format("DD MMM YYYY HH:mm:ss");
          break;
      }
    } else newDate = new Date(date!).toLocaleDateString("en-EG");
    return newDate;
  }
  return date || "";
};

const numberWithCommas = (val?: number) => {
  return (val || 0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

const formatCash = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  return "";
};

function getTodayDateRanges(format: string = "YYYY-MM-DD"): {
  today: { start: string; end: string };
  lastWeek: { start: string; end: string };
  thisWeek: { start: string; end: string };
  thisMonth: { start: string; end: string };
  thisYear: { start: string; end: string };
} {
  const today = moment().format(format);
  const thisWeekStart = moment().startOf("isoWeek").format(format);
  const thisWeekEnd = moment().endOf("isoWeek").format(format);
  const thisMonthStart = moment().startOf("month").format(format);
  const thisMonthEnd = moment().endOf("month").format(format);
  const thisYearStart = moment().startOf("year").format(format);
  const thisYearEnd = moment().endOf("year").format(format);
  const lastWeek = moment().subtract(6, "days").startOf("day").format(format);

  return {
    today: { start: today, end: today },
    lastWeek: { start: lastWeek, end: today },
    thisWeek: { start: thisWeekStart, end: thisWeekEnd },
    thisMonth: { start: thisMonthStart, end: thisMonthEnd },
    thisYear: { start: thisYearStart, end: thisYearEnd },
  };
}

const getMonthNumberFromName = (monthName: string): number => {
  const year = new Date().getFullYear();
  return new Date(`${monthName} 1, ${year}`).getMonth() + 1;
};

const isDate = (value: any): boolean => {
  return Object.prototype.toString.call(value) === "[object Date]";
};

const cleanEmpty = (obj: any): AnyObject => {
  if (Array.isArray(obj)) {
    return obj
      .map((v) =>
        v && typeof v === "object" && !isDate(v) ? cleanEmpty(v) : v
      )
      .filter((v) => v !== null && v !== undefined) as AnyObject[];
  } else {
    return Object.entries(obj).reduce((acc, [k, v]) => {
      if (v !== null && v !== undefined && v !== "") {
        acc[k] = typeof v === "object" && !isDate(v) ? cleanEmpty(v) : v;
      }
      return acc;
    }, {} as AnyObject);
  }
};

const cleanEmptyArray = (arr: any[]): any[] => {
  return arr
    .map((v) =>
      v && typeof v === "object" && !isDate(v)
        ? Array.isArray(v)
          ? cleanEmptyArray(v)
          : cleanEmpty(v)
        : v
    )
    .filter((v) => v !== null && v !== undefined && v !== "");
};

const generateQueryString = (
  params: AnyObject,
  checkNullish: boolean = true
): string => {
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key];

      const checkIfArray = (value: any, key: string) => {
        if (Array.isArray(value)) return `${key}=${value.join(",")}`;
        else return `${key}=${value.toString()}`;
      };

      if (checkNullish) {
        if (value !== null && value !== undefined && value.toString() !== "") {
          return checkIfArray(value, key);
        }
        return "";
      } else return checkIfArray(value, key);
    })
    .filter((param) => (checkNullish ? param !== "" : true))
    .join("&");

  return queryString ? `?${queryString}` : "";
};

const cleanEmptyAndZeros = (obj: any): AnyObject => {
  if (Array.isArray(obj)) {
    return obj
      .map((v) =>
        v && typeof v === "object" && !isDate(v) ? cleanEmpty(v) : v
      )
      .filter(
        (v) => v !== null && v !== undefined && v.toString() !== "0"
      ) as AnyObject[];
  } else {
    return Object.entries(obj).reduce((acc, [k, v]) => {
      if (v !== null && v !== undefined && v !== "" && v.toString() !== "0") {
        acc[k] = typeof v === "object" && !isDate(v) ? cleanEmpty(v) : v;
      }
      return acc;
    }, {} as AnyObject);
  }
};

const sleep = (ms?: number | undefined) =>
  new Promise((r) => setTimeout(r, ms));

// Function to check array of Interface1 or Interface2
function isArrayOfType(arr: any[], typeGuard: (obj: any) => boolean): boolean {
  return arr.every(typeGuard);
}

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const compareValues = (
  source: any,
  target: any,
  operator: "sw" | "swi" | "eq" | "in" | "ini"
) => {
  switch (operator) {
    case "sw": // Start With case sensitive
      return source?.startsWith(target);
    case "swi": // Start With case insensitive
      return source?.toLowerCase().startsWith(target?.toLowerCase());
    case "eq": // Equal To
      return source === target;
    case "in": // Includes case sensitive
      return source.toString().includes(target.toString());
    case "ini": // Includes case insensitive
      return source
        .toString()
        .toLowerCase()
        .includes(target.toString().toLowerCase());
    default:
      return false;
  }
};

function areFamilyObject(childObj: any, parentObj: any): boolean;
function areFamilyObject(
  childObj: any,
  parentObj: any,
  operator: "sw" | "swi" | "eq" | "in" | "ini" = "eq"
): boolean {
  // Handle null/undefined cases
  if (!childObj || !parentObj) return false;

  if (getType(childObj) === "object" && getType(parentObj) === "object") {
    for (const key in childObj) {
      if (childObj[key] !== parentObj[key]) {
        return false;
      }
    }
  } else if (
    getType(childObj) === "string" &&
    getType(parentObj) === "string"
  ) {
    return compareValues(parentObj, childObj, operator);
  }

  return true;
}

const valueToEnum = <T extends object>(
  enumType: T,
  val: EnumValueType
): T | undefined => {
  const enumKeys = Object.keys(enumType) as (keyof typeof enumType)[];
  const key = enumKeys.find((key) => enumType[key] === val);
  return key !== undefined ? (enumType[key] as T) : undefined;
};

function hasPropertyWithSpecificValue(
  obj: any,
  targetProp: string,
  targetValue: any
): boolean;
function hasPropertyWithSpecificValue(
  obj: any,
  targetProp: string,
  targetValue: any,
  operator: "sw" | "swi" | "eq" | "in" | "ini"
): boolean;

function hasPropertyWithSpecificValue(
  obj: AnyObject,
  targetProp: string,
  targetValue: any,
  operator: "sw" | "swi" | "eq" | "in" | "ini" = "eq"
): boolean {
  // Check if the object is null or undefined
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  if (
    obj.hasOwnProperty(targetProp) &&
    compareValues(obj[targetProp], targetValue, operator)
  ) {
    return true;
  }

  // If the object is an array, recursively search each element
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (
        hasPropertyWithSpecificValue(item, targetProp, targetValue, operator)
      ) {
        return true;
      }
    }
  } else {
    // If the object is not an array, recursively search its properties
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        typeof obj[key] === "object" &&
        hasPropertyWithSpecificValue(
          obj[key],
          targetProp,
          targetValue,
          operator
        )
      ) {
        return true;
      }
    }
  }

  // Property with the specific value not found in the object
  return false;
}

const isFieldRequired = (field: string, validationSchema: any) => {
  const fieldSchema = validationSchema?.fields[field];
  if (!fieldSchema) return false;
  return fieldSchema.tests.some(
    (test: any) =>
      test.OPTIONS?.name === "required" || test.OPTIONS?.name === "min"
  );
};

export const getTotalFromObj = (obj: { [key: string]: any }) => {
  let total = 0;
  for (const key in obj) {
    if (typeof obj[key] === "number") total += obj[key];
  }
  return total;
};

const convertQueryParamToObject = (queryParamObject: any) => {
  const result: any = {};

  for (const [key, value] of Object.entries(queryParamObject)) {
    try {
      // Attempt to parse JSON string
      const parsedValue = JSON.parse(value as string);
      if (typeof parsedValue === "object" && parsedValue !== null) {
        result[key] = {
          key: parsedValue.key,
          value: parsedValue.value,
        };
      } else {
        result[key] = value; // Retain original value if not parsable to object
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      result[key] = value; // Retain original value if parsing fails
    }
  }

  return result;
};

const convertObjectToQueryParam = (input: any) => {
  const result: Record<string, any> = {};

  // Handle array case
  if (Array.isArray(input)) {
    for (const item of input) {
      if (
        item &&
        typeof item === "object" &&
        "key" in item &&
        "value" in item
      ) {
        result[item.key] = item.value;
      } else {
        console.warn(`Item missing "key" or "value" properties:`, item);
      }
    }
    return result;
  }

  // Handle single object case
  if (
    input &&
    typeof input === "object" &&
    "key" in input &&
    "value" in input
  ) {
    return { [input.key]: input.value };
  }

  // Handle other cases (like your original function's behavior)
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "object" && value !== null) {
      if ("key" in value && "value" in value) {
        result[value.key as any] = value.value;
      } else {
        console.warn(`Missing "key" or "value" properties in object: ${key}`);
      }
    } else {
      result[key] = value;
    }
  }

  return result;
};

const exportToCsv = <T>(
  filename: string,
  rows: T[],
  delimiter: string = "\t"
) => {
  if (!rows.length) return;

  // interpret escape sequences like \t or \n correctly
  const actualDelimiter =
    delimiter === "\\t" ? "\t" : delimiter === "\\n" ? "\n" : delimiter;

  const headers = Object.keys(rows[0] as object);

  const formatValue = (val: unknown): string => {
    if (val === null || val === undefined || val === "") return `""`;
    const str = String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const csvContent = [
    headers.join(actualDelimiter), // header row
    ...rows.map((row) =>
      headers
        .map((field) => formatValue((row as any)[field]))
        .join(actualDelimiter)
    ),
  ].join("\n");

  const BOM = "\uFEFF"; // Excel UTF-8 support
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  } as T;
}
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}
function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}
function encode(value: object): string {
  return btoa(JSON.stringify(value));
}

function decode(value: string): any {
  return JSON.parse(atob(value));
}
const convertExtensionsToAcceptObject = (extensions: string[]) => {
  const acceptObject: { [key: string]: string[] } = {};
  extensions.forEach((ext) => {
    const mimeType = extToMimeType(ext);
    if (mimeType) {
      if (!acceptObject[mimeType]) {
        acceptObject[mimeType] = [];
      }
      acceptObject[mimeType].push(ext);
    }
  });
  return acceptObject;
};

// Simple extension to MIME map (extend as needed)
const extToMimeType = (ext: string): string | null => {
  switch (ext.toLowerCase()) {
    case ".csv":
      return "text/csv";
    case ".xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case ".pdf":
      return "application/pdf";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".txt":
      return "text/plain";
    default:
      return null;
  }
};

export const Utils = {
  convertExtensionsToAcceptObject,
  extToMimeType,
  encode,
  decode,
  isValidDate,
  withoutProperty,
  loadJSON,
  objToArrayOfKeyAndValue,
  ascendingSortedData,
  descendingSortedData,
  getObjFirstKey,
  findKeyByValue,
  convertArrayOfKeyAndValuesToString,
  removeObjectKeys,
  getType,
  getFileExtension,
  toPascalCase,
  generateCode,
  removeKeysDeep,
  enumKeyByValue,
  decodeJWT,
  formatDate,
  numberWithCommas,
  formatCash,
  getTodayDateRanges,
  getMonthNumberFromName,
  generateQueryString,
  cleanEmptyAndZeros,
  cleanEmpty,
  sleep,
  cleanEmptyArray,
  isArrayOfType,
  isDate,
  isValidUrl,
  areFamilyObject,
  compareValues,
  valueToEnum,
  hasPropertyWithSpecificValue,
  isFieldRequired,
  removePartialPrefix,
  convertQueryParamToObject,
  convertObjectToQueryParam,
  getTotalFromObj,
  exportToCsv,
  debounce,
  deepEqual,
};
