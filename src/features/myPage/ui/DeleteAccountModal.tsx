// features/myPage/ui/DeleteAccountModal.tsx
"use client";

interface DeleteAccountModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export function DeleteAccountModal({ onConfirm, onCancel, isDeleting }: DeleteAccountModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[678px] h-[540px] relative rounded-[10px] overflow-hidden">
        <div className="w-[686px] h-[587px] left-[-4px] top-0 absolute bg-white rounded-[10px]" />
        
        {/* 제목 */}
        <div className="left-[44px] top-[60px] absolute justify-start text-zinc-800 text-5xl font-bold font-['Pretendard'] leading-[60px]">
          회원 탈퇴를 하시겠습니까?
        </div>
        
        {/* 설명 텍스트 */}
        <div className="w-[590px] left-[44px] top-[144px] absolute justify-start text-neutral-500 text-4xl font-medium font-['Pretendard'] leading-[48px]">
          회원 탈퇴를 진행하시면, 등록된 계정,<br/>
          편지 등 관련 정보가 모두 삭제되며<br/>
          그 어떠한 경우에도 복구가 불가합니다.
        </div>
        
        {/* 확인 버튼 */}
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="w-72 h-28 left-[44px] top-[348px] absolute bg-neutral-400 rounded-[10px] hover:bg-neutral-500 transition-colors disabled:opacity-50"
        >
          <span className="text-center text-white text-3xl font-semibold font-['Pretendard'] leading-9">
            {isDeleting ? "처리중..." : "확인"}
          </span>
        </button>
        
        {/* 취소 버튼 */}
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="w-72 h-28 left-[348px] top-[348px] absolute bg-amber-400 rounded-[10px] hover:bg-amber-500 transition-colors disabled:opacity-50"
        >
          <span className="text-center text-white text-3xl font-semibold font-['Pretendard'] leading-9">
            취소
          </span>
        </button>
      </div>
    </div>
  );
}