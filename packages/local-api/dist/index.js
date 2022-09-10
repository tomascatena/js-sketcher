"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (params) => {
    console.log('Serving traffic on port', params.port);
    console.log('Saving/fetching cells from', params.filename);
    console.log('That file is in directory', params.dir);
};
exports.serve = serve;
