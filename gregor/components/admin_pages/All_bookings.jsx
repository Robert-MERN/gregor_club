import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStateContext from '@/context/ContextProvider';
import { Button } from '@mui/material';

const headers = [
    "User Name",
    "Bay (field No.)",
    "Session",
    "Start Time",
    "End Time",
    "Player(s)",
    "Member",
    "Guest(s)",
    "Action",
]

export default function All_bookings() {

    const { openSidebar, handle_get_all_user_bookings, all_users_booking_admin_view, cookieUser, set_booking_delete_id, openModal } = useStateContext();
    useEffect(() => {
        if (cookieUser) handle_get_all_user_bookings(cookieUser.id)
    }, [cookieUser]);

    function calculateTotalHours(startTime, endTime) {
        const start = new Date(`1970-01-01T${startTime.split("T")[1]}`);
        const end = new Date(`1970-01-01T${endTime.split("T")[1]}`);
        const timeDifference = end - start;

        // Convert milliseconds to hours
        const totalHours = timeDifference / (1000 * 60 * 60);

        return totalHours + " Hour(s)";
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

    const handle_delete = (id) => {
        set_booking_delete_id(id);
        openModal("delete_booking_modal")

    }

    return (
        <div className={`w-full h-[calc(100vh-60px)] overflow-y-auto ${openSidebar ? "px-[20px] md:px-[40px]" : "px-[80px]"} pt-24 lg:pt-6 transition-all duration-300`}>

            <TableContainer className='w-[400px] md:w-full overflow-x-auto' component={Paper}>
                <Table size="medium" aria-label="My Booking">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className='text-stone-500 font-semibold text-[13px]'
                            >
                                Date
                            </TableCell>
                            {headers.map((header, index) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    className='text-stone-500 font-semibold text-[13px]'
                                >
                                    {header}
                                </TableCell>
                            ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Boolean(all_users_booking_admin_view.length) &&
                            all_users_booking_admin_view.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell className='text-stone-500 whitespace-nowrap' component="th" scope="row" align="center">
                                        {row.start.split("T")[0]}
                                    </TableCell>
                                    <TableCell className='text-stone-500 capitalize whitespace-nowrap' component="th" scope="row" align="center">
                                        {row.username}
                                    </TableCell>
                                    <TableCell className='text-stone-500 whitespace-nowrap' align="center">{row.bay_field}</TableCell>
                                    <TableCell className='text-stone-500 whitespace-nowrap' align="center">{calculateTotalHours(row.start, row.end)}</TableCell>
                                    <TableCell className='text-stone-500 whitespace-nowrap' align="center">{row.start.split("T")[1]}</TableCell>
                                    <TableCell className='text-stone-500 whitespace-nowrap' align="center">{row.end.split("T")[1]}</TableCell>
                                    <TableCell className='text-stone-500 whitespace-nowrap' align="center">{row.players}</TableCell>
                                    <TableCell className='text-stone-500 whitespace-nowrap' align="center">{countMembers(row.title)}</TableCell>
                                    <TableCell className='text-stone-500 whitespace-nowrap' align="center">{countGuests(row.title)}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => handle_delete(row._id)}
                                            key={index} size='small'
                                            variant='outlined'
                                            color='error'
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}