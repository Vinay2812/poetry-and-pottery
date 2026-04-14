import { OptimizedImage } from "@/components/shared";

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
    <div className="group shadow-soft hover:shadow-card bg-card overflow-hidden rounded-[2rem] border border-neutral-100 p-3 transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <OptimizedImage
          src={image}
          alt={name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="text-foreground text-base font-bold lg:text-lg">
          {name}
        </h3>
        <p className="text-primary mt-1 text-xs font-bold tracking-wider uppercase">
          {role}
        </p>
        <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-neutral-500">
          {bio}
        </p>
      </div>
    </div>
  );
}
