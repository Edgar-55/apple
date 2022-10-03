import { Slider } from '@material-ui/core';
import React from 'react';

import Card from '../components/Card';



function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading,
  })  {

 
          const renderItems = () => {
          const filtredItems = items.filter((item) => 
          item.title.toLowerCase().includes(searchValue.toLowerCase()),
          );
          return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoading}
              {...item}

            />
          ));
        };

        
    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Search: "${searchValue}"` : 'All models'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
              />
            )}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
          </div>
        </div>

        <div className="d-flex flex-wrap  ">
          {renderItems()}
        </div>
      </div>
    );
}

export default Home;