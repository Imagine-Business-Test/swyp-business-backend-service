import { Form } from "../../domain";
import { FormInterface } from "../infra";
import { ILoggedInUser } from "../interfaces";

export interface IFormRepository {
  updateContent: (id: string, content: string, modifier: ILoggedInUser) => void;
  fetchByWorkspace: (workspace: string) => Promise<FormInterface[]>;
  fetchByBusiness: (business: string) => Promise<FormInterface[]>;
  disable: (id: string, modifier: ILoggedInUser) => void;
  delete: (id: string, user: ILoggedInUser) => void;
  findBySlug: (id: string) => Promise<Form>;
  add: (form: Form) => Promise<Form>;
}
