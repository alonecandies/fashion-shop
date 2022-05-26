import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  ListSubheader
} from '@material-ui/core';
import Proptypes from 'prop-types';

export const NormalSelect = ({ name, label, size, value, onChange, data, dataKey, dataValue }) => (
  <FormControl fullWidth size={size}>
    <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
    <Select
      labelId={`${name}-select-label`}
      id={`${name}-select`}
      value={value}
      label={label}
      onChange={onChange}
    >
      <MenuItem value="">
        <em>Bỏ</em>
      </MenuItem>
      {data?.length > 0 &&
        data.map((item, index) => (
          <MenuItem key={index} value={item[dataKey]}>
            {item[dataValue]}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
);

NormalSelect.propTypes = {
  name: Proptypes.string.isRequired,
  label: Proptypes.string,
  size: Proptypes.oneOf(['small', 'medium']),
  value: Proptypes.any,
  onChange: Proptypes.func,
  data: Proptypes.array,
  dataKey: Proptypes.string,
  dataValue: Proptypes.string
};

export const CategorySelect = ({ size, categories, value, handleChange, ...rest }) => {
  const themes = useTheme();

  const makeCategoryLevelStyle = (level) => {
    switch (level) {
      case 0:
        return { color: themes.palette.primary.main, fontWeight: 'bold' };
      case 1:
        return { color: themes.palette.secondary.main, pl: 4 };
      default:
        return { pl: 7 };
    }
  };

  return (
    <FormControl size={size || 'medium'} fullWidth {...rest}>
      <InputLabel id="category-label">Danh mục</InputLabel>
      <Select
        id="category-select"
        labelId="category-label"
        label="Danh mục"
        name="category"
        value={value}
        onChange={handleChange}
        renderValue={(currentCategory) => currentCategory?.name}
      >
        {categories.map(
          (category, index) => {
            switch (category.level) {
              case 0:
                return (
                  <ListSubheader key={index} value={JSON.stringify(category)} sx={makeCategoryLevelStyle(category.level)}>
                    {category.name}
                  </ListSubheader>
                );
              case 1:
                return (
                  <ListSubheader key={index} value={JSON.stringify(category)} sx={makeCategoryLevelStyle(category.level)}>
                    {`⎯ ${category.name}`}
                  </ListSubheader>
                );
              default:
                return (
                  <MenuItem
                    key={index}
                    value={JSON.stringify(category)}
                    sx={makeCategoryLevelStyle(category.level)}
                  >
                    {`⎯ ⎯${category.name}`}
                  </MenuItem>
                );
            }
          }
        )}
      </Select>
      {/* <Select
        id="category-select"
        labelId="category-label"
        label="Danh mục"
        name="category"
        value={value}
        onChange={handleChange}
        renderValue={(currentCategory) => currentCategory?.name}
      >
        <MenuItem value={JSON.stringify({ id: '', level: '', name: 'Không' })}>
          <em>Không</em>
        </MenuItem>
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            value={JSON.stringify(category)}
            sx={makeCategoryLevelStyle(category.level)}
          >
            {category.level === 0 ? `${category.name}` : `⎯ ${category.name}`}
          </MenuItem>
        ))}
      </Select> */}
    </FormControl>
  );
};

CategorySelect.propTypes = {
  size: Proptypes.oneOf(['small', 'medium']),
  categories: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.number,
      name: Proptypes.string,
      level: Proptypes.oneOf([0, 1, 2])
    })
  ),
  value: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string,
    level: Proptypes.oneOf([0, 1, 2])
  }),
  handleChange: Proptypes.func
};
