"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const express_1 = require("express");
const middleware_1 = require("../middleware");
exports.FileUploadController = {
    get router() {
        const router = express_1.Router();
        router
            .post("/:assetType/:bankname/:name", this.uploadAsset)
            .post("/logos/:name", middleware_1.auth, this.uploadLogos);
        return router;
    },
    uploadAsset(req, res, next) {
        req.validateParams(validation_1.FileUploadRule.newAsset);
        const handler = req.container.resolve("S3Uploader");
        const path = `${req.params.bankname}/${req.params.assetType}`;
        const { SUCCESS, ERROR } = handler.outputs;
        const name = req.params.name;
        handler
            .on(SUCCESS, uploader => {
            try {
                const singleUpload = uploader.single("asset");
                singleUpload(req, res, (err) => {
                    if (err) {
                        return res
                            .status(422)
                            .json({ type: "ImageUploadError", details: err.message });
                    }
                    return res.json({ assetUrl: req.file.location });
                });
                return null;
            }
            catch (error) {
                return res
                    .status(422)
                    .json({ type: "ImageUploadError", details: error.message });
            }
        })
            .on(ERROR, next);
        handler.execute({ path, name });
    },
    uploadLogos(req, res, next) {
        req.validateParams(validation_1.FileUploadRule.logo);
        const handler = req.container.resolve("S3Uploader");
        const path = `logos`;
        const { SUCCESS, ERROR } = handler.outputs;
        const name = req.params.name;
        handler
            .on(SUCCESS, uploader => {
            const singleUpload = uploader.single("logo");
            singleUpload(req, res, (err) => {
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
//# sourceMappingURL=upload-controller.js.map