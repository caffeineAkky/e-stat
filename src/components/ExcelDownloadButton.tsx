"use client";

import { utils, writeFileXLSX } from "xlsx";
import type { ExcelDownloadButtonProps } from "@/types/estat";

export default function ExcelDownloadButton({ rows }: ExcelDownloadButtonProps) {
    const handleDownload = () => {

        const exportRows = rows.flatMap((row) => [
            {
                年: row.year,
                月: 0,
                数量: row.totalQuantity,
                金額: row.totalAmount,
            },
            ...row.monthlyData.map((monthly) => ({
                年: row.year,
                月: monthly.month,
                数量: monthly.quantity,
                金額: monthly.amount,
            }))
        ]);

        // 配列データからワークシートを作る
        const worksheet = utils.json_to_sheet(exportRows);

        // Excelブックを作る
        const workbook = utils.book_new();

        // ブックにシートを追加する
        utils.book_append_sheet(workbook, worksheet, "貿易統計");

        // Excelファイルとしてダウンロードする
        writeFileXLSX(workbook, "trade-data.xlsx");
    };

    return (
        <button type="button" onClick={handleDownload}>
            Excelをダウンロード
        </button>
    );
}
