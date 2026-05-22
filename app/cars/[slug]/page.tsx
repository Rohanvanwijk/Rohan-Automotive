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
            text
            startProduction
            endProduction
            brandModel {
              name
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
    <div>
      <Link className="underline text-blue-500 hover:text-blue-700" href="/">
        Back to Home
      </Link>
      <h1>Welcome to the Car Page with params: {slug}!</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {JSON.stringify(data.data.cars[0], null, 2)}
      </pre>
    </div>
  );
}
