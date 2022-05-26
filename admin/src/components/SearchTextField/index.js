import Proptypes from 'prop-types';
import { TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const SearchTextField = ({ placeholder, size, value, onChange }) => (
  <TextField
    size={size}
    fullWidth
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SvgIcon fontSize="small" color="action">
            <SearchIcon />
          </SvgIcon>
        </InputAdornment>
      )
    }}
    placeholder={placeholder}
    variant="outlined"
    onChange={onChange}
    value={value}
  />
);

SearchTextField.propTypes = {
  placeholder: Proptypes.string,
  size: Proptypes.oneOf(['small', 'medium']),
  value: Proptypes.any,
  onChange: Proptypes.func
};

export default SearchTextField;
