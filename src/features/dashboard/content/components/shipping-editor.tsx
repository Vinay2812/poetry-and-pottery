import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { ShippingPageContent } from "@/graphql/generated/types";

import { EditableListSection } from "./editable-list-section";
import { IconPickerField } from "./icon-picker-field";
import { useArrayHandlers } from "./use-array-handlers";

interface ShippingEditorProps {
  content: ShippingPageContent;
  onChange: (content: ShippingPageContent) => void;
}

export function ShippingEditor({ content, onChange }: ShippingEditorProps) {
  const options = useArrayHandlers(content, onChange, "shippingOptions");
  const info = useArrayHandlers(content, onChange, "shippingInfo");
  const policy = useArrayHandlers(content, onChange, "returnsPolicy");
  const steps = useArrayHandlers(content, onChange, "returnSteps");

  return (
    <div className="space-y-8">
      <EditableListSection
        title="Shipping Options"
        items={options.items}
        addButtonLabel="Add Option"
        itemLabel="Option"
        onAdd={() =>
          options.handleAdd({
            icon: "truck",
            title: "",
            description: "",
            price: "",
          })
        }
        onRemove={options.handleRemove}
        onUpdate={options.handleUpdate}
        renderItem={(option, index, onUpdate) => (
          <div className="grid gap-4 sm:grid-cols-4">
            <IconPickerField
              value={option.icon}
              onValueChange={(v) => onUpdate(index, "icon", v)}
            />
            <div>
              <label className="mb-1 block text-sm">Title</label>
              <Input
                value={option.title}
                onChange={(e) => onUpdate(index, "title", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">Description</label>
              <Input
                value={option.description}
                onChange={(e) => onUpdate(index, "description", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">Price</label>
              <Input
                value={option.price}
                onChange={(e) => onUpdate(index, "price", e.target.value)}
              />
            </div>
          </div>
        )}
      />

      <EditableListSection
        title="Shipping Information"
        items={info.items}
        addButtonLabel="Add Info"
        itemLabel="Info"
        onAdd={() => info.handleAdd({ title: "", content: "" })}
        onRemove={info.handleRemove}
        onUpdate={info.handleUpdate}
        renderItem={(infoItem, index, onUpdate) => (
          <div className="space-y-2">
            <Input
              value={infoItem.title}
              onChange={(e) => onUpdate(index, "title", e.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={infoItem.content}
              onChange={(e) => onUpdate(index, "content", e.target.value)}
              placeholder="Content"
              rows={3}
            />
          </div>
        )}
      />

      <EditableListSection
        title="Returns Policy"
        items={policy.items}
        addButtonLabel="Add Policy"
        itemLabel="Policy"
        onAdd={() =>
          policy.handleAdd({ icon: "shield", title: "", description: "" })
        }
        onRemove={policy.handleRemove}
        onUpdate={policy.handleUpdate}
        renderItem={(policyItem, index, onUpdate) => (
          <div className="grid gap-4 sm:grid-cols-3">
            <IconPickerField
              value={policyItem.icon}
              onValueChange={(v) => onUpdate(index, "icon", v)}
            />
            <div>
              <label className="mb-1 block text-sm">Title</label>
              <Input
                value={policyItem.title}
                onChange={(e) => onUpdate(index, "title", e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <label className="mb-1 block text-sm">Description</label>
              <Textarea
                value={policyItem.description}
                onChange={(e) => onUpdate(index, "description", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        )}
      />

      <EditableListSection
        title="Return Steps"
        items={steps.items}
        addButtonLabel="Add Step"
        itemLabel="Step"
        onAdd={() => {
          const nextStep = String(content.returnSteps.length + 1).padStart(
            2,
            "0",
          );
          steps.handleAdd({ step: nextStep, title: "", description: "" });
        }}
        onRemove={steps.handleRemove}
        onUpdate={steps.handleUpdate}
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
