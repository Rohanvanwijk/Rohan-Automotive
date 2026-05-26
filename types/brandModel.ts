import { ImageModel } from "./imageModel";

export type BrandModel = {
  id: string;
  name: string;
  slug: string;
  country: string;
  logo: ImageModel;
};
