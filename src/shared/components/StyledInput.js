import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  View,
} from 'react-native';
import { FormLabel } from './Type';
import { space, COLORS } from '../constants';

const StyledInput = ({
  label, formProps, formKey, ...rest
}) => {
  const inputStyles = {
    height: 50,
    paddingVertical: space[1],
    width: '100%',
    borderWidth: 0,
    borderColor: '#ddd',
    borderBottomWidth: 1,
  };

  if (formProps.touched[formKey] && formProps.errors[formKey]) {
    inputStyles.borderBottomColor = COLORS.danger;
  }

  return (
    <View style={{ marginBottom: space[2] }}>
      {label && <FormLabel>{label}</FormLabel>}
      <TextInput
        style={inputStyles}
        onChangeText={formProps.handleChange(formKey)}
        onBlur={formProps.handleBlur(formKey)}
        value={formProps.values[formKey]}
        {...rest}
      />
      {formProps.touched[formKey] && formProps.errors[formKey]
        && (
        <FormLabel color="danger">
          {formProps.errors[formKey]}
        </FormLabel>
        )
      }
    </View>
  );
};

StyledInput.propTypes = {
  label: PropTypes.string,
  formProps: PropTypes.object,
  formKey: PropTypes.string.isRequired,
};

export default StyledInput;
