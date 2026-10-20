'use client';

import { useFormStatus } from "react-dom";

export default function SearchButton() {
    const isSearching: boolean = useFormStatus().pending;

    return (
        <button type="submit" disabled={isSearching}>
            {isSearching ? "検索中..." : "検索"}
        </button>
    );
}
