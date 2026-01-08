/**
 * Format large numbers to compact format (e.g., 1.2K, 2.1M)
 */
export const formatCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  }

  if (count < 1000000) {
    const formatted = (count / 1000).toFixed(1);

    return `${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}k`;
  }

  const formatted = (count / 1000000).toFixed(1);

  return `${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}M`;
};
