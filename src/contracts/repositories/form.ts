import { Form } from "../../domain";
import { LoggedInUser } from "../interfaces";
import { FormInterface } from "../infra";

export interface FormRepository {
  getByWorkstation: (workstation: string) => Promise<FormInterface[]>;
  updateContent: (id: string, content: string) => void;
  disable: (id: string, modifier: LoggedInUser) => void;
  delete: (id: string, user: LoggedInUser) => void;
  add: (form: Form) => Promise<Form>;
}
