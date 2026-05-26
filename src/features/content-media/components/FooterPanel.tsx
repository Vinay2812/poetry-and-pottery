"use client";

import { useUIStore } from "@/store";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  useAdminFooterContentQuery,
  useAdminUpdateFooterContentMutation,
} from "@/graphql/generated/graphql";

interface FooterLink {
  label: string;
  href: string;
}
interface FooterColumn {
  title: string;
  links: FooterLink[];
}
interface FooterShape {
  tagline: string;
  copyright: string;
  newsletterBlurb: string;
  columns: FooterColumn[];
}

interface Props {
  defaults: Record<string, unknown>;
}

export function FooterPanel({ defaults }: Props) {
  const def = (defaults.footer_content ?? {}) as FooterShape;
  const { data, refetch } = useAdminFooterContentQuery();
  const [update] = useAdminUpdateFooterContentMutation();
  const addToast = useUIStore((s) => s.addToast);

  const remote: FooterShape | undefined = data?.adminFooterContent;
  const [local, setLocal] = useState<FooterShape | null>(null);
  useEffect(() => {
    if (remote) setLocal(remote);
  }, [remote]);
  if (!local) return <p className="text-muted-foreground text-sm">Loading…</p>;

  const save = async (next: FooterShape) => {
    const r = await update({ variables: { input: next } });
    if (r.data?.adminUpdateFooterContent.success) {
      addToast({ type: "success", message: "Footer updated" });
      void refetch();
      void fetch("/api/revalidate-site-content", { method: "POST" }).catch(
        () => {},
      );
    } else {
      addToast({
        type: "error",
        message: r.data?.adminUpdateFooterContent.error ?? "Failed",
      });
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Field
        label="Tagline"
        value={local.tagline}
        onChange={(v) => setLocal({ ...local, tagline: v })}
        defaultValue={def.tagline}
      />
      <Field
        label="Copyright"
        value={local.copyright}
        onChange={(v) => setLocal({ ...local, copyright: v })}
        defaultValue={def.copyright}
      />
      <FieldArea
        label="Newsletter blurb"
        value={local.newsletterBlurb}
        onChange={(v) => setLocal({ ...local, newsletterBlurb: v })}
        defaultValue={def.newsletterBlurb}
      />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Columns</h3>
        {local.columns.map((col, i) => (
          <div key={i} className="space-y-2 rounded-lg border p-3">
            <Input
              value={col.title}
              onChange={(e) => {
                const cols = [...local.columns];
                cols[i] = { ...col, title: e.target.value };
                setLocal({ ...local, columns: cols });
              }}
            />
            {col.links.map((link, j) => (
              <div key={j} className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Label"
                  value={link.label}
                  onChange={(e) => {
                    const cols = [...local.columns];
                    const links = [...col.links];
                    links[j] = { ...link, label: e.target.value };
                    cols[i] = { ...col, links };
                    setLocal({ ...local, columns: cols });
                  }}
                />
                <Input
                  placeholder="/href"
                  value={link.href}
                  onChange={(e) => {
                    const cols = [...local.columns];
                    const links = [...col.links];
                    links[j] = { ...link, href: e.target.value };
                    cols[i] = { ...col, links };
                    setLocal({ ...local, columns: cols });
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => save(local)}>Save</Button>
        <Button variant="ghost" onClick={() => setLocal(def)}>
          Reset all to defaults
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  defaultValue,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  defaultValue: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <label className="text-sm font-medium">{label}</label>
        <button
          type="button"
          className="text-muted-foreground text-xs hover:underline"
          onClick={() => onChange(defaultValue)}
        >
          Reset to default
        </button>
      </div>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function FieldArea({
  label,
  value,
  onChange,
  defaultValue,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  defaultValue: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <label className="text-sm font-medium">{label}</label>
        <button
          type="button"
          className="text-muted-foreground text-xs hover:underline"
          onClick={() => onChange(defaultValue)}
        >
          Reset to default
        </button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />
    </div>
  );
}
