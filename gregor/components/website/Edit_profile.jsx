import React, { useState, useEffect, useMemo } from 'react'
import Image from "next/image";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import unknown from "@/public/images/unknown.jpg"
import useStateContext from '@/context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import styles from "@/styles/Home.module.css";

const Edit_profile = () => {
    const {
        anchorEl,
        openTimeZonePopover,
        closeTimeZonePopover,
        selectedZone,
        language,
        handleUpdateUserAPI,
        setLanguage,
        openModal,
        cookieUser,
    } = useStateContext();

    const [values, setValues] = useState({
        fullName: "",
        welcomeMessage: "",
        language: "",
        timeZone: "",
        country: "",
    });

    const defaultPasswordState = {
        changePassword: false,
        oldPassword: "",
        password: "",
        confirmPassword: "",
        showOldPassword: false,
        showPassword: false,
        showConfirmPassword: false,
        errors: {
            password: "",
            confirmPassword: "",
            oldPassword: "",
        }
    }
    const [passwordState, setPasswordState] = useState(defaultPasswordState);
    // change Password Switch
    const changePasswordSwitch = () => {
        setPasswordState(prev => ({
            changePassword: !prev.changePassword,
            oldPassword: "",
            password: "",
            confirmPassword: "",
            showOldPassword: false,
            showPassword: false,
            showConfirmPassword: false,
            errors: {
                password: "",
                confirmPassword: "",
                oldPassword: "",
            }
        }));
    }
    const passwordStateRevert = () => {
        setPasswordState(defaultPasswordState);
    }
    // password patterns
    const lowercasePattern = /[a-z]/;
    const uppercasePattern = /[A-Z]/;
    const lengthPattern = /^.{8,55}$/;

    // passowrds visibility turn On/Off function
    const handleClickShowPassword = (prop) => {
        setPasswordState(prev => ({
            ...prev,
            [prop]: !prev[prop],
        }));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // form validation
    const validateForm = (fieldName, value) => {
        let error = "";
        switch (fieldName) {
            case "fullName":
                if (!value) {
                    error = "Please complete your full name."
                }
                break;
            case "welcomeMessage":
                if (!value) {
                    error = "Please type your welcome message."
                }
                if (value.length > 120) {
                    error = "Welcome message should not exceed 120 chars."
                }
                break;
            case "language":
                if (!value) {
                    error = "Please select any language."
                }
                break;
            case "timeZone":
                if (!value) {
                    error = "Please select your time zone."
                }
                break;
            case "country":
                if (!value) {
                    error = "Please select the country."
                }
                break;
            case "city":
                if (!value) {
                    error = "Please select the city."
                }
                break;
            case "password":
                if (!value) {
                    error = 'Please enter a password';
                } else {
                    if (!lowercasePattern.test(value)) {
                        error = 'Password must contain at least 1 lowercase letter';
                    }
                    if (!uppercasePattern.test(value)) {
                        error = 'Password must contain at least 1 uppercase letter';
                    }
                    if (!lengthPattern.test(value)) {
                        error = 'Password must be between 8 and 55 characters long';
                    }
                }
                break;
            case "confirmPassword":
                if (!value) {
                    error = 'Please enter a confirm password';
                } else if (value && value !== passwordState.password) {
                    error = 'Confirmed password is wrong'
                }
                break;
            case "oldPassword":
                if (!value) {
                    error = 'Please enter your old password';
                }
                break;
        }
        return error;
    }

    const [updatedValues, setUpdatedValues] = useState({
        errors: {
            fullName: "",
            welcomeMessage: "",
            language: "",
            timeZone: "",
            country: "",
        }
    })
    useEffect(() => {
        if (cookieUser) {
            setValues({
                fullName: cookieUser.fullName,
                welcomeMessage: cookieUser.welcomeMessage,
                language: cookieUser.language,
                timeZone: cookieUser.timeZone,
                country: cookieUser.country,
            })
        }
    }, [cookieUser])
    const [updatingStatus, setUpdatingStatus] = useState(false) // it's gonna show if user has updated smth.

    // handling input blur
    const handleBlur = (target) => (event) => {
        const { name, value } = event.target;
        const error = validateForm(name, value);
        if (target === "password") {
            setPasswordState((prevState) => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [name]: error,
                },
            }));
        } else {
            setUpdatedValues((prevState) => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [name]: error,
                },
            }));
        }
    }

    // handling states
    const handleChange = (target) => (e) => {
        const { value, name } = e.target;
        setUpdatingStatus(true);
        if (target === "password") {
            setPasswordState(prev => ({ ...prev, [name]: value }));
        } else {
            if (cookieUser[name] === value) {
                const copyUpdateValues = { ...updatedValues }
                delete copyUpdateValues[name];
                setUpdatedValues(copyUpdateValues);
            } else {
                setUpdatedValues(prev => ({ ...prev, [name]: value }));
            }
            setValues(prev => ({ ...prev, [name]: value }));
        }
    }

    // canceling update
    const cancelUpdate = () => {
        setUpdatingStatus(false);
        setValues({
            fullName: cookieUser.fullName,
            language: "english",
            country: "pakistan",
        });
        setPasswordState({
            changePassword: "",
            oldPassword: "",
            password: "",
            confirmPassword: "",
            showOldPassword: false,
            showPassword: false,
            showConfirmPassword: false,
            errors: {
                password: "",
                confirmPassword: "",
                oldPassword: "",
            }
        });
        setUpdatedValues({
            errors: {
                fullName: "",
                welcomeMessage: "",
                language: "",
                timeZone: "",
                country: "",
            }
        });
    }

    // submitting updated form of user
    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {}
        let errors2 = {}

        Object.keys(updatedValues).forEach(each => {
            let error = validateForm(each, values[each]);
            if (error) {
                errors[each] = error;
            }
        });
        Object.keys(passwordState).forEach(each => {
            let error = validateForm(each, passwordState[each]);
            if (error && passwordState.changePassword) {
                errors2[each] = error;
            }
        });

        setUpdatedValues(prev => ({
            ...prev,
            errors: { ...prev.errors, ...errors }
        }));

        if (passwordState.changePassword) {
            setPasswordState(prev => ({
                ...prev,
                errors: { ...prev.errors, ...errors2 }
            }));
        };
        if (Object.values({ ...errors, ...errors2 }).every(e => !e)) {
            const { errors, ...restUpdatedValues } = updatedValues;
            let updateObj = restUpdatedValues
            if (passwordState.changePassword) {
                const { password, oldPassword } = passwordState
                updateObj = { ...updateObj, password, oldPassword }
            }
            handleUpdateUserAPI(updateObj, setUpdatingStatus, passwordStateRevert);
        }

    }
    useEffect(() => {
        if (cookieUser) {
            const { errors, ...rest } = updatedValues;
            if (Object.keys(rest).every(each => cookieUser[each] === updatedValues[each]) && !passwordState.changePassword) {
                setUpdatingStatus(false);
            }
        }
    }, [updatedValues, passwordState.changePassword]);

    return (

        <div className={`w-full h-[calc(100vh-60px)] flex justify-center overflow-y-auto px-[20px] ${styles.scrollBar}`} >
            {cookieUser &&
                <form onSubmit={handleSubmit} className='w-full lg:w-[450px] flex flex-col items-center gap-5 md:gap-6 pt-24 lg:pt-6 mb-6' >
                    <Image src={unknown} alt="user" className='object-cover rounded-full w-[100px] border-4 border-stone-300' />

                    {/* user fullname input */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[13px] md:text-[14px]`}
                        >
                            Name
                        </label>
                        <FormControl
                            className='w-full'
                            size="small"

                        >
                            <TextField
                                size='small'
                                className='w-full mt-1 md:mt-2'
                                name="fullName"
                                value={values.fullName}
                                onChange={handleChange()}
                                onBlur={handleBlur()}
                                error={Boolean(updatedValues.errors.fullName)}
                                helperText={updatedValues.errors.fullName}
                                placeholder="Name"
                            />
                        </FormControl>
                    </div>


                    {/* language input */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[13px] md:text-[14px]`}
                        >
                            Language
                        </label>
                        <FormControl
                            className='w-full mt-1 md:mt-2'
                            size='small'
                        >
                            <Select
                                value={values.english}
                                name="language"
                                onChange={(e) => { handleChange()(e); setLanguage(e.target.value) }}
                                onBlur={handleBlur()}
                                error={Boolean(updatedValues.errors.language)}
                            >
                                <MenuItem value="english">English</MenuItem>
                                <MenuItem value={"spanish"}>Spanish</MenuItem>
                            </Select>
                            {updatedValues.errors.language && <FormHelperText error>{updatedValues.errors.language}</FormHelperText>}
                        </FormControl>
                    </div>

                    {/* country input */}
                    <div className='w-full' >
                        <label
                            htmlFor=""
                            className={`text-stone-800 font-bold text-[13px] md:text-[14px]`}
                        >
                            Country
                        </label>
                        <FormControl
                            className='w-full mt-1 md:mt-2'
                            size='small'
                        >
                            <Select
                                name="country"
                                value={"random"}
                                onChange={handleChange()}
                                onBlur={handleBlur()}
                                error={Boolean(updatedValues.errors.country)}
                            >

                                <MenuItem value={"random"}>random</MenuItem>

                            </Select>
                            {updatedValues.errors.country && <FormHelperText error>{updatedValues.errors.country}</FormHelperText>}
                        </FormControl>
                    </div>




                    <div className='w-full'>
                        <button
                            type='button'
                            onClick={changePasswordSwitch}
                            className={`${passwordState.changePassword ? "text-red-500" : "text-blue-600"} 
                                font-semibold underline text-[15px] font-sans`}
                        >
                            {passwordState.changePassword ?
                                "Don't Change Password."
                                :
                                "Change Password."
                            }
                        </button>
                    </div>

                    {passwordState.changePassword &&
                        <>
                            {/* Old password */}
                            <div className='w-full' >
                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[13px] md:text-[14px]`}
                                >
                                    Old password
                                </label>
                                <FormControl
                                    className='w-full mt-1 md:mt-2'
                                    variant="outlined"
                                    size='small'
                                >
                                    <OutlinedInput
                                        name="oldPassword"
                                        error={Boolean(passwordState.errors.oldPassword)}
                                        value={passwordState.oldPassword}
                                        onChange={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        type={passwordState.showOldPassword ? 'text' : 'password'}
                                        placeholder="Old password"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword('showOldPassword')}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {passwordState.showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {passwordState.errors.oldPassword && <FormHelperText error>{passwordState.errors.oldPassword}</FormHelperText>}
                                </FormControl>
                            </div>
                            {/* New Password */}
                            <div className='w-full' >
                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[13px] md:text-[14px]`}
                                >
                                    New Password
                                </label>
                                <FormControl
                                    className='w-full mt-1 md:mt-2'
                                    variant="outlined"
                                    size='small'
                                >
                                    <OutlinedInput
                                        name="password"
                                        error={Boolean(passwordState.errors.password)}
                                        value={passwordState.password}
                                        onChange={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        type={passwordState.showPassword ? 'text' : 'password'}
                                        placeholder="New password"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword('showPassword')}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {passwordState.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {passwordState.errors.password && <FormHelperText error>{passwordState.errors.password}</FormHelperText>}
                                </FormControl>
                            </div>
                            {/* confirm Passwords */}
                            <div className='w-full' >
                                <label
                                    htmlFor=""
                                    className={`text-stone-800 font-bold text-[13px] md:text-[14px]`}
                                >
                                    Confirm Password
                                </label>
                                <FormControl
                                    className='w-full mt-1 md:mt-2'
                                    variant="outlined"
                                    size='small'
                                >
                                    <OutlinedInput
                                        name="confirmPassword"
                                        error={Boolean(passwordState.errors.confirmPassword)}
                                        value={passwordState.confirmPassword}
                                        onChange={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        type={passwordState.showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"


                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword('showConfirmPassword')}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {passwordState.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {passwordState.errors.confirmPassword && <FormHelperText error>{passwordState.errors.confirmPassword}</FormHelperText>}
                                </FormControl>
                            </div>
                        </>
                    }

                    {/* Footer buttons */}
                    <div className='flex justify-between w-full pb-[20px] lg:pb-[40px]' >
                        <div className='flex gap-2 md:gap-4' >
                            <button
                                type='submit'
                                disabled={!updatingStatus}
                                className={`${updatingStatus ?
                                    "border-violet-700 bg-violet-700 hover:opacity-80"
                                    :
                                    "border-violet-300 bg-violet-300"
                                    }
                                border rounded-md px-[18px] py-[6px] text-white text-[12px] md:text-[14px] transition-all`} >
                                Save changes
                            </button>
                            <button
                                type='button'
                                disabled={!updatingStatus}
                                onClick={cancelUpdate}
                                className={`border  rounded-md px-[18px] py-[6px] text-[12px] md:text-[14px]  transition-all ${updatingStatus ? "text-zinc-700 border-stone-400 hover:bg-stone-200" : "text-stone-400 border-stone-300"}`} >
                                Cancel
                            </button>
                        </div>
                        <button type='button' onClick={() => openModal("logout")} className='border border-red-500 bg-red-500 rounded-md px-[18px] py-[5px] text-white text-[12px] md:text-[14px] hover:opacity-80 transition-all' >
                            Logout
                        </button>
                    </div>

                    {/* <input dir="ltr" type="text" inputmode="numeric" placeholder="MM / YY" autocomplete="billing cc-exp" />
      <input dir="ltr" type="text" inputmode="numeric" placeholder="1234 1234 1234 1234" autocomplete="billing cc-number" /> */}
                </form>
            }
        </div>
    )
}

export default Edit_profile