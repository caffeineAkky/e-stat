"use client";

import { utils, writeFileXLSX } from "xlsx";

type ExcelRow = {
    月: string;
    数量: number;
    金額: number;
};

type Props = {
    rows: ExcelRow[];
};

export default function ExcelDownloadButton({ rows }: Props) {
    const handleDownload = () => {
        const worksheet = utils.json_to_sheet(rows);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "貿易統計");
        writeFileXLSX(workbook, "trade-data.xlsx");
    };

    return (
        <button type="button" onClick={handleDownload}>
            Excelをダウンロード
        </button>
    );
}