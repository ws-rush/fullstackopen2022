import { v1 as uuid } from 'uuid'
import patientsData from '../data/patients';
import { Patient, NonSensitivePatient } from '../types';

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

const addEntry = ({ name, dateOfBirth, gender, occupation }) => {
  // Generate unique id
  const id = uuid();
  const newEntry = {
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  };

  patients.push(newEntry);
  return newDiaryEntry;
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};