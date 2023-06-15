"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const patients = patients_1.default;
const getEntries = () => {
    return patients;
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addEntry = (entry) => {
    // Generate unique id
    const id = (0, uuid_1.v1)();
    const newEntry = Object.assign({ id }, entry);
    patients.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addEntry
};
