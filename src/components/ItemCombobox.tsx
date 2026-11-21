'use client';

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { SelectedOption } from "@/types/search";
import filterOptions from "@/lib/estat/filterOptions";

type ItemComboboxProps = {
    label: string;
    items: SelectedOption[];
    // 無い・選択肢に存在しないときは、従来の select と同じく先頭の品目を選ぶ
    defaultValue?: string;
};

// 品目名を入力して候補を絞り込み、選んだ品目のコードを hidden input の item で送るコンボボックス。
// WAI-ARIA の combobox パターン（リストは aria-activedescendant で指す）に沿う
export default function ItemCombobox({ label, items, defaultValue }: ItemComboboxProps) {
    const id = useId();
    const inputId = `${id}-input`;
    const listboxId = `${id}-listbox`;
    const optionId = (index: number) => `${id}-option-${index}`;

    const initialItem: SelectedOption | undefined =
        items.find((item) => item.value === defaultValue) ?? items[0];

    const [selected, setSelected] = useState<SelectedOption | undefined>(initialItem);
    const [inputText, setInputText] = useState<string>(initialItem?.label ?? "");
    // 絞り込みに使う文字。null は「まだ入力していない」で、リストを開いたときに全件を出す
    const [query, setQuery] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const listboxRef = useRef<HTMLUListElement>(null);

    const candidates: SelectedOption[] = filterOptions(items, query ?? "");

    const open = () => {
        setIsOpen(true);
        setActiveIndex(-1);
    };

    // リストを閉じ、入力欄を選択中の品目名に戻す
    const close = () => {
        setIsOpen(false);
        setActiveIndex(-1);
        setQuery(null);
        setInputText(selected?.label ?? "");
    };

    const choose = (item: SelectedOption) => {
        setSelected(item);
        setIsOpen(false);
        setActiveIndex(-1);
        setQuery(null);
        setInputText(item.label);
    };

    const moveActive = (nextIndex: number) => {
        setActiveIndex(nextIndex);
        listboxRef.current
            ?.querySelector(`[id="${optionId(nextIndex)}"]`)
            ?.scrollIntoView?.({ block: "nearest" });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "ArrowDown": {
                e.preventDefault();
                if (!isOpen) {
                    open();
                    return;
                }
                if (candidates.length === 0) return;
                moveActive(Math.min(activeIndex + 1, candidates.length - 1));
                return;
            }
            case "ArrowUp": {
                e.preventDefault();
                if (!isOpen || candidates.length === 0) return;
                moveActive(Math.max(activeIndex - 1, 0));
                return;
            }
            case "Enter": {
                // 候補を指しているときだけ選択に使い、フォームは送信しない。
                // それ以外の Enter は通常どおりフォームの送信に任せる
                const active = isOpen ? candidates[activeIndex] : undefined;
                if (!active) return;
                e.preventDefault();
                choose(active);
                return;
            }
            case "Escape": {
                if (!isOpen) return;
                e.preventDefault();
                close();
                return;
            }
        }
    };

    const activeDescendant: string | undefined =
        isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined;

    return (
        <div className="flex min-w-0 flex-col gap-1">
            <label htmlFor={inputId} className="text-sm font-bold">{label}</label>

            <div className="relative">
                <input
                    id={inputId}
                    type="text"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={isOpen}
                    aria-controls={listboxId}
                    aria-activedescendant={activeDescendant}
                    autoComplete="off"
                    value={inputText}
                    // 入力済みの品目名をすぐ打ち替えられるよう、フォーカス時に全選択する
                    onFocus={(e) => e.currentTarget.select()}
                    onChange={(e) => {
                        setInputText(e.target.value);
                        setQuery(e.target.value);
                        open();
                    }}
                    onBlur={close}
                    onKeyDown={handleKeyDown}
                    className="h-10 w-full min-w-0 rounded-md border border-fg-sub/70 bg-surface px-3 text-fg"
                />

                <input type="hidden" name="item" value={selected?.value ?? ""} />

                {isOpen && (
                    <ul
                        ref={listboxRef}
                        id={listboxId}
                        role="listbox"
                        aria-label={label}
                        className="absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-line bg-surface py-1 shadow-lg"
                    >
                        {candidates.length === 0 ? (
                            <li className="px-3 py-2 text-sm text-fg-sub">該当する品目がありません</li>
                        ) : (
                            candidates.map((item, index) => (
                                <li
                                    key={item.value}
                                    id={optionId(index)}
                                    role="option"
                                    aria-selected={index === activeIndex}
                                    // mousedown の既定動作（入力欄の blur）を止め、click で選べるようにする
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => choose(item)}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    // カーソルが当たっている候補は表ヘッダーと同じ色で示す。強調色（accent）は使わない
                                    className={`cursor-pointer px-3 py-2 ${index === activeIndex ? "bg-th" : ""} ${item.value === selected?.value ? "font-bold" : ""}`}
                                >
                                    {item.label}
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
