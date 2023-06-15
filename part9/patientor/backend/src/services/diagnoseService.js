"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const diagnoses = diagnoses_1.default;
const getEntries = () => {
    return diagnoses;
};
const findById = (code) => {
    const entry = diagnoses.find(d => d.code === code);
    return entry;
};
const addEntry = () => {
    return null;
};
exports.default = {
    getEntries,
    addEntry,
    findById
};
