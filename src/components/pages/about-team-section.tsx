import { OptimizedImage } from "@/components/shared";

const TEAM = [
  {
    name: "Poetry & Pottery",
    role: "Founder & Potter",
    image:
      "https://images.pexels.com/photos/3094208/pexels-photo-3094208.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export function AboutTeamSection() {
  return (
    <section className="bg-background py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 text-center lg:mb-12">
          <p className="text-primary mb-2 text-sm font-medium tracking-wider uppercase">
            Meet the Team
          </p>
          <h2 className="font-display text-2xl font-bold text-neutral-900 lg:text-3xl">
            The Hands Behind the Clay
          </h2>
        </div>

        <div className="mx-auto flex justify-center gap-6 lg:gap-8">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative mx-auto mb-4 aspect-square w-32 overflow-hidden rounded-full lg:w-40">
                <OptimizedImage
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-display font-semibold text-neutral-900">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
