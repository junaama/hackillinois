//**Renders About component which will feature on the Landing Page */
import React from 'react';

const About = () => {
    return (
        <div>
            <div className="about">
                <h1>About</h1>
            </div>
            <div className="about-info">
                <p>This project was made for the HackIllinois hackathon. This is a responsive web application that let's you view predicted stock movements based on social media sentiment analysis through Twitter and Reddit. The purpose of this project is to provide investors/finance nerds an insight into what the public thinks...about publicly traded companies. The backend algorithm can also provide information about how potential IPOs can do, what people think about industries or trends as a whole.</p>
            </div>
        </div>
    )
}
export default About;
