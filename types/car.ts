import { BrandModel } from "./brandModel";
import { CarBodyType } from "./carBodytype";
import { Drivetrain } from "./drivetrain";
import { HeroImage } from "./heroImage";
import { ImageModel } from "./imageModel";

export type Car = {
  id: string;
  name: string;
  slug: string;
  generation: string;
  startProduction: string;
  endProduction: string;
  bodyType: CarBodyType;
  drivetrain: Drivetrain;
  horsepower: number;
  torque: number;
  text?: string;
  brandModel: BrandModel;
  heroImage?: HeroImage;
  gallery?: [ImageModel];
};
