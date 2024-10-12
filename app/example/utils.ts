export function parseIncompleteJSON(incompleteJSON: string): any[] {
  let result: any[] = [];
  let currentObject: any = {};
  let currentKey: string | null = null;
  let currentValue: string = '';
  let inQuotes: boolean = false;
  let depth: number = 0;

  for (let i = 0; i < incompleteJSON.length; i++) {
    const char = incompleteJSON[i];

    if (char === '{' && !inQuotes) {
      depth++;
      if (depth === 2) {
        currentObject = {};
      }
    } else if (char === '}' && !inQuotes) {
      depth--;
      if (depth === 1) {
        if (currentKey) {
          currentObject[currentKey] = currentValue.trim();
        }
        result.push(currentObject);
        currentObject = {};
        currentKey = null;
        currentValue = '';
      } else if (depth === 0) {
        break;
      }
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ':' && !inQuotes && currentKey === null) {
      currentKey = currentValue.trim().replace(/^"|"$/g, '');
      currentValue = '';
    } else if (char === ',' && !inQuotes) {
      if (currentKey) {
        currentObject[currentKey] = currentValue.trim();
        currentKey = null;
        currentValue = '';
      }
    } else {
      currentValue += char;
    }
  }

  return result;
}
