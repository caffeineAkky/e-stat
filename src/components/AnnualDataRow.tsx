"use client";

import { useState } from "react";
import type { AnnualTradeData, Units } from "@/types/estat";
import formatNumber from "@/lib/estat/formatNumber";
import MonthlyDetailTable from "./MonthlyDetailTable";

const cellClassName = "border border-foreground/20 px-3 py-2";
// 数値は桁をそろえて比べやすくするため、右寄せにして数字の幅を等幅にする
const numberCellClassName = `${cellClassName} text-right tabular-nums`;

type AnnualDataRowProps = {
    data: AnnualTradeData;
    units: Units;
}

export default function AnnualDataRow({ data, units }: AnnualDataRowProps ) {
    const [isOpen, setIsOpen ] = useState(false);

    const detailId = `monthly-detail-${data.year}`;

    return (
        <>
            {/* 開いている行は背景色を変えて、どの年の月別を見ているか分かるようにする */}
            <tr className={isOpen ? "bg-foreground/10" : undefined}>
                <td className={cellClassName}>
                    {/* 開閉の状態は aria-expanded で伝えるので、名前は開閉で変えない */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-controls={detailId}
                        aria-label={`${data.year}年の月別詳細`}
                        className="inline-flex items-center gap-1 rounded-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        {/* ▸ と ▾ で幅が変わって年がずれないよう、記号の幅を固定する */}
                        <span aria-hidden="true" className="inline-block w-3 text-center">
                            {isOpen ? "▾" : "▸"}
                        </span>
                        {data.year}
                    </button>
                </td>
                <td className={numberCellClassName}>{formatNumber(data.totalQuantity)}</td>
                <td className={numberCellClassName}>{formatNumber(data.totalAmount)}</td>
            </tr>

            {isOpen && (
                <tr id={detailId}>
                    <td colSpan={3} className={`${cellClassName} py-3`}>
                        <MonthlyDetailTable rows={data.monthlyData} units={units}/>
                    </td>
                </tr>
            )}
        </>
    )
}
