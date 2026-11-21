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
            // 主な操作である「検索」と競わないよう、塗りつぶさず accent の枠線と文字だけの控えめな見た目にする。
            // ホバーの背景を accent-soft にするとライトで文字が 4.5:1 を割るので、表と同じ surface にする。
            // 高さと角丸は検索ボタンに揃える。見出しが長くても潰れないよう縮ませない。
            // フォーカスリングは globals.css でまとめて指定している
            className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-md border border-accent px-4 font-bold text-accent hover:bg-surface"
        >
            {/* アイコンは flex の子にせず、文言と同じ span の中にインラインで置く。
                flex の先頭がアイコンだとボタンのベースラインがアイコンの下端になり、
                見出しとベースラインで揃えている位置がずれるため */}
            <span>
                {/* 押すとファイルが保存されることを示す飾り。ボタン名は文言で伝わるので読み上げない。
                    線を currentColor で描き、ライト・ダークどちらでも文字と同じ色にする */}
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 inline-block size-4 align-[-0.125em]"
                >
                    <path d="M12 4v11" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
                </svg>
                Excelをダウンロード
            </span>
        </button>
    );
}
