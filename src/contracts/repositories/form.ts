import { Form } from "../../domain";
import { LoggedInUser } from "../interfaces";
import { FormInterface } from "../infra";

export interface FormRepository {
  getByWorkspace: (workspace: string) => Promise<FormInterface[]>;
  updateContent: (id: string, content: string, modifier: LoggedInUser) => void;
  disable: (id: string, modifier: LoggedInUser) => void;
  delete: (id: string, user: LoggedInUser) => void;
  find: ( id: string) => Promise<Form>;
  add: (form: Form) => Promise<Form>;
}
