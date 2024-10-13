export function formatDate(date: string) {
    const [year, month, day] = date.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  }

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
  
    // Handle incomplete object at the end
    if (Object.keys(currentObject).length > 0 || currentKey) {
      if (currentKey) {
        currentObject[currentKey] = currentValue.trim();
      }
      result.push(currentObject);
    }
  
    // Pre-processing step to convert 'true' and 'false' strings to booleans in the 'met' field
    // and set 'pending' if not defined
    result = result.map(obj => {
      if (obj.met === 'true') {
        obj.met = true;
      } else if (obj.met === 'false') {
        obj.met = false;
      } else if (obj.met === undefined) {
        obj.met = 'pending';
      }
      return obj;
    });
  
    return result.map(obj => {
      return {
        criterion: obj.criterion || '',
        met: obj.met !== undefined ? obj.met : 'pending'
      };
    });
  }
  
export function toRoman(num: number): string {
  const romanNumerals: { [key: number]: string } = {
    1000: 'M',
    900: 'CM',
    500: 'D',
    400: 'CD',
    100: 'C',
    90: 'XC',
    50: 'L',
    40: 'XL',
    10: 'X',
    9: 'IX',
    5: 'V',
    4: 'IV',
    1: 'I',
  };
  let result = '';
  for (const value of Object.keys(romanNumerals).map(Number).sort((a, b) => b - a)) {
    while (num >= value) {
      result += romanNumerals[value];
      num -= value;
    }
  }
  return result;
}