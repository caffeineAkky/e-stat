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
