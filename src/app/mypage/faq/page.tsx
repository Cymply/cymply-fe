export default function FaqPage() {
  const notionUrl =
    "https://smart-bergamot-e66.notion.site/2458d05bbad3808084d1ffcc09dbdb5f?source=copy_link";

  return (
    <div className="flex-1">
      <iframe
        src={notionUrl}
        className="w-full h-full border-0"
        title="자주 묻는 질문"
        allowFullScreen
      />
    </div>
  );
}
