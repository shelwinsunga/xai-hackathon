export function parseIncompleteJSON(incompleteJSON: string): any {
    let result: any = {};
    let currentKey: string | null = null;
    let currentValue: string = '';
    let inQuotes: boolean = false;
    let depth: number = 0;
  
    for (let i = 0; i < incompleteJSON.length; i++) {
      const char = incompleteJSON[i];
  
      if (char === '{' && !inQuotes) {
        depth++;
      } else if (char === '}' && !inQuotes) {
        depth--;
        if (depth === 0 && currentKey) {
          result[currentKey] = currentValue.trim();
          currentKey = null;
          currentValue = '';
        }
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ':' && !inQuotes && currentKey === null) {
        currentKey = currentValue.trim().replace(/^"|"$/g, '');
        currentValue = '';
      } else if (char === ',' && !inQuotes && currentKey) {
        result[currentKey] = currentValue.trim();
        currentKey = null;
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
  
    if (currentKey) {
      result[currentKey] = currentValue.trim();
    }
  
    return result;
  };
  
  