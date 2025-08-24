import { Suspense } from "react";
import { getData } from "@/shared/lib/notion";
import { LoadingSpinner, Renderer } from "@/shared/ui";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

async function FaqPageContent() {
  const pageId = "2458d05bbad3808084d1ffcc09dbdb5f";
  const data = await getData(pageId);

  return (
    <div className="flex-1">
      <Renderer recordMap={data} rootPageId={pageId} />
    </div>
  );
}

export default function FaqPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FaqPageContent />
    </Suspense>
  );
}
