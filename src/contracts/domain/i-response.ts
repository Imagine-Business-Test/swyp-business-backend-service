export interface IForm {
  id: string;
  name: string;
  business: string;
}

export interface IResponseContent {
  questionType: string;
  position: number;
  question: string;
  answer: string;
}

export interface INote {
  note: string;
  date: Date;
  notedBy: { email: string; name: string };
}
