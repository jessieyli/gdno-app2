import React from 'react';
import { COLORS, space } from '../shared/constants';
import AnnualIcon from './icons/lifespan_annual.svg';
import BiennialIcon from './icons/lifespan_biennial.svg';
import PerennialIcon from './icons/lifespan_perennial.svg';
import FullSunIcon from './icons/sun_full.svg';
import PartialSunIcon from './icons/sun_partial.svg';
import LessWaterIcon from './icons/water_less.svg';
import RegularWaterIcon from './icons/water_normal.svg';
import MoreWaterIcon from './icons/water_more.svg';
import NonePetIcon from './icons/petfriendly_none.svg';
import BothPetIcon from './icons/petfriendly_both.svg';
import CatPetIcon from './icons/petfriendly_cat.svg';
import DogPetIcon from './icons/petfriendly_dog.svg';
import LeanSoilIcon from './icons/soil_lean.svg';
import FertileSoilIcon from './icons/soil_fertile.svg';
import FrostHardyIcon from './icons/frost_hardy.svg';
import FrostSensitiveIcon from './icons/frost_sensitive.svg';
import FrostTolerantIcon from './icons/frost_tolerant.svg';

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
    icon: (<AnnualIcon width={40} height={40} />),
    detailKey: '',
    content: 'Annuals are plants that only last one growing season, from germination to seed production. A great, low-pressure plant that you can just try again next season!',
  },
  biennial: {
    text: 'Biennial',
    icon: (<BiennialIcon width={40} height={40} />),
    content: 'A biennial plant is one that takes 2 years to complete its growing cycle. The first year it grows what are called "vegetative structures" (leaves, stems, roots) and also happen to usually be the things we harvest to eat. The flowers, fruits, and seeds of the plant can be harvested the next year, although most of these types of plants require a long cold period for the flowering mechanism to be triggered.',
  },
  perennial: {
    text: 'Perennial',
    icon: (<PerennialIcon width={40} height={40} />),
    content: 'Perennials are, simply put, plants that last longer than 2 years.',
  }
};

export const sunFeatures = {
  full: {
    text: 'Full Sun',
    icon: (<FullSunIcon width={40} height={40} />),
    detailKey: 'sunDetails'
  },
  partial: {
    text: 'Partial Sun',
    icon: (<PartialSunIcon width={40} height={40} />),
    detailKey: 'sunDetails'
  }
};

export const thirstinessFeatures = {
  'not thirsty': {
    text: 'Less Water',
    icon: (<LessWaterIcon width={40} height={40} />),
    detailKey: 'thirstinessDetails',
  },
  regular: {
    text: 'Regular Water',
    icon: (<RegularWaterIcon width={40} height={40} />),
    detailKey: 'thirstinessDetails',
  },
  'very thirsty': {
    text: 'More Water',
    icon: (<MoreWaterIcon width={40} height={40} />),
    detailKey: 'thirstinessDetails',
  },
};

export const petFeatures = {
  cat: {
    text: 'Cat Friendly',
    icon: (<CatPetIcon width={40} height={40} />),
    detailKey: 'petDetails',
  },
  dog: {
    text: 'Dog Friendly',
    icon: (<DogPetIcon width={40} height={40} />),
    detailKey: 'petDetails',
  },
  'cat and dog': {
    text: 'Pet Friendly',
    icon: (<BothPetIcon width={40} height={40} />),
    detailKey: 'petDetails',
  },
  none: {
    text: 'Not Pet Friendly',
    icon: (<NonePetIcon width={40} height={40} />),
    detailKey: 'petDetails',
  },
};

export const frostFeatures = {
  hardy: {
    text: 'Frost Hardy',
    icon: (<FrostHardyIcon width={40} height={40} />),
    detailKey: 'frostDetails',
  },
  tolerant: {
    text: 'Frost Tolerant',
    icon: (<FrostTolerantIcon width={40} height={40} />),
    detailKey: 'frostDetails',
  },
  sensitive: {
    text: 'Frost Sensitive',
    icon: (<FrostSensitiveIcon width={40} height={40} />),
    detailKey: 'frostDetails',
  }
};

export const soilFeatures = {
  'Lean, rocky soil': {
    text: 'Lean, rocky soil',
    icon: (<LeanSoilIcon width={40} height={40} />),
    detailKey: 'soilDetails',
  },
  'Loose, fertile soil': {
    text: 'Loose, fertile soil',
    icon: (<FertileSoilIcon width={40} height={40} />),
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
