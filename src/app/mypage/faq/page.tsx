"use client";
import { Suspense, useEffect, useState } from "react";
import { ExtendedRecordMap } from "notion-types";
import { getData } from "@/shared/lib/notion";
import { LoadingSpinner, Renderer } from "@/shared/ui";
import { useSetAtom } from "jotai";
import { alertAtom } from "@/widgets/alert";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

function FaqPageContent() {
  const [data, setData] = useState<ExtendedRecordMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const setAlert = useSetAtom(alertAtom);

  const pageId = "2458d05bbad3808084d1ffcc09dbdb5f";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const notionData = await getData(pageId);
        setData(notionData);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) {
    setAlert({
      open: true,
      title: (
        <>
          서버와의 연결에 <br />
          문제가 생겼어요.
        </>
      ),
      message: "인터넷 상태를 확인하거나,\n 잠시 후 다시 시도해 주세요.",
      buttons: [
        {
          label: "홈으로 돌아가기",
          action: () => {},
        },
      ],
    });
    return null;
  }

  return <Renderer recordMap={data} rootPageId={pageId} />;
}

export default function FaqPage() {
  return (
    <div className="flex-1">
      <Suspense fallback={<LoadingSpinner />}>
        <FaqPageContent />
      </Suspense>
    </div>
  );
}
