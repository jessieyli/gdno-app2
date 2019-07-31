import React from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { space } from '../../shared/constants';
import { Paper, TextHeader } from '../../shared/components';
import {
  lifespanFeatures,
  sunFeatures,
  thirstinessFeatures,
  soilFeatures,
  petFeatures,
  frostFeatures,
} from '../careGuideConstants';

const ss = StyleSheet.create({
  bounds: {
    height: 100,
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: space[2],
  },
  textArea: {
    lineHeight: 1,
  },
  imageArea: {
    flexBasis: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const getContentForFeature = (type, val) => {
  let options;
  switch (type) {
    case 'lifespan':
      options = lifespanFeatures;
      break;
    case 'sun':
      options = sunFeatures;
      break;
    case 'thirstiness':
      options = thirstinessFeatures;
      break;
    case 'soil':
      options = soilFeatures;
      break;
    case 'frost':
      options = frostFeatures;
      break;
    case 'pet':
      options = petFeatures;
      break;
    default:
      options = null;
  }
  if (!options) {
    return null;
  }
  return options[val];
};

const FeatureBlock = ({
  category,
  feature,
}) => {
  const content = getContentForFeature(category, feature);

  if (!content) return null;

  return (
    <Paper style={ss.bounds}>
      <View style={ss.imageArea}>
        <Image
          source={content.icon}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <TextHeader style={{ lineHeight: 14 }} uppercase color="grass">{content.text}</TextHeader>
    </Paper>
  );
};

FeatureBlock.propTypes = {
  feature: PropTypes.string,
  category: PropTypes.oneOf(['pet', 'frost', 'lifespan', 'sun', 'thirstiness', 'soil']).isRequired,
};

export default FeatureBlock;
