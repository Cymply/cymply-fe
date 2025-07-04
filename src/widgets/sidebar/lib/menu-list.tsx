type Menu = {
  href: string;
  label: string;
  subMenu?: SubMenu[];
};

type SubMenu = {
  href: string;
  label: string;
  active?: boolean;
};

export function getMenuList(): Menu[] {
  return [
    {
      href: "",
      label: "account",
      subMenu: [
        {
          href: "/account/login",
          label: "계정 로그인",
        },
        {
          href: "/account/info",
          label: "계정 프로필",
        },
      ],
    },
    {
      href: "",
      label: "user",
      subMenu: [
        {
          href: "/admin/user/user-info",
          label: "사용자 정보",
        },
      ],
    },
    {
      href: "",
      label: "signup",
      subMenu: [
        {
          href: "/signup",
          label: "회원가입",
        },
      ],
    },
  ];
}
