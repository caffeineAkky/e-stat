'use client';

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { SelectedYearsOption } from "@/types/search";
import { changeYearIntent } from "@/lib/estat/constants";

export default function YearSelect({ years, defaultValue, currentTableId }: {
    years: SelectedYearsOption[],
    defaultValue?: string,
    currentTableId: string; 
}) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    return (
        <select 
            name="year" 
            defaultValue={defaultValue}
            disabled={isPending}
            // SearchForm の国・品目の select と同じ見た目にし、年の切り替え中（disabled）は薄くして待ち状態を示す
            className="h-10 w-full min-w-0 rounded-md border border-fg-sub/70 bg-surface px-3 text-fg disabled:cursor-wait disabled:opacity-50"
            onChange={(e) => {
                const next = years.find((y) => y.yearSearchValue === e.target.value);
                if(!next || next.tableId === currentTableId) return;
                
                const form = new FormData(e.currentTarget.form!);
                const params = new URLSearchParams({
                    year: next.yearSearchValue,
                    area: String(form.get("area") ?? ""),
                    item: String(form.get("item") ?? ""),
                    intent: changeYearIntent,
                });
                startTransition(() => router.replace(`?${params}`));
            }}
        >
            {years.map((year) => (
                <option key={year.yearSearchValue} value={year.yearSearchValue}>
                    {year.year}
                </option>
            ))}
        </select>
    )
}
