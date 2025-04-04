const translations = {
  useExternal: 'Use External Controller',
  useAudio: 'Use Audio Input',
  totalRows: 'Total Rows',
  totalColumns: 'Total Columns',
  currentColumn: 'Current Column',
  columnType: 'Column Type',
  elementType: 'Element Type',
  side: 'Side',
  style: 'Style',
  blur: 'Ink Bleed',
  brightness: 'Brightness',
  textLightness: 'Content Opacity',
  grain: 'Grain Size',
  smudge: 'Smudge',
};

function getTranslation(text: string): string {
  return translations[text] ?? text;
}

export { getTranslation };
