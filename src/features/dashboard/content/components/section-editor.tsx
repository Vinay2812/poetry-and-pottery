import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { EditableListSection } from "./editable-list-section";

interface SectionItem {
  title: string;
  content: string;
}

interface SectionEditorContent {
  lastUpdated: string;
  contactEmail: string;
  introduction: string;
  sections: SectionItem[];
}

interface SectionEditorProps {
  content: SectionEditorContent;
  onChange: (content: SectionEditorContent) => void;
  sectionsTitle: string;
  emailPlaceholder: string;
  introductionPlaceholder: string;
}

export function SectionEditor({
  content,
  onChange,
  sectionsTitle,
  emailPlaceholder,
  introductionPlaceholder,
}: SectionEditorProps) {
  const handleUpdateSection = (index: number, field: string, value: string) => {
    const newSections = [...content.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    onChange({ ...content, sections: newSections });
  };

  const handleAddSection = () => {
    onChange({
      ...content,
      sections: [...content.sections, { title: "", content: "" }],
    });
  };

  const handleRemoveSection = (index: number) => {
    onChange({
      ...content,
      sections: content.sections.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      {/* Meta Information */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">Page Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Last Updated
            </label>
            <Input
              value={content.lastUpdated}
              onChange={(e) =>
                onChange({ ...content, lastUpdated: e.target.value })
              }
              placeholder="e.g., December 2024"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Contact Email
            </label>
            <Input
              value={content.contactEmail}
              onChange={(e) =>
                onChange({ ...content, contactEmail: e.target.value })
              }
              placeholder={emailPlaceholder}
            />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">Introduction</h3>
        <Textarea
          value={content.introduction}
          onChange={(e) =>
            onChange({ ...content, introduction: e.target.value })
          }
          rows={4}
          placeholder={introductionPlaceholder}
        />
      </section>

      {/* Sections */}
      <EditableListSection
        title={sectionsTitle}
        items={content.sections}
        addButtonLabel="Add Section"
        itemLabel="Section"
        onAdd={handleAddSection}
        onRemove={handleRemoveSection}
        onUpdate={handleUpdateSection}
        renderItem={(sectionItem, index, onUpdate) => (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm">Title</label>
              <Input
                value={sectionItem.title}
                onChange={(e) => onUpdate(index, "title", e.target.value)}
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">Content</label>
              <Textarea
                value={sectionItem.content}
                onChange={(e) => onUpdate(index, "content", e.target.value)}
                rows={4}
                placeholder="Section content..."
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
