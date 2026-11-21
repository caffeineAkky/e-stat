"use client";

import { utils, writeFileXLSX } from "xlsx";
import type { ExcelDownloadButtonProps } from "@/types/estat";
import createExportRows from "@/lib/estat/createExportRows";
import createExportFileName from "@/lib/estat/createExportFileName";

export default function ExcelDownloadButton({ result }: ExcelDownloadButtonProps) {
    const handleDownload = () => {

        const exportRows = createExportRows(result);

        // 配列データからワークシートを作る
        const worksheet = utils.json_to_sheet(exportRows);

        // Excelブックを作る
        const workbook = utils.book_new();

        // ブックにシートを追加する
        utils.book_append_sheet(workbook, worksheet, "貿易統計");

        // Excelファイルとしてダウンロードする
        writeFileXLSX(workbook, createExportFileName(result));
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            // 主な操作である「検索」と競わないよう、塗りつぶさず枠線だけの控えめな見た目にする。
            // 高さと角丸は検索ボタンに揃える。見出しが長くても潰れないよう縮ませない
            className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-md border border-foreground/40 px-4 font-bold hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
            Excelをダウンロード
        </button>
    );
}
