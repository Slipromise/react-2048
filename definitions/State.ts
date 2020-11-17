export interface Setting {
  baseCount: number;
  baseValue: number;
  generateCount: number;
}

export interface MatrixItem {
  id: number;
  value: number;
  position?: { x: number; y: number };
  origin?: MatrixItem[];
}
