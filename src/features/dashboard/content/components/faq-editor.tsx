import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type {
  FaqCategory,
  FaqItem,
  FaqPageContent,
} from "@/graphql/generated/types";

interface FAQEditorProps {
  content: FaqPageContent;
  onChange: (content: FaqPageContent) => void;
}

export function FAQEditor({ content, onChange }: FAQEditorProps) {
  const updateCategory = (
    categoryIndex: number,
    field: string,
    value: string | FaqItem[],
  ) => {
    const newCategories = [...content.categories];
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      [field]: value,
    };
    onChange({ ...content, categories: newCategories });
  };

  const addCategory = () => {
    onChange({
      ...content,
      categories: [...content.categories, { title: "", faqs: [] }],
    });
  };

  const removeCategory = (index: number) => {
    onChange({
      ...content,
      categories: content.categories.filter((_, i) => i !== index),
    });
  };

  const updateFAQ = (
    categoryIndex: number,
    faqIndex: number,
    field: keyof FaqItem,
    value: string,
  ) => {
    const newCategories = [...content.categories];
    const newFaqs = [...newCategories[categoryIndex].faqs];
    newFaqs[faqIndex] = { ...newFaqs[faqIndex], [field]: value };
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      faqs: newFaqs,
    };
    onChange({ ...content, categories: newCategories });
  };

  const addFAQ = (categoryIndex: number) => {
    const newCategories = [...content.categories];
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      faqs: [
        ...newCategories[categoryIndex].faqs,
        { question: "", answer: "" },
      ],
    };
    onChange({ ...content, categories: newCategories });
  };

  const removeFAQ = (categoryIndex: number, faqIndex: number) => {
    const newCategories = [...content.categories];
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      faqs: newCategories[categoryIndex].faqs.filter((_, i) => i !== faqIndex),
    };
    onChange({ ...content, categories: newCategories });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">FAQ Categories</h3>
        <Button variant="outline" size="sm" onClick={addCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {content.categories.map((category, categoryIndex) => (
        <FAQCategoryCard
          key={categoryIndex}
          category={category}
          categoryIndex={categoryIndex}
          onUpdateCategory={updateCategory}
          onRemoveCategory={removeCategory}
          onAddFAQ={addFAQ}
          onUpdateFAQ={updateFAQ}
          onRemoveFAQ={removeFAQ}
        />
      ))}
    </div>
  );
}

function FAQCategoryCard({
  category,
  categoryIndex,
  onUpdateCategory,
  onRemoveCategory,
  onAddFAQ,
  onUpdateFAQ,
  onRemoveFAQ,
}: {
  category: FaqCategory;
  categoryIndex: number;
  onUpdateCategory: (index: number, field: string, value: string) => void;
  onRemoveCategory: (index: number) => void;
  onAddFAQ: (categoryIndex: number) => void;
  onUpdateFAQ: (
    categoryIndex: number,
    faqIndex: number,
    field: keyof FaqItem,
    value: string,
  ) => void;
  onRemoveFAQ: (categoryIndex: number, faqIndex: number) => void;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4 flex items-center justify-between">
        <Input
          value={category.title}
          onChange={(e) =>
            onUpdateCategory(categoryIndex, "title", e.target.value)
          }
          placeholder="Category Title"
          className="max-w-xs font-semibold"
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddFAQ(categoryIndex)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveCategory(categoryIndex)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {category.faqs.map((faq, faqIndex) => (
          <div key={faqIndex} className="rounded border bg-gray-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">FAQ {faqIndex + 1}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFAQ(categoryIndex, faqIndex)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                value={faq.question}
                onChange={(e) =>
                  onUpdateFAQ(
                    categoryIndex,
                    faqIndex,
                    "question",
                    e.target.value,
                  )
                }
                placeholder="Question"
              />
              <Textarea
                value={faq.answer}
                onChange={(e) =>
                  onUpdateFAQ(categoryIndex, faqIndex, "answer", e.target.value)
                }
                placeholder="Answer"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
