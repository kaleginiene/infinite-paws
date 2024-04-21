type SingleSizeArray = [number, number];
type NamedSize = "fluid";
type MultiSize = SingleSizeArray[];

export type GeneralSize = SingleSizeArray | MultiSize | NamedSize;
