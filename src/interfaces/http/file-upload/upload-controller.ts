import { FileUploader } from "../../../app/S3";
import { FileUploadRule } from "../validation";
import { Response, Router } from "express";
import { auth } from "../middleware";

export const FileUploadController = {
  get router() {
    const router = Router();
    router
      .post("/passport/:bankname/:name", this.uploadPassport)
      .post("/signature/:bankname/:name", this.uploadSignature)
      .post("/logos/:name", auth, this.uploadLogos);
    return router;
  },

  uploadPassport(req: any, res: Response, next: any) {
    req.validateParams(FileUploadRule.passportSignature);
    const handler = req.container.resolve("S3Uploader") as FileUploader;
    const path = `${req.params.bankname}/passport`;
    const { SUCCESS, ERROR } = handler.outputs;
    const name = req.params.name;

    handler
      .on(SUCCESS, uploader => {
        const singleUpload = uploader.single("passport");
        singleUpload(req, res, (err: Error) => {
          if (err) {
            return res
              .status(422)
              .json({ type: "ImageUploadError", details: err.message });
          }
          return res.json({ imageUrl: req.file.location });
        });
      })
      .on(ERROR, next);

    handler.execute({ path, name });
  },

  uploadSignature(req: any, res: Response, next: any) {
    req.validateParams(FileUploadRule.passportSignature);
    const handler = req.container.resolve("S3Uploader") as FileUploader;
    const path = `${req.params.bankname}/signature`;
    const { SUCCESS, ERROR } = handler.outputs;
    const name = req.params.name;

    handler
      .on(SUCCESS, uploader => {
        const singleUpload = uploader.single("signature");
        singleUpload(req, res, (err: Error) => {
          if (err) {
            return res
              .status(422)
              .json({ type: "ImageUploadError", details: err.message });
          }
          return res.json({ imageUrl: req.file.location });
        });
      })
      .on(ERROR, next);

    handler.execute({ path, name });
  },

  uploadLogos(req: any, res: Response, next: any) {
    req.validateParams(FileUploadRule.logo);
    const handler = req.container.resolve("S3Uploader") as FileUploader;
    const path = `/logos`;
    const { SUCCESS, ERROR } = handler.outputs;
    const name = req.params.name;

    handler
      .on(SUCCESS, uploader => {
        const singleUpload = uploader.single("logo");
        singleUpload(req, res, (err: Error) => {
          if (err) {
            return res
              .status(422)
              .json({ type: "ImageUploadError", details: err.message });
          }
          return res.json({ imageUrl: req.file.location });
        });
      })
      .on(ERROR, next);

    handler.execute({ path, name });
  }
};
