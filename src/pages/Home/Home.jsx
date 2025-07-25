import React from 'react';
import Banner from '../../components/HomeComponents/Banner';
import RandomQuestion from '../../components/HomeComponents/RandomQuestion';
import HomeCards from '../../components/HomeComponents/HomeCards';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HomeCards />
            <RandomQuestion/>

        </div>
    );
};

export default Home;