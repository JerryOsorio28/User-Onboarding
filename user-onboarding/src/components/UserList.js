import React from 'react';
import User from './User';

const UserList = (users) =>{
    // console.log(users.users)
    return(
        <div>
            {users.users.map(user => <User key={user.id} user={user}/>)}
        </div>
    )   
};

export default UserList;