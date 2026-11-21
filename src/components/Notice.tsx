import type { ReactNode } from "react"

type NoticeVariant = "error" | "info"

type NoticeProps = {
    variant: NoticeVariant
    title?: string
    children?: ReactNode
}

// 色だけでは見分けられない人もいるので、アイコンの形（！と i）でも種類が分かるようにする
const styles: Record<NoticeVariant, { box: string; icon: string; symbol: string }> = {
    error: {
        box: "border-red-600/40 bg-red-50 text-red-900 dark:border-red-400/40 dark:bg-red-950/40 dark:text-red-100",
        icon: "bg-red-600 text-white dark:bg-red-400 dark:text-red-950",
        symbol: "!",
    },
    info: {
        box: "border-sky-600/40 bg-sky-50 text-sky-900 dark:border-sky-400/40 dark:bg-sky-950/40 dark:text-sky-100",
        icon: "bg-sky-600 text-white dark:bg-sky-400 dark:text-sky-950",
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
