import { useState, useEffect } from 'react';

function Filters({ apiData, setActiveProducts }) {
  const [filters, setFilters] = useState({ gender: '', discounted: false });
  const handleFilter = obj => {
    if ('gender' in obj) {
      if (obj.gender === filters.gender) {
        setFilters({ ...filters, gender: '' });
      } else {
        setFilters({ ...filters, gender: obj.gender });
      }
    } else {
      setFilters({ ...filters, discounted: !filters.discounted });
    }
  };
  useEffect(() => {
    // apply filters
    const filteredData = [];
    apiData.forEach(product => {
      if (filters.gender !== '') {
        if (
          filters.gender === product.gender &&
          ((filters.discounted && product.discountPrice) || !filters.discounted)
        ) {
          filteredData.push(product);
        }
      } else if (filters.discounted) {
        if (product.discountPrice) {
          filteredData.push(product);
        }
      } else {
        filteredData.push(product);
      }
    });
    setActiveProducts(filteredData);
  }, [filters, apiData, setActiveProducts]);
  return (
    <div className='filters'>
      Filters:
      <ul>
        <li
          className={`${filters.gender === 'male' ? 'active' : ''}`}
          onClick={() => handleFilter({ gender: 'male' })}
        >
          <button>Men</button>
          {filters.gender === 'male' ? (
            <span className='remove-filter'>x</span>
          ) : null}
        </li>
        <li
          className={`${filters.gender === 'female' ? 'active' : ''}`}
          onClick={() => handleFilter({ gender: 'female' })}
        >
          <button>Women</button>
          {filters.gender === 'female' ? (
            <span className='remove-filter'>x</span>
          ) : null}
        </li>
        <li
          className={`${filters.discounted ? 'active' : ''}`}
          onClick={() => handleFilter({ discounted: true })}
        >
          <button>Discounted</button>
          {filters.discounted ? <span className='remove-filter'>x</span> : null}
        </li>
      </ul>
    </div>
  );
}

export default Filters;
