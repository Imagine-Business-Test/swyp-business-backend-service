import { Form } from "../../domain";
import { LoggedInUser } from "../interfaces";
import { FormInterface } from "../infra";

export interface FormRepository {
  updateContent: (id: string, content: string, modifier: LoggedInUser) => void;
  getByWorkspace: (workspace: string) => Promise<FormInterface[]>;
  getByBusiness: (business: string) => Promise<FormInterface[]>;
  disable: (id: string, modifier: LoggedInUser) => void;
  delete: (id: string, user: LoggedInUser) => void;
  find: ( id: string) => Promise<Form>;
  add: (form: Form) => Promise<Form>;
}
