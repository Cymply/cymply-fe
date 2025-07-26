type UrlLinkBoxProps = {
  recipientUrl: string | null;
};

export const UrlLinkBox = ({ recipientUrl }: UrlLinkBoxProps) => {
  return (
    <div className="pt-12 pb-12 text-4xl select-all border-black-800 border-b">
      <p>{recipientUrl}1</p>
    </div>
  );
};
