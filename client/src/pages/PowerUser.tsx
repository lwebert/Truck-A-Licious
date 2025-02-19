import React, { useState, useEffect } from 'react';
import ErrorPage from './ErrorPage';
import UserList from '../components/Users';
import { retrieveUsers } from '../api/userAPI';
import { getUserRole } from '../api/authAPI';

const PowerUser: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [isPowerUser, setIsPowerUser] = useState(false);

    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const role = await getUserRole();
                if (role === 'powerUser') {
                    setIsPowerUser(true);
                    fetchUsers();
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Failed to retrieve user role:', err);
                setError(true);
            }
        };

        checkUserRole();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to retrieve users:', err);
            setError(true);
        }
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            {
                !isPowerUser ? (
                    <div className='login-notice'>
                        <h1>
                            Access Denied
                        </h1>
                    </div>
                ) : (
                    <UserList users={users} />
                )}
        </>
    );
};

export default PowerUser;