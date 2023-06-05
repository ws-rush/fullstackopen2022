import { v1 as uuid } from 'uuid'
import patientsData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const addEntry = (entry: NewPatient): Patient => {
  // Generate unique id
  const id = uuid();
  const newEntry = {
    id,
    ...entry
  };

  patients.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};