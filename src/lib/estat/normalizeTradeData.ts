import type { SingleData, FetchedTradeData, EstatClassObject } from "@/types/estat";
import { quantityUnitLabels } from "./constants";

export default function normalizeTradeData(fetchedDataValues: SingleData[], statistiacalData: EstatClassObject[] ):FetchedTradeData  {
    // 取得データ存在チェック
    const firstValue = fetchedDataValues[0];

    if (!firstValue) {
        throw new Error("取得データが存在しません");
    }

    // 品目取得処理
    const itemCategory = statistiacalData.find(
        (item) => item["@id"] === "cat01"
    );

    if (!itemCategory) {
        throw new Error("品目の分類情報がありません");
    }

    const items = Array.isArray(itemCategory.CLASS)
    ? itemCategory.CLASS
    : [itemCategory.CLASS];

    const itemInfo = items.find(
    (item) => item["@code"] === firstValue["@cat01"]
    )

    if(!itemInfo) {
        throw new Error("品目コードに対応する名称がありません");
    }

    const itemCode = itemInfo["@code"];

    const itemName = itemInfo["@name"];

    // 国名取得処理
    const countryCategory = statistiacalData.find(
        (item) => item["@id"] === "area"
    );

    if (!countryCategory) {
        throw new Error("国の分類情報がありません");
    };

    const countries = Array.isArray(countryCategory.CLASS)
    ? countryCategory.CLASS
    : [countryCategory.CLASS];

    const countryInfo = countries.find(
    (item) => item["@code"] === firstValue["@area"]
    )

    if(!countryInfo) {
        throw new Error("国コードに対応する名称がありません");
    }

    const countryCode = countryInfo["@code"];

    const countryName = countryInfo["@name"];

    // 年取得処理
    const year = Number(fetchedDataValues[0]["@time"].slice(0,4));

    // 単位取得処理
    const quantityCode = fetchedDataValues.find(
        (item) => item["@cat02"] === "100"
    )?.["$"];

    const normalizedQuantityLabel = quantityCode?.normalize("NFKC").trim();

    const quantityLabel = normalizedQuantityLabel
    ? quantityUnitLabels[normalizedQuantityLabel] ?? normalizedQuantityLabel
    : undefined;

    const amountLabel = fetchedDataValues.find(
        (item) => item["@cat02"] === "120"
    )?.["@unit"];

    return {
        item: {
            code: itemCode,
            name: itemName,
        },
        country: {
            code: countryCode,
            name: countryName,
        },
        year: year,
        units: {
            quantity: {
                code: quantityCode,
                label: quantityLabel,
            },
            amount: amountLabel,
        },
        values: fetchedDataValues,
    }
}
