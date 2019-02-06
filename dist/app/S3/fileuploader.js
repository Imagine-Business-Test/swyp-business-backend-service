"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const multer_s3_1 = __importDefault(require("multer-s3"));
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class FileUploader extends operation_1.Operation {
    constructor(config) {
        super();
        aws_sdk_1.default.config.update({
            accessKeyId: config.AWS.accessKeyId,
            secretAccessKey: config.AWS.secretAccessKey
        });
        this.S3 = new aws_sdk_1.default.S3();
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR } = this.outputs;
            try {
                const upload = multer_1.default({
                    storage: multer_s3_1.default({
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
                            cb(null, `${command.path}/${Date.now().toString()}_${command.name}.${ex}`);
                        }
                    })
                });
                return this.emit(SUCCESS, upload);
            }
            catch (error) {
                return this.emit(ERROR, error);
            }
        });
    }
}
exports.FileUploader = FileUploader;
FileUploader.setOutputs(["SUCCESS", "ERROR"]);
//# sourceMappingURL=fileuploader.js.map