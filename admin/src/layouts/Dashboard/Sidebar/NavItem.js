import { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, List, ListItem, Collapse } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@material-ui/icons';

const ButtonMenu = ({ children, href, onClick, isActive }) => {
  return (
    <Button
      component={!!href ? RouterLink : 'button'}
      sx={{
        color: 'text.secondary',
        fontWeight: 'medium',
        justifyContent: 'flex-start',
        letterSpacing: 0,
        textTransform: 'none',
        py: !!href ? 0.5 : 1.25,
        width: '100%',
        ...(isActive && {
          color: 'primary.main'
        }),
        '& svg': {
          mr: 1
        }
      }}
      to={href}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const NavItem = ({ isActive, href, icon: Icon, title, nestedItems }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0,
        flexDirection: 'column'
      }}
    >
      <ButtonMenu
        href={href}
        isActive={isActive}
        children={
          <>
            {Icon && <Icon size="20" />}
            <span>{title}</span>
            {nestedItems && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </>
        }
        onClick={() => setOpen(!open)}
      />
      <List component="div" style={{ width: '100%' }}>
        {nestedItems &&
          nestedItems.map((item, index) => (
            <Collapse in={open} timeout="auto" unmountOnExit key={index}>
              <ListItem disableGutters sx={{ pl: 3 }}>
                <ButtonMenu
                  href={item.href}
                  isActive={item.active}
                  children={
                    <>
                      {item.icon && <item.icon size="20" />}
                      <span>{item.title}</span>
                    </>
                  }
                />
              </ListItem>
            </Collapse>
          ))}
      </List>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
