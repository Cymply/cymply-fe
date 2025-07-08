"use client";

import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface SearchInputProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export const SearchInput = ({ onSearch, initialValue = "", placeholder }: SearchInputProps) => {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    setValue("");
    router.push(pathname);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="p-9 rounded-[0.625rem] border-none bg-gray-600 focus:outline-none"
        placeholder={placeholder}
      />
      <div className="absolute w-10 h-10 right-9 top-1/2 -translate-y-1/2">
        {value ? (
          <button onClick={handleClear} className="text-3xl" aria-label="초기화">
            X
          </button>
        ) : (
          <button onClick={handleSearch} aria-label="검색">
            <Image src="/icons/ico-search.svg" alt="icon-search" fill />
          </button>
        )}
      </div>
    </div>
  );
};
