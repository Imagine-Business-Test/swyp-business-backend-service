import { ResponseInterface } from "../infra/response";
import { Response } from "../../domain";
import { LoggedInUser } from "../interfaces";

export interface ResponseRepository {
  makeAsprocessed: (id: string, processor: LoggedInUser) => void;
  getByForm: (form: string) => Promise<ResponseInterface[]>;
  updateContent: (id: string, content: string) => void;
  add: (response: Response) => Promise<Response>;
  addNote: ( id: string, note: string, notedBy: LoggedInUser) => void;
  find: (page: number, limit: number) => any;
  delete: (id: string) => void;
}
