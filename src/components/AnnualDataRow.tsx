"use client";

import { useState } from "react";
import type { AnnualTradeData, Units } from "@/types/estat";
import formatNumber from "@/lib/estat/formatNumber";
import MonthlyDetailTable from "./MonthlyDetailTable";

const cellClassName = "border border-line px-3 py-2";
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
            {/* 年の行は年間の合計。月別を開いているときは合計行として accent-soft の背景と左の線で強調し、
                どの年の月別を見ているか分かるようにする */}
            <tr className={isOpen ? "bg-accent-soft text-on-accent-soft" : "bg-surface"}>
                {/* 左の線は border ではなく内側の影で描く。border-collapse の表で border を太くすると、
                    開閉のたびに列幅がずれるため */}
                <td className={`${cellClassName} ${isOpen ? "shadow-[inset_3px_0_0_var(--color-accent)]" : ""}`}>
                    {/* 開閉の状態は aria-expanded で伝えるので、名前は開閉で変えない。
                        フォーカスリングは globals.css でまとめて指定している */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-controls={detailId}
                        aria-label={`${data.year}年の月別詳細`}
                        className="inline-flex items-center gap-1 rounded-sm font-bold hover:underline"
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
                    <td colSpan={3} className={`${cellClassName} bg-surface py-3`}>
                        <MonthlyDetailTable rows={data.monthlyData} units={units}/>
                    </td>
                </tr>
            )}
        </>
    )
}
