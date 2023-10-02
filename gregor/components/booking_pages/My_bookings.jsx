import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStateContext from '@/context/ContextProvider';

function createData(date, bay, session, startTime, endTime, players, member, guests) {
    return { date, bay, session, startTime, endTime, players, member, guests };
}

const rows = [
    createData('17/04/23', 1, "4-hour", "12:00 am", "04:00 pm", 3, 1, 2),
    createData('18/04/23', 1, "2-hour", "12:00 am", "02:00 pm", 1, 1, 2),
    createData('18/04/23', 2, "2-hour", "06:00 am", "08:00 pm", 2, 0, 2),
    createData('01/06/23', 1, "2-hour", "09:00 am", "11:00 am", 1, 1, 0),
    createData('08/06/23', 2, "1-hour", "01:00 pm", "02:00 pm", 1, 1, 0),
];

const headers = [
    "User Name",
    "Bay (field No.)",
    "Session Duration",
    "Start Time",
    "End Time",
    "Player(s)",
    "Member",
    "Guest(s)",
]

export default function My_bookings() {

    const { openSidebar, handle_get_user_bookings, cookieUser } = useStateContext();
    const [data, set_data] = useState([]);
    useEffect(() => {
        if (cookieUser) handle_get_user_bookings(set_data, cookieUser.id)
    }, [cookieUser])

    function calculateTotalHours(startTime, endTime) {
        const start = new Date(`1970-01-01T${startTime.split("T")[1]}`);
        const end = new Date(`1970-01-01T${endTime.split("T")[1]}`);
        const timeDifference = end - start;

        // Convert milliseconds to hours
        const totalHours = timeDifference / (1000 * 60 * 60);

        return totalHours;
    }

    function countMembers(statement) {
        const regex = /Member/g;
        const match = statement.match(regex);
        return match ? match.length : 0;
    }

    function countGuests(statement) {
        const regex = /\b(\d+)\s*Guests?\b/g;
        const matches = statement.match(regex);
        if (matches) {
            return matches.reduce((total, match) => total + parseInt(match), 0);
        }
        return 0;
    }

    return (
        <div className={`w-full h-[calc(100vh-60px)] overflow-y-auto ${openSidebar ? "px-[20px] md:px-[40px]" : "px-[80px]"} pt-24 lg:pt-6 transition-all duration-300`}>

            <TableContainer className='w-[400px] md:w-full overflow-x-auto' component={Paper}>
                <Table size="medium" aria-label="My Booking">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className='text-stone-500 font-semibold text-[15px]'
                            >
                                Date
                            </TableCell>
                            {headers.map((header, index) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    className='text-stone-500 font-semibold text-[14px]'
                                >
                                    {header}
                                </TableCell>
                            ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Boolean(data.length) &&
                            data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell className='text-stone-500' component="th" scope="row" align="center">
                                        {row.start.split("T")[0]}
                                    </TableCell>
                                    <TableCell className='text-stone-500 capitalize' component="th" scope="row" align="center">
                                        {row.username}
                                    </TableCell>
                                    <TableCell className='text-stone-500' align="center">{row.bay_field}</TableCell>
                                    <TableCell className='text-stone-500' align="center">{calculateTotalHours(row.start, row.end)}</TableCell>
                                    <TableCell className='text-stone-500' align="center">{row.start.split("T")[1]}</TableCell>
                                    <TableCell className='text-stone-500' align="center">{row.end.split("T")[1]}</TableCell>
                                    <TableCell className='text-stone-500' align="center">{row.players}</TableCell>
                                    <TableCell className='text-stone-500' align="center">{countMembers(row.title)}</TableCell>
                                    <TableCell className='text-stone-500' align="center">{countGuests(row.title)}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}