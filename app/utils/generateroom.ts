export const generateRoomName = (title: string, id: string): string =>
  `skillverse-${title.trim().toLowerCase().replace(/\s+/g, '-')}-${id}`;
