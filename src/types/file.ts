export type File = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  encoding: string;
};

export type Metadata = {
  mimetype: string;
  originalname: string;
};
