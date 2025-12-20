import Image from "next/image";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function TeamMemberCard({
  name,
  role,
  bio,
  image,
}: TeamMemberCardProps) {
  return (
    <div className="group shadow-soft hover:shadow-card overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-3 transition-all duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="text-base font-bold text-neutral-900 lg:text-lg dark:text-neutral-100">
          {name}
        </h3>
        <p className="text-primary mt-1 text-xs font-bold tracking-wider uppercase">
          {role}
        </p>
        <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
          {bio}
        </p>
      </div>
    </div>
  );
}
