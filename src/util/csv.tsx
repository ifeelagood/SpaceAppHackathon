// Core CSV row type
type CSVRow = Record<string, string>;

function parseCSV(csv: string) {
  const rows = csv
    .trim()
    .replace(/\r/g, '')
    .split("\n")
    .map(line => line.split(","));

  const header = rows[0];
  const dataRows = rows.slice(1);

  if (header === undefined) return [];

  return dataRows.map(row => {
    const obj: Record<string, string> = {};
    header.forEach((key, i) => {
      obj[key] = row[i] ?? "";
    });
    return obj;
  });
}

export { parseCSV };
export type { CSVRow };