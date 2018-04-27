"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlackbaseNode_1 = require("./BlackbaseNode");
class Blackbase {
}
Blackbase.Node = BlackbaseNode_1.default;
exports.default = Blackbase;
const testNode = new Blackbase.Node();
