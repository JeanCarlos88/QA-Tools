/**
 * File conversion service
 */

/**
 * Convert CSV to JSON
 */
export const csvToJson = (csvText) => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV deve ter pelo menos 2 linhas (cabeçalho e dados)');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(',').map(v => v.trim());

    headers.forEach((header, index) => {
      obj[header] = currentLine[index] || '';
    });

    result.push(obj);
  }

  return result;
};

/**
 * Convert JSON to CSV
 */
export const jsonToCsv = (jsonData) => {
  let data;
  
  if (typeof jsonData === 'string') {
    data = JSON.parse(jsonData);
  } else {
    data = jsonData;
  }

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('JSON deve ser um array não vazio');
  }

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header] || '';
      // Escape commas and quotes
      const escaped = String(value).replace(/"/g, '""');
      return escaped.includes(',') ? `"${escaped}"` : escaped;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

/**
 * Convert JSON to XML
 */
export const jsonToXml = (jsonData, rootName = 'root') => {
  let data;
  
  if (typeof jsonData === 'string') {
    data = JSON.parse(jsonData);
  } else {
    data = jsonData;
  }

  const convertValue = (value, key) => {
    if (value === null || value === undefined) {
      return `<${key}/>`;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const inner = Object.entries(value)
        .map(([k, v]) => convertValue(v, k))
        .join('');
      return `<${key}>${inner}</${key}>`;
    }

    if (Array.isArray(value)) {
      return value.map(item => convertValue(item, 'item')).join('');
    }

    // Escape XML special characters
    const escaped = String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    return `<${key}>${escaped}</${key}>`;
  };

  if (Array.isArray(data)) {
    const items = data.map(item => convertValue(item, 'item')).join('');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>${items}</${rootName}>`;
  }

  const content = Object.entries(data)
    .map(([k, v]) => convertValue(v, k))
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>${content}</${rootName}>`;
};

/**
 * Convert XML to JSON (basic implementation)
 */
export const xmlToJson = (xmlText) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const parseError = xmlDoc.getElementsByTagName('parsererror');
  if (parseError.length > 0) {
    throw new Error('XML inválido');
  }

  const parseNode = (node) => {
    // Text node
    if (node.nodeType === 3) {
      return node.nodeValue.trim();
    }

    // Element node
    const obj = {};

    // Handle attributes
    if (node.attributes && node.attributes.length > 0) {
      obj['@attributes'] = {};
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        obj['@attributes'][attr.name] = attr.value;
      }
    }

    // Handle child nodes
    if (node.childNodes && node.childNodes.length > 0) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        
        if (child.nodeType === 3) {
          const text = child.nodeValue.trim();
          if (text) {
            obj['#text'] = text;
          }
        } else if (child.nodeType === 1) {
          const childName = child.nodeName;
          const childValue = parseNode(child);

          if (obj[childName]) {
            if (!Array.isArray(obj[childName])) {
              obj[childName] = [obj[childName]];
            }
            obj[childName].push(childValue);
          } else {
            obj[childName] = childValue;
          }
        }
      }
    }

    return Object.keys(obj).length === 0 ? '' : obj;
  };

  return parseNode(xmlDoc.documentElement);
};

/**
 * Convert CSV to XML
 */
export const csvToXml = (csvText) => {
  const json = csvToJson(csvText);
  return jsonToXml(json, 'data');
};

/**
 * Convert XML to CSV
 */
export const xmlToCsv = (xmlText) => {
  const json = xmlToJson(xmlText);
  
  // Try to find array in the structure
  let data = json;
  if (json.item) {
    data = Array.isArray(json.item) ? json.item : [json.item];
  }
  
  if (!Array.isArray(data)) {
    data = [data];
  }

  return jsonToCsv(data);
};
