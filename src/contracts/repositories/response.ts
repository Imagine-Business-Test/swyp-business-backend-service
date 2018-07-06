import { Response } from "../../domain";
import { ResponseInterface } from "../infra/response";
import { ILoggedInUser } from "../interfaces";

export interface IResponseRepository {
  makeAsprocessed: (id: string, processor: ILoggedInUser) => void;
  getByForm: (form: string) => Promise<ResponseInterface[]>;
  updateContent: (id: string, content: string) => void;
  add: (response: Response) => Promise<Response>;
  addNote: (id: string, note: string, notedBy: ILoggedInUser) => void;
  findBStatus: (status: string, page: number, limit: number) => any;
  getProcessingActivityStats: () => any;
  getNotingActivityStats: () => any;
  delete: (id: string) => void;
}
