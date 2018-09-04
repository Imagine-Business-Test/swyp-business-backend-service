import { IResponseRepository } from "../../contracts/repositories";
import { IAuthenticatedUser } from "../../contracts/interfaces";
import { Operation } from "../operation";

export class GetResponseByStatus extends Operation {
  private responseRepository: IResponseRepository;

  constructor(responseRepository: IResponseRepository) {
    super();
    this.responseRepository = responseRepository;
  }

  public async execute(command: {
    user: IAuthenticatedUser;
    business: string;
    status: string;
    limit: number;
    page: number;
    from?: Date;
    to?: Date;
  }) {
    const { SUCCESS, ERROR } = this.outputs;
    const { business, user, status, page, limit, from, to } = command;
    const branch = user.branch;
    try {
      const result = await this.responseRepository.findByStatus(
        business,
        branch,
        status,
        page,
        limit,
        from,
        to
      );
      this.emit(SUCCESS, result);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetResponseByStatus.setOutputs(["SUCCESS", "ERROR"]);
