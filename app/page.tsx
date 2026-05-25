import Link from "next/link";
import { Car } from "../types/car";
import Card from "@/components/Card";

export default async function Home() {
  const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;

  const res = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          cars {
            id
            name
            slug
            drivetrain
            horsepower
            torque
            generation
            brandModel {
              name
            }
            heroImage {
              url(transformation: {image: {resize: {width: 600, height: 400}}})
            }
          }
        }
      `,
    }),
  });

  const data = await res.json();
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <header className="w-full max-w-7xl flex items-center justify-center border-b border-zinc-200 dark:border-zinc-700 px-4 py-6">
        <Link href="/" className="text-4xl font-bold text-center py-10">
          Rohan Automotive
        </Link>
      </header>
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-between py-6 px-4 bg-white dark:bg-black sm:items-start">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.data.cars.map((car: Car) => (
            <Card
              id={car.id}
              title={car.name}
              description={car.text}
              imageUrl={car.heroImage?.url}
              slug={car.slug}
              horsepower={car.horsepower}
              torque={car.torque}
              drivetrain={car.drivetrain}
              generation={car.generation}
              brandModelName={car.brandModel.name}
              key={car.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
