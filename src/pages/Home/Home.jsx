import React from 'react';
import Banner from '../../components/HomeComponents/Banner';
import RandomQuestion from '../../components/HomeComponents/RandomQuestion';
import HomeCards from '../../components/HomeComponents/HomeCards';
import AboutUs from '../../components/HomeComponents/AboutUs';
import NumberCounter from '../../components/HomeComponents/NumberCounter';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HomeCards />
            <NumberCounter />
            <RandomQuestion/>
            <AboutUs/>
        </div>
    );
};

export default Home;