import React from 'react'
import Footer from '../utilities/Footer'

const About = ({ user }) => {
    return (
        <div className='w-full' >
            {!user &&
                <div className='mt-12' >
                    <Footer />
                </div>
            }
        </div>
    )
}

export default About