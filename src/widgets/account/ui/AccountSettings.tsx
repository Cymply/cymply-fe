// pages/account-settings/ui/complete-account-settings-page.tsx
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Phone, Mail, Trash2, Shield } from 'lucide-react';
import {SettingCard} from "@/shared/ui";

// 현재 사용자 정보 (zustand store에서 가져온다고 가정)
const currentUser = {
  nickname: "JohnnyK",
  email: "john.kim@gmail.com",
  phone: "010-1234-5678",
  provider: "google"
};

export const AccountSettings: React.FC = () => {
  const router = useRouter();
  
  const handleNicknameChange = () => {
    // 닉네임 변경 모달 열기
    console.log('닉네임 변경');
  };
  
  const handlePasswordChange = () => {
    // 소셜 로그인 사용자는 비밀번호 변경 불가
    if (currentUser.provider !== 'local') {
      alert('소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.');
      return;
    }
    router.push('/account/change-password');
  };
  
  const handlePhoneChange = () => {
    console.log('전화번호 변경');
  };
  
  const handleEmailChange = () => {
    console.log('이메일 변경');
  };
  
  const handleTwoFactorAuth = () => {
    router.push('/account/two-factor-auth');
  };
  
  const handleAccountDeletion = () => {
    console.log('회원 탈퇴');
  };
  
  const isPasswordChangeDisabled = currentUser.provider !== 'local';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">계정 설정</h1>
          <p className="text-gray-600">개인정보 및 보안 설정을 관리하세요.</p>
        </div>
        
        {/* 기본 정보 섹션 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h2>
          <div className="space-y-4 flex flex-col gap-2">
            <SettingCard
              title="닉네임"
              description="다른 사용자에게 표시되는 닉네임을 변경할 수 있습니다."
              currentValue={currentUser.nickname}
              buttonText="변경"
              onButtonClick={handleNicknameChange}
              icon={<User className="w-5 h-5" />}
            />
            
            <SettingCard
              title="이메일 주소"
              description="로그인 및 중요한 알림을 받을 이메일 주소입니다."
              currentValue={currentUser.email}
              buttonText="변경"
              onButtonClick={handleEmailChange}
              icon={<Mail className="w-5 h-5" />}
            />
            
            <SettingCard
              title="전화번호"
              description="계정 보안 및 알림 수신을 위한 전화번호를 관리하세요."
              currentValue={currentUser.phone || "등록되지 않음"}
              buttonText="변경"
              onButtonClick={handlePhoneChange}
              icon={<Phone className="w-5 h-5" />}
            />
          </div>
        </div>
        
        {/* 보안 설정 섹션 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">보안 설정</h2>
          <div className="space-y-4">
            <SettingCard
              title="비밀번호"
              description={
                isPasswordChangeDisabled
                  ? `${currentUser.provider.toUpperCase()} 소셜 로그인을 사용하고 있어 비밀번호 변경이 불가능합니다.`
                  : "회원님의 소중한 개인정보 보호를 위해 비밀번호를 주기적으로 변경해 주세요."
              }
              buttonText="변경"
              onButtonClick={handlePasswordChange}
              disabled={isPasswordChangeDisabled}
              icon={<Lock className="w-5 h-5" />}
            />
            
            <SettingCard
              title="2단계 인증"
              description="계정 보안을 강화하기 위해 2단계 인증을 설정하세요."
              currentValue="비활성화"
              buttonText="설정"
              onButtonClick={handleTwoFactorAuth}
              variant="warning"
              icon={<Shield className="w-5 h-5" />}
            />
          </div>
        </div>
        
        {/* 위험 영역 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-700 mb-4">위험 영역</h2>
          <SettingCard
            title="회원 탈퇴"
            description="계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다. 신중하게 결정해 주세요."
            buttonText="탈퇴하기"
            onButtonClick={handleAccountDeletion}
            variant="danger"
            icon={<Trash2 className="w-5 h-5" />}
          />
        </div>
        
        {/* 추가 정보 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-blue-500 mt-0.5">
              ℹ️
            </div>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">개인정보 처리방침</p>
              <p>회원님의 개인정보는 관련 법령에 따라 안전하게 처리됩니다. 자세한 내용은 개인정보 처리방침을 확인해 주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};