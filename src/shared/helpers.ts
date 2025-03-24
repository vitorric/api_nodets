export const RemoveSpecialChars = (value: string, limited = false): string => {
  if (!value) return value;

  const normalized = value.toString();

  if (!limited) {
    return normalized.replace(/[^\w\s]+/gi, '').replace(/[\r\n\t]+/g, '');
  }

  const limitedPattern =
    /[\r\t\n`~!@#$%^&*()_|+\-–=═?;:'",.<>¨¬£³²¹°´ªº/\\[\]]/g;

  return normalized
    .replace(limitedPattern, '')
    .replace(/[^\x00-\x7F]/g, '')
    .trim();
};
