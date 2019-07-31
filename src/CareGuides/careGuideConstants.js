import { COLORS, space } from '../shared/constants';
import placeholder from '../shared/assets/icon.png';

export const styles = {
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
    icon: placeholder, // annualIcon,
    detailKey: ''
  },
  biennial: {
    text: 'Biennial',
    icon: placeholder, // biennialIcon,
    detailKey: ''
  },
  perennial: {
    text: 'Perennial',
    icon: placeholder, // perennialIcon,
    detailKey: ''
  }
};

export const sunFeatures = {
  full: {
    text: 'Full Sun',
    icon: placeholder, // fullSunIcon,
    detailKey: 'sunDetails'
  },
  partial: {
    text: 'Partial Sun',
    icon: placeholder, // partialSunIcon,
    detailKey: 'sunDetails'
  }
};

export const thirstinessFeatures = {
  'not thirsty': {
    text: 'Less Water',
    icon: placeholder, // lessWaterIcon,
    detailKey: 'thirstinessDetails',
  },
  regular: {
    text: 'Regular Water',
    icon: placeholder, // regularWaterIcon,
    detailKey: 'thirstinessDetails',
  },
  'very thirsty': {
    text: 'More Water',
    icon: placeholder, // moreWaterIcon,
    detailKey: 'thirstinessDetails',
  },
};

export const petFeatures = {
  cat: {
    text: 'Cat Friendly',
    icon: placeholder, // catPetIcon,
    detailKey: 'petDetails',
  },
  dog: {
    text: 'Dog Friendly',
    icon: placeholder, // dogPetIcon,
    detailKey: 'petDetails',
  },
  'cat and dog': {
    text: 'Pet Friendly',
    icon: placeholder, // bothPetIcon,
    detailKey: 'petDetails',
  },
  none: {
    text: 'Not Pet Friendly',
    icon: placeholder, // nonePetIcon,
    detailKey: 'petDetails',
  },
};

export const frostFeatures = {
  hardy: {
    text: 'Frost Hardy',
    icon: placeholder, // placeholder,
    detailKey: 'frostDetails',
  },
  tolerant: {
    text: 'Frost Tolerant',
    icon: placeholder, // placeholder,
    detailKey: 'frostDetails',
  },
  sensitive: {
    text: 'Frost Sensitive',
    icon: placeholder, // placeholder,
    detailKey: 'frostDetails',
  }
};

export const soilFeatures = {
  'Lean, rocky soil': {
    text: 'Lean, rocky soil',
    icon: placeholder, // leanSoilIcon,
    detailKey: 'soilDetails',
  },
  'Loose, fertile soil': {
    text: 'Loose, fertile soil',
    icon: placeholder, // fertileSoilIcon,
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
