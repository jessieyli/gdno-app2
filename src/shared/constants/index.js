import { values } from 'lodash';

export { default as COLORS } from './colors';

/* STYLES */
export const space = [4, 8, 16, 24, 32, 40];

export const padded = { padding: space[2] };

export const borderWide = 2;

export const safeArea = { flex: 1 };

export const centered = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

export const verticallyCentered = {
  flex: 1,
  justifyContent: 'center',
};

export const floating = (elevation = 10) => ({
  ios: {
    shadowColor: '#a0a0a0',
    shadowOffset: { height: -(elevation / 3) },
    shadowOpacity: (elevation / 30),
    shadowRadius: (elevation / 3),
  },
  android: {
    elevation,
  },
});

/* CONSTANTS */
export const LINKS = {
  instagram: 'https://instagram.com/growgardenio',
  facebook: 'https://facebook.com/growgardenio',
  shop: 'https://growgardenio.com/',
  help: 'mailto:help@growgardenio.zendesk.com',
  feedback: 'mailto:feedback@growgardenio.zendesk.com',
};

export const detailsScreens = {
  essentials: 'ESSENTIALS',
  grow: 'GROW',
  issues: 'ISSUES',
  enjoy: 'ENJOY',
};

export const detailsScreensArray = values(detailsScreens);

export { default as PROPSHAPES } from './propShapes';
