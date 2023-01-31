const translations = {
  totalRows: 'Total Rows',
  totalColumns: 'Total Columns',
  currentColumn: 'Current Column',
  columnType: 'Column Type',
  elementType: 'Element Type',
  side: 'Side',
  style: 'Style',
};

function getTranslation(text: string): string {
  return translations[text] ?? text;
}

export { getTranslation };
