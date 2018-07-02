import { ResponseInterface } from "../infra/response";
import { Response } from "../../domain";
import { LoggedInUser } from "../interfaces";

export interface ResponseRepository {
  makeAsprocessed: (id: string, processor: LoggedInUser) => void;
  getByForm: (form: string) => Promise<ResponseInterface[]>;
  updateContent: (id: string, content: string) => void;
  add: (response: Response) => Promise<Response>;
  addNote: ( id: string, note: string, notedBy: LoggedInUser) => void;
  findBStatus: (status: string, page: number, limit: number) => any;
  getProcessingActivityStats: () => any;
  getNotingActivityStats: () => any;
  delete: (id: string) => void;
}
