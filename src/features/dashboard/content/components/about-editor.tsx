import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { AboutPageContent } from "@/graphql/generated/types";

import { EditableListSection } from "./editable-list-section";
import { IconPickerField } from "./icon-picker-field";
import { useArrayHandlers } from "./use-array-handlers";

interface AboutEditorProps {
  content: AboutPageContent;
  onChange: (content: AboutPageContent) => void;
}

export function AboutEditor({ content, onChange }: AboutEditorProps) {
  const values = useArrayHandlers(content, onChange, "values");
  const team = useArrayHandlers(content, onChange, "team");
  const processSteps = useArrayHandlers(content, onChange, "processSteps");

  return (
    <div className="space-y-8">
      {/* Story Section */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">Story Section</h3>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <Input
              value={content.storyTitle}
              onChange={(e) =>
                onChange({ ...content, storyTitle: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Subtitle</label>
            <Input
              value={content.storySubtitle}
              onChange={(e) =>
                onChange({ ...content, storySubtitle: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Story Paragraphs (one per line)
            </label>
            <Textarea
              value={content.storyContent.join("\n\n")}
              onChange={(e) =>
                onChange({
                  ...content,
                  storyContent: e.target.value.split("\n\n").filter(Boolean),
                })
              }
              rows={6}
            />
          </div>
        </div>
      </section>

      <EditableListSection
        title="Values"
        items={values.items}
        addButtonLabel="Add Value"
        itemLabel="Value"
        onAdd={() =>
          values.handleAdd({ icon: "star", title: "", description: "" })
        }
        onRemove={values.handleRemove}
        onUpdate={values.handleUpdate}
        renderItem={(value, index, onUpdate) => (
          <div className="grid gap-4 sm:grid-cols-3">
            <IconPickerField
              value={value.icon}
              onValueChange={(v) => onUpdate(index, "icon", v)}
            />
            <div>
              <label className="mb-1 block text-sm">Title</label>
              <Input
                value={value.title}
                onChange={(e) => onUpdate(index, "title", e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <label className="mb-1 block text-sm">Description</label>
              <Textarea
                value={value.description}
                onChange={(e) => onUpdate(index, "description", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        )}
      />

      <EditableListSection
        title="Team Members"
        items={team.items}
        addButtonLabel="Add Member"
        itemLabel="Member"
        onAdd={() => team.handleAdd({ name: "", role: "", image: "", bio: "" })}
        onRemove={team.handleRemove}
        onUpdate={team.handleUpdate}
        renderItem={(member, index, onUpdate) => (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm">Name</label>
              <Input
                value={member.name}
                onChange={(e) => onUpdate(index, "name", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">Role</label>
              <Input
                value={member.role}
                onChange={(e) => onUpdate(index, "role", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm">Image URL</label>
              <Input
                value={member.image}
                onChange={(e) => onUpdate(index, "image", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm">Bio</label>
              <Textarea
                value={member.bio}
                onChange={(e) => onUpdate(index, "bio", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        )}
      />

      <EditableListSection
        title="Process Steps"
        items={processSteps.items}
        addButtonLabel="Add Step"
        itemLabel="Step"
        onAdd={() => {
          const nextStep = String(content.processSteps.length + 1).padStart(
            2,
            "0",
          );
          processSteps.handleAdd({
            step: nextStep,
            title: "",
            description: "",
          });
        }}
        onRemove={processSteps.handleRemove}
        onUpdate={processSteps.handleUpdate}
        getItemLabel={(step) => `Step ${step.step}`}
        renderItem={(step, index, onUpdate) => (
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm">Step Number</label>
              <Input
                value={step.step}
                onChange={(e) => onUpdate(index, "step", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm">Title</label>
              <Input
                value={step.title}
                onChange={(e) => onUpdate(index, "title", e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <label className="mb-1 block text-sm">Description</label>
              <Textarea
                value={step.description}
                onChange={(e) => onUpdate(index, "description", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
