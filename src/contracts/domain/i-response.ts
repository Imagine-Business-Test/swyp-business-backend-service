import { IProcessor } from "../infra";

export interface IForm {
  id: string;
  name: string;
  business: string;
}

export interface IProcessors {
  manager: IProcessor;
  worker: IProcessor;
}

export interface IResponseContent {
  questionType: string;
  questionId: string;
  question: string;
  answer: string;
}

export interface INote {
  note: string;
  date: Date;
  notedBy: { email: string; name: string };
}
