import handleError from '../shared/data/handleError';
import { keyTypes, getStoredDataOfType } from '../shared/data/localStorage';

export const loadStoredPlants = async () => {
  try {
    const plants = await getStoredDataOfType(keyTypes.plants);
    return plants.map(v => JSON.parse(v[1]));
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export default {
  loadStoredPlants,
};
