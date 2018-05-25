import { ResponseInterface } from "../infra/response";
import { Response } from "../../domain";

export interface ResponseRepository {
  add: (response: Response) => Promise<Response>;
  getByForm: (form: string) => Promise<ResponseInterface[]>;
  updateContent: (id: string, content: string) => void;
  makeAsprocessed: (id: string) => void;
  delete: (id: string) => void;
}
