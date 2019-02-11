import { IConfig } from "../../contracts/config";
import { Operation } from "../operation";
import multerS3 from "multer-s3";
import multer from "multer";
import AWS from "aws-sdk";

export class FileUploader extends Operation {
  private S3: AWS.S3;

  constructor(config: IConfig) {
    super();
    AWS.config.update({
      region: "eu-central-1",
      accessKeyId: config.AWS.accessKeyId,
      secretAccessKey: config.AWS.secretAccessKey
    });
    this.S3 = new AWS.S3();
  }
  public async execute(command: { path: string; name: string }) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const upload = multer({
        storage: multerS3({
          s3: this.S3,
          bucket: "swyp-assets",
          acl: "public-read",
          metadata: (_, file, cb) => {
            cb(null, { fieldName: file.fieldname });
          },
          contentType: (_, file, cb) => {
            cb(null, file.mimetype);
          },
          key: (_, file, cb) => {
            const ex = file.originalname.split(".")[1];
            cb(
              null,
              `${command.path}/${Date.now().toString()}_${command.name}.${ex}`
            );
          }
        })
      });
      return this.emit(SUCCESS, upload);
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

FileUploader.setOutputs(["SUCCESS", "ERROR"]);
