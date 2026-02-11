"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  rectIntersection,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { KanbanBoardSkeleton } from "@/components/skeletons";

import { cn } from "@/lib/utils";

export interface KanbanColumn<T> {
  id: string;
  title: string;
  items: T[];
  colorClass: string;
}

export interface KanbanBoardProps<T extends { id: string }> {
  columns: KanbanColumn<T>[];
  onMove: (
    itemId: string,
    fromColumn: string,
    toColumn: string,
  ) => Promise<void>;
  renderCard: (item: T, isDragging?: boolean) => React.ReactNode;
  isLoading?: boolean;
}

interface SortableCardProps<T extends { id: string }> {
  item: T;
  renderCard: (item: T, isDragging?: boolean) => React.ReactNode;
}

function SortableCard<T extends { id: string }>({
  item,
  renderCard,
}: SortableCardProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <div className="absolute top-3 left-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <GripVerticalIcon className="size-4 text-neutral-400" />
      </div>
      {renderCard(item, isDragging)}
    </div>
  );
}

interface DroppableColumnProps {
  id: string;
  children: React.ReactNode;
  isOver?: boolean;
}

interface KanbanColumnHeaderProps {
  title: string;
  count: number;
  colorClass: string;
}

function KanbanColumnHeader({
  title,
  count,
  colorClass,
}: KanbanColumnHeaderProps) {
  return (
    <div
      className={cn(
        "mb-3 flex items-center gap-2 rounded-lg border px-3 py-1.5",
        colorClass,
      )}
    >
      <span className="text-sm font-semibold">{title}</span>
      <span className="rounded-full bg-white/50 px-2 py-0.5 text-xs font-medium">
        {count}
      </span>
    </div>
  );
}

function DroppableColumn({ id, children, isOver }: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[100px] space-y-3 rounded-xl p-2 transition-colors",
        isOver ? "bg-primary/10" : "bg-neutral-50/50",
      )}
    >
      {children}
    </div>
  );
}

export function KanbanBoard<T extends { id: string }>({
  columns,
  onMove,
  renderCard,
  isLoading,
}: KanbanBoardProps<T>) {
  const [activeItem, setActiveItem] = useState<T | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  const findColumnByItemId = useCallback(
    (itemId: string) => {
      for (const column of columns) {
        if (column.items.some((item) => item.id === itemId)) {
          return column;
        }
      }
      return null;
    },
    [columns],
  );

  const findColumnById = useCallback(
    (columnId: string) => {
      return columns.find((col) => col.id === columnId) || null;
    },
    [columns],
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const column = findColumnByItemId(active.id as string);
      if (column) {
        const item = column.items.find((i) => i.id === active.id);
        if (item) {
          setActiveItem(item);
        }
      }
    },
    [findColumnByItemId],
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { over } = event;

      if (!over) {
        setOverColumnId(null);
        return;
      }

      // Check if over is a column
      const columnById = findColumnById(over.id as string);
      if (columnById) {
        setOverColumnId(columnById.id);
        return;
      }

      // Check if over is an item in a column
      const columnByItem = findColumnByItemId(over.id as string);
      if (columnByItem) {
        setOverColumnId(columnByItem.id);
      }
    },
    [findColumnById, findColumnByItemId],
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveItem(null);
      setOverColumnId(null);

      if (!over) return;

      const activeColumn = findColumnByItemId(active.id as string);

      // Check if dropped on a column directly
      let overColumn = findColumnById(over.id as string);

      // If not dropped on a column, check if dropped on an item
      if (!overColumn) {
        overColumn = findColumnByItemId(over.id as string);
      }

      if (!activeColumn || !overColumn) return;

      if (activeColumn.id !== overColumn.id) {
        await onMove(active.id as string, activeColumn.id, overColumn.id);
      }
    },
    [findColumnById, findColumnByItemId, onMove],
  );

  if (isLoading) {
    return <KanbanBoardSkeleton />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="min-w-[280px] flex-1">
            <KanbanColumnHeader
              title={column.title}
              count={column.items.length}
              colorClass={column.colorClass}
            />

            <SortableContext
              id={column.id}
              items={column.items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <DroppableColumn
                id={column.id}
                isOver={overColumnId === column.id}
              >
                {column.items.length === 0 ? (
                  <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 text-sm text-neutral-400">
                    Drop here
                  </div>
                ) : (
                  column.items.map((item) => (
                    <SortableCard
                      key={item.id}
                      item={item}
                      renderCard={renderCard}
                    />
                  ))
                )}
              </DroppableColumn>
            </SortableContext>
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className="scale-105 rotate-3 shadow-xl">
            {renderCard(activeItem, true)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
