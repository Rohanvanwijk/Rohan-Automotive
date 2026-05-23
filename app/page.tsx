import Link from "next/link";
import { Car } from "../types/car";
import { getDrivetrainLabel } from "@/utils/label";

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
            <article
              className="overflow-hidden rounded-2xl bg-teal-50 shadow-lg transition-colors hover:bg-teal-100"
              key={car.id}
            >
              <header>
                <img
                  src="https://placehold.co/600x400"
                  className="h-50 w-100 object-cover"
                  alt={car.name}
                />
              </header>
              <div className="p-4">
                <h3 className="text-lg">
                  <Link
                    href={`/cars/${car.slug}`}
                    className="font-medium text-gray-900 dark:text-gray-100"
                  >
                    {car.brandModel.name} {car.name}
                  </Link>
                </h3>
                <div className="mt-2 flex flex-col gap-4 sm:flex-row">
                  <span className="text-xs text-neutral-400">
                    {car.horsepower} PK
                  </span>
                  <span className="text-xs text-neutral-400">
                    {car.torque} NM
                  </span>
                  <span className="text-xs text-neutral-400">
                    {getDrivetrainLabel(car.drivetrain)}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {car.generation}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
