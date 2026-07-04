"use client";

import { useRouter } from "next/navigation";

export default function tableInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const handleBack = async () => {
        router.push("/");
    };

  return (
    <div>
        <button type="button" onClick={handleBack}>
            戻る
        </button>
    </div>
  );
}