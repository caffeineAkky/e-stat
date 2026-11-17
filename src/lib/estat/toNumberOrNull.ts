export default function toNumberOrNull(value: string | undefined): number | null {
    if (value === undefined || value.trim() === "") return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
}
