import { Form } from "../../domain";
import { FormInterface } from "../infra";
import { ILoggedInUser } from "../interfaces";

export interface IFormRepository {
  updateContent: (id: string, content: string, modifier: ILoggedInUser) => void;
  getByWorkspace: (workspace: string) => Promise<FormInterface[]>;
  getByBusiness: (business: string) => Promise<FormInterface[]>;
  getBySlug: (business: string) => Promise<FormInterface[]>;
  disable: (id: string, modifier: ILoggedInUser) => void;
  delete: (id: string, user: ILoggedInUser) => void;
  find: (id: string) => Promise<Form>;
  add: (form: Form) => Promise<Form>;
}
