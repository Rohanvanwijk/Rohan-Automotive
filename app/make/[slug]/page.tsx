import Link from "next/link";
import { Car } from "@/types/car";
import Card from "@/components/Card";
import HeaderTitle from "@/components/HeaderTitle";

export default async function MakeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;

  const res = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          cars(where: {brandModel: {slug: "${slug}"}}) {
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
  const { data } = await res.json();
  if (!data.cars.length) {
    return <h1>Make not found</h1>;
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <HeaderTitle title={data.cars[0].brandModel.name} />
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center py-6 px-4 bg-white dark:bg-black sm:items-start">
        <div className="mb-8">
          <Link
            className="underline text-blue-500 hover:text-blue-700"
            href="/make"
          >
            Back to Makes
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.cars.map((car: Car) => (
            <Card
              id={car.id}
              title={car.name}
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
