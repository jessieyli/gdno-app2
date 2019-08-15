import { COLORS, space } from '../shared/constants';
import annualIcon from '../shared/assets/life_annual.png';
import biennialIcon from '../shared/assets/life_biennial.png';
import perennialIcon from '../shared/assets/life_perennial.png';
import fullSunIcon from '../shared/assets/sun_full.png';
import partialSunIcon from '../shared/assets/sun_partial.png';
import lessWaterIcon from '../shared/assets/water_01.png';
import regularWaterIcon from '../shared/assets/water_02.png';
import moreWaterIcon from '../shared/assets/water_03.png';
import nonePetIcon from '../shared/assets/pet_notpetfriendly.png';
import bothPetIcon from '../shared/assets/pet_bothfriendly.png';
import catPetIcon from '../shared/assets/pet_catfriendly.png';
import dogPetIcon from '../shared/assets/pet_dogfriendly.png';
import leanSoilIcon from '../shared/assets/soil_looselean.png';
import fertileSoilIcon from '../shared/assets/soil_looserich.png';
import frostHardyIcon from '../shared/assets/frost_hardy.png';
import frostSensitiveIcon from '../shared/assets/frost_sensitive.png';
import frostTolerantIcon from '../shared/assets/frost_tolerant.png';

export const styles = {
  main: {
    backgroundColor: COLORS.offWhite,
    flex: 1,
  },
  section: {
    paddingHorizontal: space[2],
    paddingVertical: space[2],
  },
  topSection: {
    paddingHorizontal: space[2],
    paddingVertical: space[4],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  titleSpacing: {
    marginBottom: space[1],
  },
};

/* CARE GUIDE FEATURES */
export const lifespanFeatures = {
  annual: {
    text: 'Annual',
    icon: annualIcon,
    detailKey: '',
    content: 'Annuals are plants that only last one growing season, from germination to seed production. A great, low-pressure plant that you can just try again next season!',
  },
  biennial: {
    text: 'Biennial',
    icon: biennialIcon,
    content: 'A biennial plant is one that takes 2 years to complete its growing cycle. The first year it grows what are called "vegetative structures" (leaves, stems, roots) and also happen to usually be the things we harvest to eat. The flowers, fruits, and seeds of the plant can be harvested the next year, although most of these types of plants require a long cold period for the flowering mechanism to be triggered.',
  },
  perennial: {
    text: 'Perennial',
    icon: perennialIcon,
    content: 'Perennials are, simply put, plants that last longer than 2 years.',
  }
};

export const sunFeatures = {
  full: {
    text: 'Full Sun',
    icon: fullSunIcon,
    detailKey: 'sunDetails'
  },
  partial: {
    text: 'Partial Sun',
    icon: partialSunIcon,
    detailKey: 'sunDetails'
  }
};

export const thirstinessFeatures = {
  'not thirsty': {
    text: 'Less Water',
    icon: lessWaterIcon,
    detailKey: 'thirstinessDetails',
  },
  regular: {
    text: 'Regular Water',
    icon: regularWaterIcon,
    detailKey: 'thirstinessDetails',
  },
  'very thirsty': {
    text: 'More Water',
    icon: moreWaterIcon,
    detailKey: 'thirstinessDetails',
  },
};

export const petFeatures = {
  cat: {
    text: 'Cat Friendly',
    icon: catPetIcon,
    detailKey: 'petDetails',
  },
  dog: {
    text: 'Dog Friendly',
    icon: dogPetIcon,
    detailKey: 'petDetails',
  },
  'cat and dog': {
    text: 'Pet Friendly',
    icon: bothPetIcon,
    detailKey: 'petDetails',
  },
  none: {
    text: 'Not Pet Friendly',
    icon: nonePetIcon,
    detailKey: 'petDetails',
  },
};

export const frostFeatures = {
  hardy: {
    text: 'Frost Hardy',
    icon: frostHardyIcon,
    detailKey: 'frostDetails',
  },
  tolerant: {
    text: 'Frost Tolerant',
    icon: frostTolerantIcon,
    detailKey: 'frostDetails',
  },
  sensitive: {
    text: 'Frost Sensitive',
    icon: frostSensitiveIcon,
    detailKey: 'frostDetails',
  }
};

export const soilFeatures = {
  'Lean, rocky soil': {
    text: 'Lean, rocky soil',
    icon: leanSoilIcon,
    detailKey: 'soilDetails',
  },
  'Loose, fertile soil': {
    text: 'Loose, fertile soil',
    icon: fertileSoilIcon,
    detailKey: 'soilDetails',
  }
};

export const allFeatures = {
  lifespan: lifespanFeatures,
  sun: sunFeatures,
  thirstiness: thirstinessFeatures,
  soil: soilFeatures,
  pet: petFeatures,
  frost: frostFeatures,
};
