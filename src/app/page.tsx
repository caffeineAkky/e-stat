"use client";

import { Aladin } from "next/font/google";
import Image from "next/image";

export default function Home() {
 const BASE_URL = "https://api.e-stat.go.jp/rest/3.0/app/json";

  const handleCallApi = async () => {
    const response = await fetch("/api/stats");
    alert(response);

    // http://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?appId=&lang=J&statsDataId=0003425295&metaGetFlg=Y&cntGetFlg=N&explanationGetFlg=Y&annotationGetFlg=Y&sectionHeaderFlg=1&replaceSpChars=0
  };

  return (
    <div>
      <button type="button" onClick={handleCallApi}>
        処理実行
      </button>
    </div>
  );
}