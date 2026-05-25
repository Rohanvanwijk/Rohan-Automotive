import Link from "next/link";
import { getDrivetrainLabel } from "@/utils/label";

export default function Card(props: {
  id: string;
  title: string;
  imageUrl?: string;
  slug: string;
  horsepower: number;
  torque: number;
  drivetrain: string;
  generation: string;
  brandModelName: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl bg-teal-50 shadow-lg transition-colors hover:bg-teal-100">
      <header>
        {props.imageUrl ? (
          <img
            src={props.imageUrl}
            className="h-50 w-full object-cover"
            alt={props.title}
          />
        ) : (
          <img
            src="https://placehold.co/600x400"
            className="h-50 w-full object-cover"
            alt={props.title}
          />
        )}
      </header>
      <div className="p-4">
        <h3 className="text-lg">
          <Link
            href={`/cars/${props.slug}`}
            className="font-medium text-gray-900 dark:text-gray-100"
          >
            {props.brandModelName} {props.title}
          </Link>
        </h3>
        <div className="text-sm text-gray-400 dark:text-gray-400">
          {getDrivetrainLabel(props.drivetrain)}
        </div>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row">
          <span className="text-xs text-white bg-red-400 px-2 py-1 rounded-full w-max">
            {props.horsepower} PK
          </span>
          <span className="text-xs text-white bg-blue-400 px-2 py-1 rounded-full w-max">
            {props.torque} NM
          </span>
          <span className="text-xs text-white bg-green-400 px-2 py-1 rounded-full w-max">
            {props.generation}
          </span>
        </div>
      </div>
    </article>
  );
}
