import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { CarePageContent } from "@/graphql/generated/types";

import { EditableListSection } from "./editable-list-section";
import { IconPickerField } from "./icon-picker-field";
import { useArrayHandlers } from "./use-array-handlers";

interface CareEditorProps {
  content: CarePageContent;
  onChange: (content: CarePageContent) => void;
}

export function CareEditor({ content, onChange }: CareEditorProps) {
  const glazeTypes = useArrayHandlers(content, onChange, "glazeTypes");
  const warnings = useArrayHandlers(content, onChange, "warnings");

  return (
    <div className="space-y-8">
      <EditableListSection
        title="Glaze Types"
        items={glazeTypes.items}
        addButtonLabel="Add Glaze Type"
        itemLabel="Glaze Type"
        onAdd={() =>
          glazeTypes.handleAdd({
            name: "",
            icon: "sparkles",
            description: "",
            care: "",
          })
        }
        onRemove={glazeTypes.handleRemove}
        onUpdate={glazeTypes.handleUpdate}
        renderItem={(glaze, index, onUpdate) => (
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm">Name</label>
              <Input
                value={glaze.name}
                onChange={(e) => onUpdate(index, "name", e.target.value)}
              />
            </div>
            <IconPickerField
              value={glaze.icon}
              onValueChange={(v) => onUpdate(index, "icon", v)}
            />
            <div className="sm:col-span-3">
              <label className="mb-1 block text-sm">Description</label>
              <Textarea
                value={glaze.description}
                onChange={(e) => onUpdate(index, "description", e.target.value)}
                rows={2}
              />
            </div>
            <div className="sm:col-span-3">
              <label className="mb-1 block text-sm">Care Instructions</label>
              <Textarea
                value={glaze.care}
                onChange={(e) => onUpdate(index, "care", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        )}
      />

      <EditableListSection
        title="Important Warnings"
        items={warnings.items}
        addButtonLabel="Add Warning"
        itemLabel="Warning"
        onAdd={() =>
          warnings.handleAdd({
            icon: "alert-triangle",
            title: "",
            description: "",
          })
        }
        onRemove={warnings.handleRemove}
        onUpdate={warnings.handleUpdate}
        renderItem={(warning, index, onUpdate) => (
          <div className="grid gap-4 sm:grid-cols-3">
            <IconPickerField
              value={warning.icon}
              onValueChange={(v) => onUpdate(index, "icon", v)}
            />
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm">Title</label>
              <Input
                value={warning.title}
                onChange={(e) => onUpdate(index, "title", e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <label className="mb-1 block text-sm">Description</label>
              <Textarea
                value={warning.description}
                onChange={(e) => onUpdate(index, "description", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        )}
      />

      {/* Safe For List */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">Safe For</h3>
        <div className="space-y-2">
          <Textarea
            value={content.safeFor.join("\n")}
            onChange={(e) =>
              onChange({
                ...content,
                safeFor: e.target.value.split("\n").filter(Boolean),
              })
            }
            placeholder="One item per line"
            rows={6}
          />
          <p className="text-muted-foreground text-sm">
            Enter one item per line
          </p>
        </div>
      </section>

      {/* Avoid List */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">Things to Avoid</h3>
        <div className="space-y-2">
          <Textarea
            value={content.avoid.join("\n")}
            onChange={(e) =>
              onChange({
                ...content,
                avoid: e.target.value.split("\n").filter(Boolean),
              })
            }
            placeholder="One item per line"
            rows={6}
          />
          <p className="text-muted-foreground text-sm">
            Enter one item per line
          </p>
        </div>
      </section>
    </div>
  );
}
