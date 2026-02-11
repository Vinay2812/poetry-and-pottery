import { UserIcon } from "lucide-react";

import { OptimizedImage } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

import { createDate } from "@/lib/date";
import { getRegistrationStatusColor } from "@/lib/status-utils";

import type { EventRegistrationStatus } from "@/graphql/generated/types";

interface RegistrationTableRowProps {
  id: string;
  userName: string | null;
  userEmail: string;
  userImage: string | null;
  seatsReserved: number;
  price: number;
  discount: number;
  status: EventRegistrationStatus;
  createdAt: Date | string;
}

export function RegistrationTableRow({
  userName,
  userEmail,
  userImage,
  seatsReserved,
  price,
  discount,
  status,
  createdAt,
}: RegistrationTableRowProps) {
  return (
    <tr className="transition-colors hover:bg-neutral-50/50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {userImage ? (
            <div className="relative size-10 overflow-hidden rounded-full bg-neutral-100">
              <OptimizedImage
                src={userImage}
                alt={userName || ""}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100">
              <UserIcon className="size-5 text-neutral-400" />
            </div>
          )}
          <div>
            <div className="font-medium text-neutral-900">
              {userName || "Unnamed User"}
            </div>
            <div className="text-sm text-neutral-500">{userEmail}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-neutral-600">{seatsReserved}</span>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="font-medium text-neutral-900">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(price)}
        </div>
        {discount > 0 && (
          <div className="text-sm text-green-600">
            -
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(discount)}{" "}
            discount
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        <Badge className={`border ${getRegistrationStatusColor(status)}`}>
          {status.toLowerCase().replace("_", " ")}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-500" suppressHydrationWarning>
          {createDate(createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </td>
    </tr>
  );
}
