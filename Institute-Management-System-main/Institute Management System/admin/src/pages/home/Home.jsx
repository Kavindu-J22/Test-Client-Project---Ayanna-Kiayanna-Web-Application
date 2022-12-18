import React from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import "./Home.css"
import { userData } from '../../dummyData'

export default function Home() {
    return (
        <div className="home">
           <FeaturedInfo />
           <Chart data={userData} title="User Analytics" grid dataKey="Active Users"/>
        </div>
    );
}
