interface UrlLinkBoxProps {
  recipientUrl: string | null;
}

export const UrlLinkBox = ({ recipientUrl }: UrlLinkBoxProps) => {
  return (
    <div className="pt-12 pb-12 text-2xl select-all border-black-800 border-b">
      {recipientUrl ? <p>{recipientUrl}</p> : <p></p>}
    </div>
  );
};
