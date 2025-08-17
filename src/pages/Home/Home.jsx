import React from 'react';
import Banner from '../../components/HomeComponents/Banner';
import RandomQuestion from '../../components/HomeComponents/RandomQuestion';
import HomeCards from '../../components/HomeComponents/HomeCards';
import AboutUs from '../../components/HomeComponents/AboutUs';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HomeCards />
            <RandomQuestion/>
            <AboutUs/>
        </div>
    );
};

export default Home;