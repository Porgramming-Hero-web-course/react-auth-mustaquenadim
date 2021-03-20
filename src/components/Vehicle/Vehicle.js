import React from 'react';
import { Link } from 'react-router-dom';

const Vehicles = (props) => {
    const { id, transport, image } = props.vehicle;

    return (
        <div className='col-lg-3'>
            <Link to={`/destination/${id}`}>
                <div className='card text-center bg-white'>
                    <img
                        className='card-img-top w-100 p-3 img-fluid'
                        src={image}
                        alt={transport}
                    />
                    <div className='card-footer'>
                        <div></div>
                        <h5 className='card-title text-dark'>{transport}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Vehicles;
