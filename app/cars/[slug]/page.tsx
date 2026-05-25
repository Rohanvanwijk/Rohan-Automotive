import { getDrivetrainLabel } from "@/utils/label";
import Link from "next/link";

export default async function CarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
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
          cars(where: {slug: "${slug}"}) {
            id
            name
            slug
            bodyType
            drivetrain
            horsepower
            torque
            generation
            text
            startProduction
            endProduction
            brandModel {
              name
            }
            heroImage {
              url
            }
            gallery {
              imageUrl
              imageAlt
            }
          }
        }
      `,
    }),
  });

  const data = await res.json();
  if (!data.data.cars.length) {
    return <h1>Car not found</h1>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      <header>
        <Link className="underline text-blue-500 hover:text-blue-700" href="/">
          Back to Home
        </Link>
        <img
          className="w-full h-100 object-cover rounded-lg mt-4"
          src={data.data.cars[0].heroImage?.url}
          alt={data.data.cars[0].name}
        />
        <h1 className="text-5xl font-bold mt-4">
          {data.data.cars[0].brandModel.name} {data.data.cars[0].name}
        </h1>
      </header>

      <main className="mt-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-evenly">
          <p className="max-w-2xl text-lg">{data.data.cars[0].text}</p>
          <ul>
            <li>
              <span className="text-xs text-neutral-600">Horsepower</span>
              <span className="px-2 font-semibold">
                {data.data.cars[0].horsepower} PK
              </span>
            </li>
            <li>
              <span className="text-xs text-neutral-600">Torque</span>
              <span className="px-2 font-semibold">
                {data.data.cars[0].torque} Nm
              </span>
            </li>
            <li>
              <span className="text-xs text-neutral-600">Drivetrain</span>
              <span className="px-2 font-semibold">
                {getDrivetrainLabel(data.data.cars[0].drivetrain)}
              </span>
            </li>
            <li>
              <span className="text-xs text-neutral-600">Generation</span>
              <span className="px-2 font-semibold">
                {data.data.cars[0].generation}
              </span>
            </li>
            {data.data.cars[0].startProduction && (
              <li>
                <span className="text-xs text-neutral-600">
                  Start production year
                </span>
                <span className="px-2 font-semibold">
                  {new Date(data.data.cars[0].startProduction).getFullYear()}
                </span>
              </li>
            )}
            {data.data.cars[0].endProduction && (
              <li>
                <span className="text-xs text-neutral-600">
                  Ended production year
                </span>
                <span className="px-2 font-semibold">
                  {new Date(data.data.cars[0].endProduction).getFullYear()}
                </span>
              </li>
            )}
          </ul>
        </div>
        {data.data.cars[0].gallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <h2 className="text-2xl font-bold col-span-full">Gallery</h2>
            {data.data.cars[0].gallery.map(
              (image: { imageUrl: string; imageAlt: string }) => (
                <img
                  key={image.imageUrl}
                  src={image.imageUrl}
                  alt={image.imageAlt}
                  className="w-full h-60 object-cover rounded-lg"
                />
              ),
            )}
          </div>
        )}
      </main>
    </div>
  );
}
