import { Form } from "../../domain";
import { FormInterface } from "../infra";
import { ILoggedInUser } from "../interfaces";

export interface IFormRepository {
  updateContent: (id: string, content: string, modifier: ILoggedInUser) => void;
  fetchByWorkspace: (
    workspace: string,
    businessId: string
  ) => Promise<FormInterface[]>;
  disable: (id: string, modifier: ILoggedInUser) => void;
  delete: (id: string, user: ILoggedInUser) => void;
  find: (id: string) => Promise<Form>;
  fetchContentOf: (
    options: {
      formSlug: string;
      formType: string;
      formTypeParent: string;
      businessSlug: string;
    }
  ) => Promise<Form>;
  fetchByBusiness: (
    business: string,
    formType: string
  ) => Promise<FormInterface[]>;
  add: (form: Form) => Promise<Form>;
}
