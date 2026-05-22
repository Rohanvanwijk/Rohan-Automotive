import { CarBodyType } from "./carBodytype";
import { Drivetrain } from "./drivetrain";

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
  text: string;
};
