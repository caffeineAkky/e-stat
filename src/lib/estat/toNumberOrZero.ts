export default function toNumberOrZero(value: string | undefined): number {
        const number = Number(value);
        return Number.isFinite(number) ? number : 0;
    }
