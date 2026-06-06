"use client";

import { CATEGORIES, type FilterCategory } from "@/data/articles";

interface CategoryFilterProps {
  active: FilterCategory;
  onChange: (cat: FilterCategory) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto no-scrollbar px-4 -mx-4"
      role="tablist"
      aria-label="Filter kategori artikel"
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition min-h-[44px] ${
              isActive
                ? "bg-[var(--accent-red)] text-white"
                : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent-red)] hover:text-[var(--foreground)]"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
