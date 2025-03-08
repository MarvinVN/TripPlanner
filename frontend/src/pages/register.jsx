import React from 'react';
import { RegisterForm } from '../components/AuthForm/Auth';
import '@/app/globals.css';

const RegisterPage = () => {

    return (
        <div className='relative flex items-center justify-center min-h-screen bg-gray-900'>
            <div className="absolute inset-0 bg-cover bg-center"></div>
            <div className="relative z-10 w-full max-w-md p-6 bg-gray-80 bg-opacity-75 rounded-lg shadow-lg max-auto">
                <RegisterForm onRegister={(response) => console.log('Registered: ', response)} />
            </div>
        </div>
    );
};

export default RegisterPage;