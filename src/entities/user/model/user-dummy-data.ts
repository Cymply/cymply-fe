import moment from 'moment';

export interface User {
  id: string;
  email: string;
  name: string;
  gender?: string;
  birthday?: string;
  birthyear?: number;
  nickname: string;
  thumbnail: string;
  provider: string;
  sub: string;
  created_at: moment.Moment;
  updated_at: moment.Moment;
  deleted_at: moment.Moment | null;
}

export const userDummyData : User[] = [
  {
    id: "1001",
    email: "john.kim@gmail.com",
    name: "John Kim",
    gender: "M",
    birthday: "1992-03-15",
    birthyear: 1992,
    nickname: "JohnnyK",
    thumbnail: "https://randomuser.me/api/portraits/men/1.jpg",
    provider: "google",
    sub: "google_1234567890",
    created_at: moment("2024-01-15"),
    updated_at: moment("2025-05-30"),
    deleted_at: null
  },
  {
    id: "1002",
    email: "sarah.lee@outlook.com",
    name: "Sarah Lee",
    gender: "F",
    birthday: "1995-07-22",
    birthyear: 1995,
    nickname: "SarahL",
    thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
    provider: "kakao",
    sub: "kakao_9876543210",
    created_at: moment("2024-03-10"),
    updated_at: moment("2025-05-29"),
    deleted_at: null
  },
  {
    id: "1003",
    email: "michael.park@yahoo.com",
    name: "Michael Park",
    gender: "M",
    birthday: "1988-11-08",
    birthyear: 1988,
    nickname: "MikeP",
    thumbnail: "https://randomuser.me/api/portraits/men/3.jpg",
    provider: "naver",
    sub: "naver_1122334455",
    created_at: moment("2023-12-20"),
    updated_at: moment("2025-05-28"),
    deleted_at: null
  },
  {
    id: "1004",
    email: "emily.choi@gmail.com",
    name: "Emily Choi",
    gender: "F",
    birthday: "1990-05-14",
    birthyear: 1990,
    nickname: "EmilyC",
    thumbnail: "https://randomuser.me/api/portraits/women/4.jpg",
    provider: "google",
    sub: "google_5566778899",
    created_at: moment("2024-02-28"),
    updated_at: moment("2025-05-27"),
    deleted_at: null
  },
  {
    id: "1005",
    email: "david.jang@hotmail.com",
    name: "David Jang",
    gender: "M",
    birthday: "1993-09-03",
    birthyear: 1993,
    nickname: "DaveJ",
    thumbnail: "https://randomuser.me/api/portraits/men/5.jpg",
    provider: "kakao",
    sub: "kakao_2233445566",
    created_at: moment("2024-04-12"),
    updated_at: moment("2025-05-26"),
    deleted_at: null
  },
  {
    id: "1006",
    email: "jessica.yoo@gmail.com",
    name: "Jessica Yoo",
    gender: "F",
    birthday: "1997-12-25",
    birthyear: 1997,
    nickname: "JessY",
    thumbnail: "https://randomuser.me/api/portraits/women/6.jpg",
    provider: "naver",
    sub: "naver_7788990011",
    created_at: moment("2024-01-08"),
    updated_at: moment("2025-05-25"),
    deleted_at: null
  },
  {
    id: "1007",
    email: "daniel.hong@yahoo.com",
    name: "Daniel Hong",
    gender: "M",
    birthday: "1985-04-01",
    birthyear: 1985,
    nickname: "DanH",
    thumbnail: "https://randomuser.me/api/portraits/men/7.jpg",
    provider: "google",
    sub: "google_3344556677",
    created_at: moment("2023-11-15"),
    updated_at: moment("2025-05-24"),
    deleted_at: null
  },
  {
    id: "1008",
    email: "grace.kang@outlook.com",
    name: "Grace Kang",
    gender: "F",
    birthday: "1991-08-17",
    birthyear: 1991,
    nickname: "GraceK",
    thumbnail: "https://randomuser.me/api/portraits/women/8.jpg",
    provider: "kakao",
    sub: "kakao_4455667788",
    created_at: moment("2024-05-20"),
    updated_at: moment("2025-05-23"),
    deleted_at: null
  },
  {
    id: "1009",
    email: "andrew.shin@gmail.com",
    name: "Andrew Shin",
    gender: "M",
    birthday: "1994-02-11",
    birthyear: 1994,
    nickname: "AndyS",
    thumbnail: "https://randomuser.me/api/portraits/men/9.jpg",
    provider: "naver",
    sub: "naver_5566778800",
    created_at: moment("2024-03-05"),
    updated_at: moment("2025-05-22"),
    deleted_at: null
  },
  {
    id: "1010",
    email: "sophia.oh@hotmail.com",
    name: "Sophia Oh",
    gender: "F",
    birthday: "1996-10-30",
    birthyear: 1996,
    nickname: "SophieO",
    thumbnail: "https://randomuser.me/api/portraits/women/10.jpg",
    provider: "google",
    sub: "google_6677889911",
    created_at: moment("2023-09-18"),
    updated_at: moment("2025-05-21"),
    deleted_at: null
  }
];