import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Form, Field, withFormik, resetForm } from 'formik';
import UserList from './UserList';
import { reset } from 'ansi-colors';

    
const UserForm = ( { errors, touched, values, status } ) => {
    const [users, setUsers] = useState([]);

    // console.log(users)

    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status]);

    return(
        <div className='userForm'>
            <h1>User Form</h1>
            <Form>
                <h3>Name</h3>
                <Field 
                    type='text' 
                    name='name' 
                    placeholder='Name'
                />
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
                <h3>E-mail</h3>
                <Field 
                    type='text' 
                    name='email' 
                    placeholder='E-mail'
                />
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                <h3>Password</h3>
                <Field 
                    type='password' 
                    name='password' 
                    placeholder='Password'
                />
                {touched.password && errors.password && <p className="error">{errors.password}</p>}
                <label className='checkbox-container'>
                    Terms of Service
                    <Field 
                        type='checkbox' 
                        name='termsOfService'
                        checked={values.termsOfService}
                    />
                    {touched.termsOfService && errors.termsOfService && <p className="error">{errors.termsOfService}</p>}
                    <button type='submit'>Submit</button>
                </label>
            </Form>
            <h3>List of Users:</h3>
            <ul>
            <UserList users={users}/>
            </ul>
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, password, email, termsOfService }){
        return {
            name: name || '',
            password: password || '',
            email: email || '',
            termsOfService: termsOfService || false
        }; 
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name Required'),
        email: Yup.string().required('E-mail Required'),
        password: Yup.string().required('Password Required'),
        termsOfService: Yup.bool().oneOf([true], 'Accept the Terms of Service')
    }),

    handleSubmit(values, { setStatus,  resetForm } ) {
        axios
            .post(' https://reqres.in/api/users', values)
            .then(res => {
                // console.log(res.data)
                setStatus(res.data);
                resetForm();
                
            })
            .catch(err => console.log(err.response))
    }

})(UserForm);



export default FormikUserForm;
    