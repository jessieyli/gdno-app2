import PropTypes from 'prop-types';

export const plant = PropTypes.shape({});

export const plants = PropTypes.arrayOf(plant);

export const plantList = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
}));

export const navigation = PropTypes.shape({
  state: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  goBack: PropTypes.func.isRequired,
});
