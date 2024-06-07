import React, { useState, useEffect } from 'react';
import axios from 'axios';
import green from '../../assets/svg/green.svg';
import red from '../../assets/svg/red.svg';
import { API_URL } from '../../data/api';

interface UsersData {
    users: Array<{
        id: number,
        name_person: {
            name: string,
            last_name: string
        },
        user: {
            id: number,
            username: string,
            groups: string,
            is_active: boolean
        },
        contact: {
            telephone: string
        }
    }>
}

export const UsersControl: React.FC<UsersData> = ({ users }) => {
    const [activeUsers, setActiveUsers] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const initialActiveUsers = users.reduce((acc, user) => {
            acc[user.user.id] = user.user.is_active;
            return acc;
        }, {} as Record<number, boolean>);
        setActiveUsers(initialActiveUsers);
    }, [users]);

    const toggleUserActivation = async (id: number) => {
        const newState = !activeUsers[id];
        setActiveUsers(prevState => ({
            ...prevState,
            [id]: newState
        }));

        try {
            await axios.post(`${API_URL}user/update/${id}/`, { is_active: newState });
        } catch (error) {
            console.error('Error updating user status:', error);
            // Revert the state in case of an error
            setActiveUsers(prevState => ({
                ...prevState,
                [id]: !newState
            }));
        }
    };

    return (
        <>
            {users.map((user, index) => {
                const isActive = activeUsers[user.user.id];
                return (
                    <tr key={index} className='flex justify-around border-b-[0.5px] text-center text-black'>
                        <td className='p-4 uppercase basis-1/6'>{user.name_person.name + ' ' + user.name_person.last_name}</td>
                        <td className='p-4 basis-1/6'>{user.user.username}</td>
                        <td className='p-4 basis-1/6'>{user.user.groups}</td>
                        <td className='p-4 basis-1/6'>{user.contact.telephone}</td>
                        <td className='p-4 basis-1/6 flex justify-center'>
                            <div className="p-4 cursor-pointer" onClick={() => toggleUserActivation(user.user.id)}>
                                <div className="pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-blue-500 ring-slate-900/5">
                                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out ${isActive ? 'translate-x-4' : ''}`}></div>
                                </div>
                                <div className="z-0">
                                    <div className="absolute -top-full bottom-2/3 left-0 w-px bg-slate-900/[0.2] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                                </div>
                            </div>
                        </td>
                        <td className='p-4 basis-1/6 flex justify-center'>
                            {isActive ? <img src={green} alt="icon" className='w-6' /> : <img src={red} alt="alternative icon" className='w-6' />}
                        </td>
                    </tr>
                );
            })}
        </>
    );
};
