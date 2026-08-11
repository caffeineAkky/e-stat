import "server-only";

export function getEstatAppId(): string {
    const APP_ID = process.env.ESTAT_APP_ID;

    if (!APP_ID) {
        throw new Error(
            "ESTAT_APP_IDが設定されていません。",
        );
    }

    return APP_ID;
}