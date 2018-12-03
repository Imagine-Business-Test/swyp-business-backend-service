"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
class GetBusinessUserActivityStats extends operation_1.Operation {
    constructor(responseRepository) {
        super();
        this.responseRepository = responseRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const { SUCCESS, ERROR } = this.outputs;
            try {
                const [processingActivity, notingActivity] = yield Promise.all([
                    this.responseRepository.getProcessingActivityStats(),
                    this.responseRepository.getNotingActivityStats()
                ]);
                const result = this.statsMerger({ processingActivity, notingActivity });
                this.emit(SUCCESS, result);
            }
            catch (error) {
                this.emit(ERROR, error);
            }
        });
    }
    statsMerger(stats) {
        const usersStats = [];
        const processing = stats.processingActivity;
        const noting = stats.notingActivity;
        stateMerger(processing, usersStats, "processed");
        stateMerger(noting, usersStats, "notes");
        return usersStats;
    }
}
exports.GetBusinessUserActivityStats = GetBusinessUserActivityStats;
GetBusinessUserActivityStats.setOutputs(["SUCCESS", "ERROR"]);
const stateMerger = (dirtyStats, cleanStats, countName) => {
    dirtyStats.forEach((dStatObj) => {
        const userIndex = cleanStats.findIndex((cStatObj) => cStatObj.name === dStatObj._id);
        if (userIndex === -1) {
            const obj = { name: dStatObj._id };
            obj[countName] = dStatObj.count;
            cleanStats.push(obj);
        }
        else {
            const user = Object.assign({}, cleanStats[userIndex]);
            user[countName] = dStatObj.count;
            cleanStats[userIndex] = user;
        }
    });
    return cleanStats;
};
//# sourceMappingURL=get-business-user-activity-stats.js.map