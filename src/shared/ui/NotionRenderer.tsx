"use client";

import { NotionRenderer } from "react-notion-x";

interface RendererProps {
  recordMap: any;
  rootPageId: string;
}

export const Renderer = ({ recordMap, rootPageId }: RendererProps) => {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      rootPageId={rootPageId}
      previewImages
    />
  );
};

export default Renderer;
