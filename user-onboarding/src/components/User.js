import React from 'react';

const User = user => {
    console.log(user)
    return (
        <div className='userCard'>
            <h3>{user.user.name}</h3>
            <p>{user.user.email}</p>
        </div>
    );
};

export default User;