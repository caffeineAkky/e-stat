'use client';

import { useFormStatus } from "react-dom";

export default function SearchButton() {
    const isSearching: boolean = useFormStatus().pending;

    return (
        <button
            type="submit"
            disabled={isSearching}
            // 主な操作なので強調色（accent）で塗りつぶして目立たせる。
            // 高さは select と同じ h-10 で揃える
            className="grid h-10 place-items-center whitespace-nowrap rounded-md border border-accent bg-accent px-6 font-bold text-on-accent hover:border-accent-hover hover:bg-accent-hover disabled:cursor-wait disabled:opacity-50"
        >
            {/* 2つの文言を同じセルに重ね、長い方の幅を常に確保する。
                文言が切り替わってもボタンの幅が変わらず、隣の select が動かない。
                invisible（visibility: hidden）の方は読み上げられない */}
            <span className={`col-start-1 row-start-1 ${isSearching ? "invisible" : ""}`}>検索</span>
            <span className={`col-start-1 row-start-1 ${isSearching ? "" : "invisible"}`}>検索中...</span>
        </button>
    );
}
