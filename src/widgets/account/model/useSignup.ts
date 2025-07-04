import {useState} from "react";
import {useRouter} from "next/navigation";
import moment from "moment/moment";

export default function useSignup() {
  const [formData, setFormData] = useState({
    nickname: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  
  // moment를 사용한 년도 옵션 생성
  const currentYear = moment().year();
  const yearOptions = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, i) => currentYear - i
  );
  
  // 월 옵션 생성
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: moment().month(i).format('M월')
  }));
  
  // moment를 사용한 일 옵션 생성
  const getDaysInMonth = (year: string, month: string) => {
    if (!year || !month) return [];
    return moment(`${year}-${month}`, 'YYYY-M').daysInMonth();
  };
  
  const dayOptions = formData.birthYear && formData.birthMonth
    ? Array.from(
      { length: getDaysInMonth(formData.birthYear, formData.birthMonth) },
      (_, i) => i + 1
    )
    : [];
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 년도나 월이 변경되면 일자 초기화
    if (field === 'birthYear' || field === 'birthMonth') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        birthDay: ''
      }));
    }
  };
  
  const validateForm = () => {
    if (!formData.nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return false;
    }
    
    if (formData.nickname.length < 2 || formData.nickname.length > 10) {
      setError('닉네임은 2-10자 사이로 입력해주세요.');
      return false;
    }
    
    if (!formData.gender) {
      setError('성별을 선택해주세요.');
      return false;
    }
    
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      setError('생년월일을 모두 선택해주세요.');
      return false;
    }
    
    // moment를 사용한 날짜 유효성 검사
    const birthDate = moment(`${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`, 'YYYY-M-D');
    if (!birthDate.isValid()) {
      setError('올바른 생년월일을 입력해주세요.');
      return false;
    }
    
    if (birthDate.isAfter(moment())) {
      setError('생년월일은 미래 날짜일 수 없습니다.');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // moment를 사용한 날짜 포맷팅
      const birthDate = moment(`${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`, 'YYYY-M-D').format('YYYY-MM-DD');
      
      const response = await fetch('/api/auth/complete-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: formData.nickname,
          gender: formData.gender,
          birthDate: birthDate
        }),
      });
      
      if (response.ok) {
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  return {
    formData, setFormData,
    error, setError,
    loading, setLoading,
    yearOptions,
    monthOptions,
    dayOptions,
    handleSubmit,
    handleInputChange,
  }
}