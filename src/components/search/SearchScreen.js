import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryString = require('query-string');
  const { q = '' }= queryString.parse(location.search);
  const [{searchText}, handleInputChange, reset] = useForm({
    searchText: q
  });
  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);
  const handleSearch = (event)=>{
    event.preventDefault();
    navigate(`?q=${ searchText }`);
  }

  return (
  <>
      <h1>Búsqueda</h1>
      <hr />
      <div className='row'>
        <div className='col-5'>
          <h4>Buscar</h4>
          <hr/>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder='Buscar un heroe'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={searchText}
              onChange={ handleInputChange }
            />
            <button
              type='submit'
              className='btn btn-outline-primary mt-1'
            >Buscar...</button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Resultados</h4>
          <hr />
          {
            (q ==='')
              ? <div className='alert alert-info'>Buscar un héroe</div>
              : (heroesFiltered.length ===0) && <div className='alert alert-danger'>No hay resultado: {q} </div>
          }
          {
            heroesFiltered.map(hero =>(<HeroCard
              key={hero.id}
              {...hero}
            />))
          }
        </div>
      </div>
  </>);
};
