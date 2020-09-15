import React from 'react'
import './Home.css';
import Product from './Product';


function Home() {

    return (
        <div className="home" >
            <div className="home__container">
                <img className="home__image" 
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt="" />

                <div className="home__row">
                    <Product 
                    id="1234567"
                    title="The lean startup" 
                    price={29.99} 
                    image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' 
                    rating={5} />
                    
                    <Product 
                        id="1234563322"
                        title="Kenwood Mix Stand Mixer for Baking, Stylish kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Browl"
                        price={239.0}
                        rating={4}
                        image="https://i.ebayimg.com/images/g/I~sAAOSwRBFd38Ug/s-l1600.jpg"
                    />
                </div>
                <div className="home__row">
                    <Product 
                        id="3498538945"
                        title="Samsung LC49RG90SSUXEN 49' Curverd LED Gaming Monitor"
                        price={199.99}
                        rating ={3}
                        image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                    />
                    <Product 
                        id="465897"
                        title="Amazon echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                        price={98.99}
                        rating={5}
                        image="https://www.bhphotovideo.com/images/images2500x2500/amazon_b07nftvp7p_echo_3rd_generation_charcoal_1512895.jpg"
                    />
                    <Product 
                        id="658721568"
                        title="New Apple iPad pro (12.9-inch, Wi-Fi. 128gb) - Silver (4th Generation)"
                        price={598.99}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/81FH2j7EnJL._AC_SL1500_.jpg"
                    />
                </div>
                <div className="home__row">
                    <Product 
                        id="465987321"
                        title= "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                        price={1094.98}
                        rating={4}
                        image="https://m.media-amazon.com/images/I/81vlA84pg6L._AC_UY218_.jpg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
