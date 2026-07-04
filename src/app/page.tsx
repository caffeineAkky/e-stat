"use client";

import { Aladin } from "next/font/google";
import Image from "next/image";
import { useState } from "react";


export default function Home() {

  const [tableInfo, setTableInfo ] = useState<any[]>([]);

  const handleGetTableId = async () => {
  const res = await fetch("/api/StatsTableId");
  const tableInfoData = await res.json();
    console.log(tableInfo);
    setTableInfo(tableInfoData);
  };

  const handleGetMetaInfo = async () => {
  const res = await fetch("/api/metaInfo");
  const json = await res.json();
    console.log(json);
  };

  const handleGetStats = async () => {
  const res = await fetch("/api/stats");
  const json = await res.json();
    console.log(json);
  };

  return (
    <div>
      <button type="button" onClick={handleGetTableId}>
        統計表のIDを取得
      </button>
      <button type="button" onClick={handleGetMetaInfo}>
        メタ情報取得
      </button>
      <button type="button" onClick={handleGetStats}>
        統計情報取得
      </button>
    <ul>
      {tableInfo.map((table) => (
        <li key={table["@id"]}>
          {table["@id"]}: {table.TITLE.$}
        </li>
      ))}
    </ul>
    </div>
  );
}