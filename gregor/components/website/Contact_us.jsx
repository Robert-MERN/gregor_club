import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailIcon from '@mui/icons-material/Mail';
import styles from '@/styles/Home.module.css'
import useStateContext from '@/context/ContextProvider';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Footer from '../utilities/Footer';
import SubjectIcon from '@mui/icons-material/Subject';
import { Fade } from 'react-reveal';

const Contact_us = ({ user }) => {

    const { openSidebar, cookieUser } = useStateContext();

    const [formState, setFormState] = useState({
        email: '',
        fullName: '',
        subject: '',
        message: '',
        errors: {
            email: '',
            fullName: '',
            subject: '',
            message: '',
        },
    });


    const icons = [
        {
            icon: <CallIcon className='scale-75' />,
            name: "icon-1",
            desc: '1-800-555-0101',
            link: "tel:1-800-555-0101",
        },
        {
            icon: <TwitterIcon className='scale-75' />,
            name: "icon-2",
            desc: 'twitter.com/gpcgolf',
            link: "https://twitter.com/gpcgolf",
        },
        {
            icon: <InstagramIcon className='scale-75' />,
            name: "icon-3",
            desc: 'instagram.com/gpcgolf',
            link: "https://www.instagram.com/gpcgolf/",
        },
        {
            icon: <MailIcon className='scale-75' />,
            name: "icon-4",
            desc: 'info@gpcgolf.com',
            link: "mailto:info@gpcgolf.com",
        },
        {
            icon: <LocationOnIcon className='scale-75' />,
            name: "icon-5",
            desc: '169w. Clarkston Rd.Lake Orion, MI 48362',
            link: "https://goo.gl/maps/qHeMvKq2oMa6iDCy9",
        },
    ]
    const [hover, sethover] = useState({
        'icon-1': false,
        'icon-2': false,
        'icon-3': false,
    });
    // hover function
    const hoverIcon = (bool, key) => {
        sethover((prev) => ({ ...prev, [key]: bool }))
    }

    const validateField = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'email':
                if (!value) {
                    error = 'Please enter an email';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'fullName':
                if (!value) {
                    error = 'Please enter your name';
                } else if (value.length > 55) {
                    error = 'Is too long (maximum is 55 characters).'
                }
                break;
            case 'subject':
                if (!value) {
                    error = 'Please enter your phone';
                } else if (value.length > 16) {
                    error = 'Is too long (maximum is 16 characters).'
                }
                break;
            case 'message':
                if (!value) {
                    error = "can't be blank";
                }
                break;

            default:
                break;
        }
        return error;
    }

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const error = validateField(name, value);
        setFormState((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: error,
            },
        }));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        Object.keys(formState).forEach((fieldName) => {
            const error = validateField(fieldName, formState[fieldName]);
            if (error) {
                errors[fieldName] = error;
            }
        });
        setFormState((prevState) => ({
            ...prevState,
            errors,
        }));
        if (Object.values(errors).every((error) => !error)) {
            // Form is valid, submit it
            // ...

        }
    }


    return (
        <Fade duration={500} >
            <div className={`${styles.scrollBar} ${user ? "h-[calc(100vh-60px)]" : "h-screen"} overflow-y-scroll w-full`} >
                <div className={`w-full flex justify-center relativ px-[20px]  ${openSidebar ? "lg:px-[40px]" : "lg:px-[80px]"}  pt-24 ${cookieUser ? "lg:pt-6" : "lg:pt-24"} transition-all duration-300 ${styles.scrollBar}`} >

                    <div className='w-full flex items-center flex-col' >
                        <h1 className="text-stone-600 text-[26px] lg:text-[36px] font-medium text-center mb-1" >Have Some Quetion?</h1>
                        <p className='text-[13px] lg:text-[14px] text-stone-500 lg:w-[650px] text-center' >Thank you for your interest in our services please fill out the form below ore-mail us at <a className="text-blue-500" href="mailto:info@gpcgolf.com"> info@gpcgolf.com </a> and we'll get back to you promptly regarding your request.</p>

                        <div className='flex flex-col-reverse lg:flex-row w-full mt-12 md:mt-16 pb-[20px] lg:pb-[40px] gap-12 lg:gap-24' >
                            <div className="flex-1 flex flex-col gap-4 lg:items-start items-center w-full">
                                <p className="text-stone-600 text-[26px] font-medium border-b-2 border-stone-300 pb-3 w-full lg:text-start text-center">Get In Touch</p>
                                <div className='flex flex-col gap-3 mt-3' >
                                    {/* icons */}
                                    {
                                        icons.map((i, index) => (
                                            <a
                                                href={i.link}
                                                target="__blank"
                                                key={index}
                                                onMouseOver={() => hoverIcon(true, i.name)}
                                                onMouseLeave={() => hoverIcon(false, i.name)}
                                                className="flex gap-3 items-center">
                                                <div className={`w-[40px] h-[40px] relative rounded-full bg-glare overflow-hidden cursor-pointer border border-stone-400 ${styles.tapHighlight}`} >
                                                    <div className={`absolute inset-0 w-full h-full grid place-content-center text-stone-800 transition-all rounded-full duration-[400ms] ${hover[i.name] ? "opacity-0" : "opacity-100"}`} >
                                                        {i.icon}
                                                    </div>
                                                    <div className={`absolute inset-0 w-full h-full grid place-content-center text-white bg-blue-500  transition-all duration-[400ms] rounded-full ${hover[i.name] ? "scale-1" : "scale-0"}`} >
                                                        {i.icon}
                                                    </div>
                                                </div>
                                                <div className='text-stone-500 font-medium text-[15px] hover:text-stone-600 hover:underline' >
                                                    {i.desc}
                                                </div>
                                            </a>
                                        ))}
                                </div>
                            </div>
                            <div className="flex-1">
                                <form onSubmit={handleSubmit} className='w-full h-full border-gray-300 md:border rounded-xl md:p-6 flex flex-col gap-4' >
                                    <FormControl size="small">
                                        <OutlinedInput
                                            placeholder='Full Name*'
                                            name="fullName"
                                            error={Boolean(formState.errors.fullName)}
                                            value={formState.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <PersonOutlinedIcon className='text-stone-400 lg:scale-100 scale-75' />
                                                </InputAdornment>
                                            }
                                        />
                                        {formState.errors.fullName && <FormHelperText error>{formState.errors.fullName}</FormHelperText>}
                                    </FormControl>

                                    <FormControl size="small">
                                        <OutlinedInput
                                            placeholder='Subject*'
                                            name="subject"
                                            error={Boolean(formState.errors.subject)}
                                            value={formState.subject}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <SubjectIcon className='text-stone-400 lg:scale-100 scale-75' />
                                                </InputAdornment>
                                            }
                                        />
                                        {formState.errors.subject && <FormHelperText error>{formState.errors.subject}</FormHelperText>}
                                    </FormControl>

                                    <FormControl size="small">
                                        <OutlinedInput
                                            placeholder='Email*'
                                            name="email"
                                            error={Boolean(formState.errors.email)}
                                            value={formState.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <MailIcon className='text-stone-400 lg:scale-100 scale-75' />
                                                </InputAdornment>
                                            }
                                        />
                                        {formState.errors.email && <FormHelperText error>{formState.errors.email}</FormHelperText>}
                                    </FormControl>

                                    <FormControl>
                                        <OutlinedInput
                                            placeholder='Message*'
                                            name="message"
                                            error={Boolean(formState.errors.message)}
                                            value={formState.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            multiline
                                            rows={5}

                                        />
                                        {formState.errors.message && <FormHelperText error>{formState.errors.message}</FormHelperText>}
                                    </FormControl>

                                    <button type='submit' className='w-full py-[10px] rounded-md bg-blue-500 hover:bg-violet-500 active:bg-violet-400 transition-all text-white font-medium text-[14px]' >
                                        SEND MESSAGE
                                    </button>

                                    <p className='text-stone-400 text-[14px] leading-tight text-center mt-2 px-4' >
                                        Gregor doesn't sell, share or trade customer information your privacy is very important to us.
                                    </p>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                {!user &&
                    <div className='mt-12' >
                        <Footer />
                    </div>
                }
            </div>
        </Fade>


    )
}

export default Contact_us