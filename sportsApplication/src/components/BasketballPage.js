// components/BasketballPage.js
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import data from './Home.js'
import { useAppData } from './ApiData';
import './ApiData.js'


import basketballMatch from '../basketball_field_frame.jpg'
import '../App.css';

function BasketballPage() {
  // const { data, error, isLoading } = useAppData();
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  return (
    <div>
      <img className='basketball-field' src={basketballMatch} alt="basketball" width="100%"/>
    </div>
  );
}

export default BasketballPage;


