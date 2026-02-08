import { ArrowLeftIcon, ShieldIcon, UserIcon } from "lucide-react";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { UserRole } from "@/graphql/generated/types";

interface UserDetailHeaderProps {
  image: string | null;
  name: string | null;
  role: UserRole;
  email: string;
  phone: string | null;
}

export function UserDetailHeader({
  image,
  name,
  role,
  email,
  phone,
}: UserDetailHeaderProps) {
  return (
    <div className="space-y-4">
      <Link href="/dashboard/users" className="inline-block">
        <Button variant="ghost" size="icon">
          <ArrowLeftIcon className="size-5" />
        </Button>
      </Link>

      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        {image ? (
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-neutral-100 sm:size-16">
            <OptimizedImage
              src={image}
              alt={name || ""}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-primary/10 text-primary flex size-20 shrink-0 items-center justify-center rounded-full sm:size-16">
            <UserIcon className="size-10 sm:size-8" />
          </div>
        )}
        <div className="space-y-1">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <h1 className="text-xl font-bold sm:text-2xl">
              {name || "Unnamed User"}
            </h1>
            <Badge
              variant={role === UserRole.Admin ? "default" : "outline"}
              className="gap-1"
            >
              {role === UserRole.Admin && <ShieldIcon className="size-3" />}
              {role}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">{email}</p>
          {phone && <p className="text-muted-foreground text-sm">{phone}</p>}
        </div>
      </div>
    </div>
  );
}
