export type PostInput = {
  authorId: string;
  content: string;
  title: string;
};

export type UserInput = {
  name: string;
  balance: number;
};

export type ProfileInput = {
  userId: string;
  memberTypeId: string;
  isMale: boolean;
  yearOfBirth: number;
};
