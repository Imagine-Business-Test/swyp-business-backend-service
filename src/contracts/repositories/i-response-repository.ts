import { ResponseInterface, IProcessor } from "../infra/response";
import { ILoggedInUser } from "../interfaces";
import { Response } from "../../domain";

export interface IResponseRepository {
  addNote: (id: string, note: string, notedBy: ILoggedInUser) => void;
  updateProcessors: (id: string, processor: IProcessor) => void;
  getByForm: (form: string) => Promise<ResponseInterface[]>;
  add: (response: Response) => Promise<Response>;
  getProcessingActivityStats: () => any;
  getNotingActivityStats: () => any;
  delete: (id: string) => void;
  findByStatus: (
    business: string,
    branch: string,
    status: string,
    page: number,
    limit: number,
    from?: Date,
    to?: Date
  ) => any;
}
