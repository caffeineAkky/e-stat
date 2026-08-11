"use client";

import { utils, writeFileXLSX } from "xlsx";
import type { ExcelDownloadButtonProps } from "@/types/estat";

export default function ExcelDownloadButton({ rows }: ExcelDownloadButtonProps) {
    const handleDownload = () => {

        // 配列データからワークシートを作る
        const worksheet = utils.json_to_sheet(rows);

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