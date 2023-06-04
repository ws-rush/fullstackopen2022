import diagnosesData from '../data/diagnoses';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData;

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

const findById = (code: string): Diagnose | undefined => {
  const entry = diagnoses.find(d => d.code === code);
  return entry;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  findById
};