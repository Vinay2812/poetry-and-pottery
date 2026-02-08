import { createDate } from "@/lib/date";

interface UserMemberInfoProps {
  createdAt: Date | string;
}

export function UserMemberInfo({ createdAt }: UserMemberInfoProps) {
  return (
    <div className="rounded-xl bg-neutral-50 p-4">
      <p className="text-sm text-neutral-500">
        Member since{" "}
        {createDate(createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
