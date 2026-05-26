import HeaderTitle from "@/components/HeaderTitle";
import { BrandModel } from "@/types/brandModel";
import Link from "next/link";

export default async function Make() {
  const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;

  const res = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          brandModels {
            id
            name
            slug
            logo {
              url(transformation: {image: {resize: {width: 50}}})
            }
          }
        }
      `,
    }),
  });

  const { data } = await res.json();

  return (
    <div className="flex flex-col flex-1 items-center justify-center dark:bg-black">
      <HeaderTitle title="Car Makes" />
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center py-6 px-4 bg-white dark:bg-black sm:items-start">
        <Link
          href="/"
          className="text-underline text-blue-500 hover:text-blue-700 mb-4"
        >
          Back to Home
        </Link>
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.brandModels.map((brandModel: BrandModel) => (
            <li key={brandModel.id} className="flex items-center space-x-2">
              {brandModel.logo && (
                <img
                  src={brandModel.logo.url}
                  alt={`${brandModel.name} logo`}
                  width={50}
                  height={50}
                />
              )}
              <Link
                href={`/make/${brandModel.slug}`}
                className="text-blue-500 hover:underline"
              >
                {brandModel.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
