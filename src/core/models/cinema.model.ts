export interface Cinema {
  id: number;
  name: string;
  address: string;
  screens?: Screen[];
}

export interface Screen {
  id: number;
  name: string;
}
