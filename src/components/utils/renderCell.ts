export const renderCell = (value: any, fallback: string = "-") => {
  return value ?? fallback; // Use fallback if value is undefined or null
};
