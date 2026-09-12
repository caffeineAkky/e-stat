"use client";

import { useState } from "react";
import type { AnnualTradeData, TradeUnits } from "@/types/estat";
import MonthlyDetailTable from "./MonthlyDetailTable";

type AnnualDataRowProps = {
    data: AnnualTradeData;
    units: TradeUnits;
}

export default function AnnualDataRow({ data, units }: AnnualDataRowProps ) {
    const [isOpen, setIsOpen ] = useState(false);

    const detailId = `monthly-detail-${data.year}`;

    return (
        <>
            <tr>
                <td>{data.year}</td>
                <td>{data.totalQuantity}</td>
                <td>{data.totalAmount}</td>
                <td>
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-controls={detailId}
                    >
                        {isOpen ? "閉じる" : "月別詳細を見る"}
                    </button>
                </td>
            </tr>

            {isOpen && (
                <tr id={detailId}>
                    <td colSpan={4}>
                        <MonthlyDetailTable rows={data.monthlyData} units={units}/>
                    </td>
                </tr>
            )}
        </>
    )
}