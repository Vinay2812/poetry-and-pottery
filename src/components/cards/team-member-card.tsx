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
    <div className="text-center">
      <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full lg:h-40 lg:w-40">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-primary mb-2 text-sm font-medium">{role}</p>
      <p className="text-muted-foreground text-sm">{bio}</p>
    </div>
  );
}
