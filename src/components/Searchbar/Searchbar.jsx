import React, { useState } from 'react';
import PropTypes from 'prop-types';

import searchbarStyles from './Searchbar.module.css';
import search from '../../images/search.svg';

const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const onChange = e => {
    const { value } = e.target;
    setName(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name);
    reset();
  };

  const reset = () => {
    setName('');
  };

  return (
    <header className={searchbarStyles.searchbar}>
      <form className={searchbarStyles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={searchbarStyles.searchFormBtn}>
          <img className={searchbarStyles.iconSearch} src={search} alt="icon" />
          <span className={searchbarStyles.searchFormBtnLabel}>Search</span>
        </button>

        <input
          className={searchbarStyles.searchFormInput}
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          autoComplete="off"
          autoFocus
          required
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
