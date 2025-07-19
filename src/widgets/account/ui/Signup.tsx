'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Loader2, User, Calendar, Users } from 'lucide-react';
import useSignup from "@/widgets/account/model/useSignup";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radioGroup";

export default function Signup() {
  const {
    formData, setFormData,
    error, setError,
    loading, setLoading,
    yearOptions,
    monthOptions,
    dayOptions,
    handleSubmit,
    handleInputChange,
  } = useSignup();
  return (
    <div className="min-h-screen flex items-center justify-center from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">프로필 설정</CardTitle>
          <CardDescription>
            추가 정보를 입력해 회원가입을 완료해주세요
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 닉네임 */}
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                닉네임 *
              </Label>
              <Input
                id="nickname"
                type="text"
                value={formData.nickname}
                onChange={(e) => handleInputChange('nickname', e.target.value)}
                placeholder="사용할 닉네임을 입력해주세요"
                maxLength={10}
                required
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">2-10자 사이로 입력해주세요</p>
            </div>
            
            {/* 성별 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                성별 *
              </Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="M" id="male" />
                  <Label htmlFor="M">남성</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="F" id="female" />
                  <Label htmlFor="F">여성</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">기타</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* 생년월일 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                생년월일 *
              </Label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Select
                    value={formData.birthYear}
                    onValueChange={(value) => handleInputChange('birthYear', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="년도" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}년
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <Select
                    value={formData.birthMonth}
                    onValueChange={(value) => handleInputChange('birthMonth', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="월" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthOptions.map(month => (
                        <SelectItem key={month.value} value={month.value.toString()}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <Select
                    value={formData.birthDay}
                    onValueChange={(value) => handleInputChange('birthDay', value)}
                    disabled={!formData.birthYear || !formData.birthMonth}
                  >
                    <SelectTrigger className={`w-full ${!formData.birthYear || !formData.birthMonth ? 'opacity-50' : ''}`}>
                      <SelectValue placeholder="일" />
                    </SelectTrigger>
                    <SelectContent>
                      {dayOptions.map(day => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}일
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {formData.birthYear && formData.birthMonth && formData.birthDay && (
                <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    선택된 날짜: {moment(`${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`, 'YYYY-M-D').format('YYYY년 M월 D일')}
                  </p>
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  처리 중...
                </>
              ) : (
                '회원가입 완료'
              )}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              회원가입을 진행하면 서비스 이용약관 및 개인정보처리방침에 동의한 것으로 간주됩니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}