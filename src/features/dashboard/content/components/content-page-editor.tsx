"use client";

import { ArrowLeft, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type {
  AboutPageContent,
  AboutProcessStep,
  AboutTeamMember,
  AboutValue,
  CarePageContent,
  CareWarning,
  FaqCategory,
  FaqItem,
  FaqPageContent,
  GlazeType,
  PrivacyPageContent,
  PrivacySection,
  ReturnStep,
  ReturnsPolicy,
  ShippingInfo,
  ShippingOption,
  ShippingPageContent,
  TermsPageContent,
  TermsSection,
} from "@/graphql/generated/types";

import { type ContentPageEditorProps, ICON_OPTIONS } from "../types";

export function ContentPageEditor({
  viewModel,
  onSave,
  onCancel,
}: ContentPageEditorProps) {
  const [content, setContent] = useState(viewModel.content);

  const handleSave = useCallback(async () => {
    await onSave(content);
  }, [content, onSave]);

  return (
    <form action={handleSave} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Content Pages
        </Button>
        <ContentSaveButton />
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-6 text-xl font-semibold">Edit {viewModel.title}</h2>

        {viewModel.slug === "about" && (
          <AboutEditor
            content={content as AboutPageContent}
            onChange={(c) => setContent(c)}
          />
        )}

        {viewModel.slug === "faq" && (
          <FAQEditor
            content={content as FaqPageContent}
            onChange={(c) => setContent(c)}
          />
        )}

        {viewModel.slug === "shipping" && (
          <ShippingEditor
            content={content as ShippingPageContent}
            onChange={(c) => setContent(c)}
          />
        )}

        {viewModel.slug === "care" && (
          <CareEditor
            content={content as CarePageContent}
            onChange={(c) => setContent(c)}
          />
        )}

        {viewModel.slug === "privacy" && (
          <PrivacyEditor
            content={content as PrivacyPageContent}
            onChange={(c) => setContent(c)}
          />
        )}

        {viewModel.slug === "terms" && (
          <TermsEditor
            content={content as TermsPageContent}
            onChange={(c) => setContent(c)}
          />
        )}
      </div>
    </form>
  );
}

function ContentSaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Save className="mr-2 h-4 w-4" />
      )}
      Save Changes
    </Button>
  );
}

function AboutEditor({
  content,
  onChange,
}: {
  content: AboutPageContent;
  onChange: (content: AboutPageContent) => void;
}) {
  const updateStory = (field: string, value: string | string[]) => {
    onChange({ ...content, [field]: value });
  };

  const updateValue = (
    index: number,
    field: keyof AboutValue,
    value: string,
  ) => {
    const newValues = [...content.values];
    newValues[index] = { ...newValues[index], [field]: value };
    onChange({ ...content, values: newValues });
  };

  const addValue = () => {
    onChange({
      ...content,
      values: [...content.values, { icon: "star", title: "", description: "" }],
    });
  };

  const removeValue = (index: number) => {
    onChange({
      ...content,
      values: content.values.filter((_, i) => i !== index),
    });
  };

  const updateTeamMember = (
    index: number,
    field: keyof AboutTeamMember,
    value: string,
  ) => {
    const newTeam = [...content.team];
    newTeam[index] = { ...newTeam[index], [field]: value };
    onChange({ ...content, team: newTeam });
  };

  const addTeamMember = () => {
    onChange({
      ...content,
      team: [...content.team, { name: "", role: "", image: "", bio: "" }],
    });
  };

  const removeTeamMember = (index: number) => {
    onChange({
      ...content,
      team: content.team.filter((_, i) => i !== index),
    });
  };

  const updateProcessStep = (
    index: number,
    field: keyof AboutProcessStep,
    value: string,
  ) => {
    const newSteps = [...content.processSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onChange({ ...content, processSteps: newSteps });
  };

  const addProcessStep = () => {
    const nextStep = String(content.processSteps.length + 1).padStart(2, "0");
    onChange({
      ...content,
      processSteps: [
        ...content.processSteps,
        { step: nextStep, title: "", description: "" },
      ],
    });
  };

  const removeProcessStep = (index: number) => {
    onChange({
      ...content,
      processSteps: content.processSteps.filter((_, i) => i !== index),
    });
  };

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
              onChange={(e) => updateStory("storyTitle", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Subtitle</label>
            <Input
              value={content.storySubtitle}
              onChange={(e) => updateStory("storySubtitle", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Story Paragraphs (one per line)
            </label>
            <Textarea
              value={content.storyContent.join("\n\n")}
              onChange={(e) =>
                updateStory(
                  "storyContent",
                  e.target.value.split("\n\n").filter(Boolean),
                )
              }
              rows={6}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Values</h3>
          <Button variant="outline" size="sm" onClick={addValue}>
            <Plus className="mr-2 h-4 w-4" />
            Add Value
          </Button>
        </div>
        <div className="space-y-4">
          {content.values.map((value, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Value {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeValue(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm">Icon</label>
                  <Select
                    value={value.icon}
                    onValueChange={(v) => updateValue(index, "icon", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm">Title</label>
                  <Input
                    value={value.title}
                    onChange={(e) =>
                      updateValue(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-sm">Description</label>
                  <Textarea
                    value={value.description}
                    onChange={(e) =>
                      updateValue(index, "description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Team Members</h3>
          <Button variant="outline" size="sm" onClick={addTeamMember}>
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
        <div className="space-y-4">
          {content.team.map((member, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Member {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTeamMember(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm">Name</label>
                  <Input
                    value={member.name}
                    onChange={(e) =>
                      updateTeamMember(index, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Role</label>
                  <Input
                    value={member.role}
                    onChange={(e) =>
                      updateTeamMember(index, "role", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm">Image URL</label>
                  <Input
                    value={member.image}
                    onChange={(e) =>
                      updateTeamMember(index, "image", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm">Bio</label>
                  <Textarea
                    value={member.bio}
                    onChange={(e) =>
                      updateTeamMember(index, "bio", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Process Steps</h3>
          <Button variant="outline" size="sm" onClick={addProcessStep}>
            <Plus className="mr-2 h-4 w-4" />
            Add Step
          </Button>
        </div>
        <div className="space-y-4">
          {content.processSteps.map((step, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Step {step.step}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProcessStep(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm">Step Number</label>
                  <Input
                    value={step.step}
                    onChange={(e) =>
                      updateProcessStep(index, "step", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm">Title</label>
                  <Input
                    value={step.title}
                    onChange={(e) =>
                      updateProcessStep(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-sm">Description</label>
                  <Textarea
                    value={step.description}
                    onChange={(e) =>
                      updateProcessStep(index, "description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FAQEditor({
  content,
  onChange,
}: {
  content: FaqPageContent;
  onChange: (content: FaqPageContent) => void;
}) {
  const updateCategory = (
    categoryIndex: number,
    field: keyof FaqCategory,
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
        <div key={categoryIndex} className="rounded-lg border p-4">
          <div className="mb-4 flex items-center justify-between">
            <Input
              value={category.title}
              onChange={(e) =>
                updateCategory(categoryIndex, "title", e.target.value)
              }
              placeholder="Category Title"
              className="max-w-xs font-semibold"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addFAQ(categoryIndex)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add FAQ
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCategory(categoryIndex)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {category.faqs.map((faq, faqIndex) => (
              <div key={faqIndex} className="rounded border bg-gray-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    FAQ {faqIndex + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFAQ(categoryIndex, faqIndex)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    value={faq.question}
                    onChange={(e) =>
                      updateFAQ(
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
                      updateFAQ(
                        categoryIndex,
                        faqIndex,
                        "answer",
                        e.target.value,
                      )
                    }
                    placeholder="Answer"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ShippingEditor({
  content,
  onChange,
}: {
  content: ShippingPageContent;
  onChange: (content: ShippingPageContent) => void;
}) {
  const updateShippingOption = (
    index: number,
    field: keyof ShippingOption,
    value: string,
  ) => {
    const newOptions = [...content.shippingOptions];
    newOptions[index] = { ...newOptions[index], [field]: value };
    onChange({ ...content, shippingOptions: newOptions });
  };

  const addShippingOption = () => {
    onChange({
      ...content,
      shippingOptions: [
        ...content.shippingOptions,
        { icon: "truck", title: "", description: "", price: "" },
      ],
    });
  };

  const removeShippingOption = (index: number) => {
    onChange({
      ...content,
      shippingOptions: content.shippingOptions.filter((_, i) => i !== index),
    });
  };

  const updateShippingInfo = (
    index: number,
    field: keyof ShippingInfo,
    value: string,
  ) => {
    const newInfo = [...content.shippingInfo];
    newInfo[index] = { ...newInfo[index], [field]: value };
    onChange({ ...content, shippingInfo: newInfo });
  };

  const addShippingInfo = () => {
    onChange({
      ...content,
      shippingInfo: [...content.shippingInfo, { title: "", content: "" }],
    });
  };

  const removeShippingInfo = (index: number) => {
    onChange({
      ...content,
      shippingInfo: content.shippingInfo.filter((_, i) => i !== index),
    });
  };

  const updateReturnsPolicy = (
    index: number,
    field: keyof ReturnsPolicy,
    value: string,
  ) => {
    const newPolicy = [...content.returnsPolicy];
    newPolicy[index] = { ...newPolicy[index], [field]: value };
    onChange({ ...content, returnsPolicy: newPolicy });
  };

  const addReturnsPolicy = () => {
    onChange({
      ...content,
      returnsPolicy: [
        ...content.returnsPolicy,
        { icon: "shield", title: "", description: "" },
      ],
    });
  };

  const removeReturnsPolicy = (index: number) => {
    onChange({
      ...content,
      returnsPolicy: content.returnsPolicy.filter((_, i) => i !== index),
    });
  };

  const updateReturnStep = (
    index: number,
    field: keyof ReturnStep,
    value: string,
  ) => {
    const newSteps = [...content.returnSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onChange({ ...content, returnSteps: newSteps });
  };

  const addReturnStep = () => {
    const nextStep = String(content.returnSteps.length + 1).padStart(2, "0");
    onChange({
      ...content,
      returnSteps: [
        ...content.returnSteps,
        { step: nextStep, title: "", description: "" },
      ],
    });
  };

  const removeReturnStep = (index: number) => {
    onChange({
      ...content,
      returnSteps: content.returnSteps.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      {/* Shipping Options */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shipping Options</h3>
          <Button variant="outline" size="sm" onClick={addShippingOption}>
            <Plus className="mr-2 h-4 w-4" />
            Add Option
          </Button>
        </div>
        <div className="space-y-4">
          {content.shippingOptions.map((option, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Option {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeShippingOption(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1 block text-sm">Icon</label>
                  <Select
                    value={option.icon}
                    onValueChange={(v) =>
                      updateShippingOption(index, "icon", v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm">Title</label>
                  <Input
                    value={option.title}
                    onChange={(e) =>
                      updateShippingOption(index, "title", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Description</label>
                  <Input
                    value={option.description}
                    onChange={(e) =>
                      updateShippingOption(index, "description", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Price</label>
                  <Input
                    value={option.price}
                    onChange={(e) =>
                      updateShippingOption(index, "price", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping Info */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <Button variant="outline" size="sm" onClick={addShippingInfo}>
            <Plus className="mr-2 h-4 w-4" />
            Add Info
          </Button>
        </div>
        <div className="space-y-4">
          {content.shippingInfo.map((info, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Info {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeShippingInfo(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  value={info.title}
                  onChange={(e) =>
                    updateShippingInfo(index, "title", e.target.value)
                  }
                  placeholder="Title"
                />
                <Textarea
                  value={info.content}
                  onChange={(e) =>
                    updateShippingInfo(index, "content", e.target.value)
                  }
                  placeholder="Content"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Returns Policy */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Returns Policy</h3>
          <Button variant="outline" size="sm" onClick={addReturnsPolicy}>
            <Plus className="mr-2 h-4 w-4" />
            Add Policy
          </Button>
        </div>
        <div className="space-y-4">
          {content.returnsPolicy.map((policy, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Policy {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReturnsPolicy(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm">Icon</label>
                  <Select
                    value={policy.icon}
                    onValueChange={(v) => updateReturnsPolicy(index, "icon", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm">Title</label>
                  <Input
                    value={policy.title}
                    onChange={(e) =>
                      updateReturnsPolicy(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-sm">Description</label>
                  <Textarea
                    value={policy.description}
                    onChange={(e) =>
                      updateReturnsPolicy(index, "description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Return Steps */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Return Steps</h3>
          <Button variant="outline" size="sm" onClick={addReturnStep}>
            <Plus className="mr-2 h-4 w-4" />
            Add Step
          </Button>
        </div>
        <div className="space-y-4">
          {content.returnSteps.map((step, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Step {step.step}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReturnStep(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm">Step Number</label>
                  <Input
                    value={step.step}
                    onChange={(e) =>
                      updateReturnStep(index, "step", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm">Title</label>
                  <Input
                    value={step.title}
                    onChange={(e) =>
                      updateReturnStep(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-sm">Description</label>
                  <Textarea
                    value={step.description}
                    onChange={(e) =>
                      updateReturnStep(index, "description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CareEditor({
  content,
  onChange,
}: {
  content: CarePageContent;
  onChange: (content: CarePageContent) => void;
}) {
  const updateGlazeType = (
    index: number,
    field: keyof GlazeType,
    value: string,
  ) => {
    const newTypes = [...content.glazeTypes];
    newTypes[index] = { ...newTypes[index], [field]: value };
    onChange({ ...content, glazeTypes: newTypes });
  };

  const addGlazeType = () => {
    onChange({
      ...content,
      glazeTypes: [
        ...content.glazeTypes,
        { name: "", icon: "sparkles", description: "", care: "" },
      ],
    });
  };

  const removeGlazeType = (index: number) => {
    onChange({
      ...content,
      glazeTypes: content.glazeTypes.filter((_, i) => i !== index),
    });
  };

  const updateWarning = (
    index: number,
    field: keyof CareWarning,
    value: string,
  ) => {
    const newWarnings = [...content.warnings];
    newWarnings[index] = { ...newWarnings[index], [field]: value };
    onChange({ ...content, warnings: newWarnings });
  };

  const addWarning = () => {
    onChange({
      ...content,
      warnings: [
        ...content.warnings,
        { icon: "alert-triangle", title: "", description: "" },
      ],
    });
  };

  const removeWarning = (index: number) => {
    onChange({
      ...content,
      warnings: content.warnings.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      {/* Glaze Types */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Glaze Types</h3>
          <Button variant="outline" size="sm" onClick={addGlazeType}>
            <Plus className="mr-2 h-4 w-4" />
            Add Glaze Type
          </Button>
        </div>
        <div className="space-y-4">
          {content.glazeTypes.map((glaze, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">
                  Glaze Type {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGlazeType(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm">Name</label>
                  <Input
                    value={glaze.name}
                    onChange={(e) =>
                      updateGlazeType(index, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Icon</label>
                  <Select
                    value={glaze.icon}
                    onValueChange={(v) => updateGlazeType(index, "icon", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-sm">Description</label>
                  <Textarea
                    value={glaze.description}
                    onChange={(e) =>
                      updateGlazeType(index, "description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-sm">
                    Care Instructions
                  </label>
                  <Textarea
                    value={glaze.care}
                    onChange={(e) =>
                      updateGlazeType(index, "care", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Warnings */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Important Warnings</h3>
          <Button variant="outline" size="sm" onClick={addWarning}>
            <Plus className="mr-2 h-4 w-4" />
            Add Warning
          </Button>
        </div>
        <div className="space-y-4">
          {content.warnings.map((warning, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Warning {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWarning(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm">Icon</label>
                  <Select
                    value={warning.icon}
                    onValueChange={(v) => updateWarning(index, "icon", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm">Title</label>
                  <Input
                    value={warning.title}
                    onChange={(e) =>
                      updateWarning(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-sm">Description</label>
                  <Textarea
                    value={warning.description}
                    onChange={(e) =>
                      updateWarning(index, "description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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

function PrivacyEditor({
  content,
  onChange,
}: {
  content: PrivacyPageContent;
  onChange: (content: PrivacyPageContent) => void;
}) {
  const updateSection = (
    index: number,
    field: keyof PrivacySection,
    value: string,
  ) => {
    const newSections = [...content.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    onChange({ ...content, sections: newSections });
  };

  const addSection = () => {
    onChange({
      ...content,
      sections: [...content.sections, { title: "", content: "" }],
    });
  };

  const removeSection = (index: number) => {
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
              placeholder="privacy@example.com"
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
          placeholder="Introduction paragraph for the privacy policy..."
        />
      </section>

      {/* Sections */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Policy Sections</h3>
          <Button variant="outline" size="sm" onClick={addSection}>
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>
        <div className="space-y-4">
          {content.sections.map((section, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Section {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSection(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm">Title</label>
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      updateSection(index, "title", e.target.value)
                    }
                    placeholder="Section title"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Content</label>
                  <Textarea
                    value={section.content}
                    onChange={(e) =>
                      updateSection(index, "content", e.target.value)
                    }
                    rows={4}
                    placeholder="Section content..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TermsEditor({
  content,
  onChange,
}: {
  content: TermsPageContent;
  onChange: (content: TermsPageContent) => void;
}) {
  const updateSection = (
    index: number,
    field: keyof TermsSection,
    value: string,
  ) => {
    const newSections = [...content.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    onChange({ ...content, sections: newSections });
  };

  const addSection = () => {
    onChange({
      ...content,
      sections: [...content.sections, { title: "", content: "" }],
    });
  };

  const removeSection = (index: number) => {
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
              placeholder="legal@example.com"
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
          placeholder="Introduction paragraph for the terms of service..."
        />
      </section>

      {/* Sections */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Terms Sections</h3>
          <Button variant="outline" size="sm" onClick={addSection}>
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>
        <div className="space-y-4">
          {content.sections.map((section, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Section {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSection(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm">Title</label>
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      updateSection(index, "title", e.target.value)
                    }
                    placeholder="Section title"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Content</label>
                  <Textarea
                    value={section.content}
                    onChange={(e) =>
                      updateSection(index, "content", e.target.value)
                    }
                    rows={4}
                    placeholder="Section content..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
