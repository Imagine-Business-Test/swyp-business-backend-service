import { FileUploader } from "../../../app/S3";
import { FileUploadRule } from "../validation";
import { Response, Router } from "express";
import { auth } from "../middleware";

export const FileUploadController = {
  get router() {
    const router = Router();
    router
      .post("/:assetType/:bankname/:name", this.uploadAsset)
      .post("/logos/:name", auth, this.uploadLogos);
    return router;
  },

  uploadAsset(req: any, res: Response, next: any) {
    req.validateParams(FileUploadRule.newAsset);
    const handler = req.container.resolve("S3Uploader") as FileUploader;
    const path = `${req.params.bankname}/${req.params.assetType}`;
    const { SUCCESS, ERROR } = handler.outputs;
    const name = req.params.name;
    handler
      .on(SUCCESS, uploader => {
        try {
          const singleUpload = uploader.single("asset");
          singleUpload(req, res, (err: Error) => {
            if (err) {
              return res
                .status(422)
                .json({ type: "ImageUploadError", details: err.message });
            }
            return res.json({ assetUrl: req.file.location });
          });
          return null;
        } catch (error) {
          return res
            .status(422)
            .json({ type: "ImageUploadError", details: error.message });
        }
      })
      .on(ERROR, next);

    handler.execute({ path, name });
  },

  uploadLogos(req: any, res: Response, next: any) {
    req.validateParams(FileUploadRule.logo);
    const handler = req.container.resolve("S3Uploader") as FileUploader;
    const path = `logos`;
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
