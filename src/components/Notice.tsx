import type { ReactNode } from "react"

type NoticeVariant = "error" | "info"

type NoticeProps = {
    variant: NoticeVariant
    title?: string
    children?: ReactNode
}

// 色だけでは見分けられない人もいるので、アイコンの形（！と i）でも種類が分かるようにする
const styles: Record<NoticeVariant, { box: string; icon: string; symbol: string }> = {
    // ライト・ダークの切り替えは globals.css のトークン側で行う
    error: {
        box: "border-danger/40 bg-danger-soft text-on-danger-soft",
        icon: "bg-danger text-on-danger",
        symbol: "!",
    },
    // 0件などのお知らせは強調せず、表や入力欄と同じ面の色にする
    info: {
        box: "border-line bg-surface text-fg",
        icon: "bg-fg-sub text-surface",
        symbol: "i",
    },
}

export default function Notice({
    variant,
    title,
    children,
}: NoticeProps) {
    const style = styles[variant];

    return (
        // エラーはすぐ読み上げさせ、0件などのお知らせは読み上げ中の内容を遮らずに伝える。
        // 上の余白は結果の表（SearchResult）と揃えて、フォームとの間隔を同じにする
        <div
            role={variant === "error" ? "alert" : "status"}
            className={`mt-8 flex items-start gap-3 rounded-md border px-4 py-3 ${style.box}`}
        >
            <span
                aria-hidden="true"
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-xs font-bold ${style.icon}`}
            >
                {style.symbol}
            </span>
            <div className="flex min-w-0 flex-col gap-1 break-words">
                {title && <p className="font-bold">{title}</p>}
                {children}
            </div>
        </div>
    )
}
