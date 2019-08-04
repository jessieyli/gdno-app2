import PropTypes from 'prop-types';

const plant = PropTypes.shape({});

const plants = PropTypes.arrayOf(plant);

const plantList = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
}));

const navigation = PropTypes.shape({
  state: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  goBack: PropTypes.func.isRequired,
});

export default {
  plant,
  plants,
  plantList,
  navigation,
};
