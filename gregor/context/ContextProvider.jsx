import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import cryptojs from "crypto-js";
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';


const StateContext = createContext();



export const ContextProvider = ({ children }) => {
    const router = useRouter();

    const [landing_page_form, set_landing_page_form] = useState("signin");



    const handle_landing_page_form = (target) => {
        set_landing_page_form(target);
    };


    const [openSidebar, setOpenSidebar] = useState(true);
    const handleSidebar = () => {
        setOpenSidebar(prev => !prev);
    }
    const [sidebarTabs, setSidebarTabs] = useState("Mail Sender");
    const switchSidebarTabs = (target) => {
        setSidebarTabs(target);
    }

    const defaultModals = {
        select_players_modal: false,
        edit_campaign_modal: false,
        logout_modal: false,
        subscription_status_modal: false,
        add_edit_guests_fees_modal: false,
        restrict_hours_modal: false,
        delete_booking_modal: false,
    };
    const [modals, setModals] = useState(defaultModals);
    const openModal = (key) => {
        setModals({ ...defaultModals, [key]: true });
    };
    const closeModal = (key) => {
        setModals({ ...defaultModals, [key]: false });
    };


    // loading state and error toastify for all api calls
    const [APIloading, setAPIloading] = useState(false);

    const toastConfig = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
    }


    // booking sessions for golf
    const default_fees_structure = {
        fees_structure: [
            {
                title: "fee_1_hour",
                guest_1: 10
            },
            {
                title: "fee_2_hour",
                guest_1: 20,
                guest_2: 35,
                guest_3: 45,
                guest_4: 55,
            },
            {
                title: "fee_4_hour",
                guest_1: 40,
                guest_2: 60,
                guest_3: 90,
                guest_4: 120,
            }
        ]
    }

    const [fees_structure, set_fees_structure] = useState(default_fees_structure)
    const [players_slots, set_players_slots,] = useState(null);
    const [selected_players, set_selected_players] = useState(null);
    const formatDateToISO = (dateObject) => {
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = dateObject.getDate().toString().padStart(2, '0');
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const seconds = dateObject.getSeconds().toString().padStart(2, '0');

        // Create the ISO 8601 formatted string
        const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        return isoString;
    };
    const [booking_date, set_booking_date] = useState(new Date());
    const [booking_date_for_admin, set_booking_date_for_admin] = useState(new Date());

    const [booked_events, set_booked_events] = useState([])
    const [bay_field, set_bay_field] = useState("bay-1")
    const [bay_field_for_admin, set_bay_field_for_admin] = useState("bay-1")
    const [snackbar_alert, set_snackbar_alert] = useState({
        open: false,
        message: "",
        severity: "warning"
    });



    // user retreived from cookies
    const [cookieUser, setCookieUser] = useState(null);


    // logging in api
    const handleLoginAPI = async (user, redirect_url) => {
        setAPIloading(true)
        try {
            const res = await axios.post("/api/login", user);
            router.push("/home");
            toast.success(res.data.message, { ...toastConfig, toastId: "loginSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "loginFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    // signing up api
    const [signupUser, setSignupUser] = useState(null);
    const handleSignupAPI = async (user) => {
        setAPIloading(true);
        try {
            const res = await axios.post("/api/signup", user);
            if (!user.adminAddingUser) router.push("/home");
            setSignupUser(null);
            deleteCookie("signupUser");
            toast.success(res.data.message, { ...toastConfig, toastId: "signupSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "signupFailure" });
            setSignupUser(null);
            deleteCookie("signupUser");
        } finally {
            setAPIloading(false)
        }
    }
    const [verificationCode, setVerificationCode] = useState("")

    const generateRandomNumber = () => {
        var minm = 100000;
        var maxm = 999999;
        return Math.floor(Math
            .random() * (maxm - minm + 1)) + minm;
    }

    const sendVerifyCodeToMail = async (KEY, email) => {
        const code6Digit = generateRandomNumber()
        setAPIloading(true)
        try {
            setVerificationCode(code6Digit.toString());
            // encryptingCode
            const encryptedCode = cryptojs.AES.encrypt(code6Digit.toString(), KEY).toString();

            const res = await axios.post("/api/sendAuthCode", { code: encryptedCode, email });
            toast.success(res.data.message, { ...toastConfig, toastId: "sendAuthCodeSuccess" });
        } catch (err) {
            setSignupUser(null);
            toast.error(err.response.data.message, { ...toastConfig, toastId: "sendAuthCodeFailure" });
            deleteCookie("signupUser");
        } finally {
            setAPIloading(false)
        }
    }


    // updating user api
    const handleUpdateUserAPI = async (obj, setUpdatingStatus, passwordStateRevert) => {
        setAPIloading(true);
        try {
            const res = await axios.put(`/api/updateUser/?userId=${cookieUser.id}`, {
                ...obj,
                _id: cookieUser.id,
            });
            passwordStateRevert();
            setUpdatingStatus(false);
            setCookieUser(res.data.updatedUser);
            toast.info(res.data.message, { ...toastConfig, toastId: "userUpdateSuccesfull" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "userUpdateFailure" });
        } finally {
            setAPIloading(false);
        }
    };



    // sending Mail API
    const handleSendingMail = async (data, reverse_states) => {
        setAPIloading(true)
        try {
            const res = await axios.post("/api/sendMail", data);
            toast.success(res.data.message, { ...toastConfig, toastId: "sendMailSuccess" });
            reverse_states();
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "sendMailFailure" });
        } finally {
            setAPIloading(false)
        }
    }








    // Get All Bookings for view API
    const handle_get_all_bookings = async (userId, bay, calendar_date) => {
        setAPIloading(true)
        try {
            const res = await axios.get(`/api/get_all_bookings?bay_field=${bay}&userId=${userId}&calendar_date=${calendar_date ? formatDateToISO(calendar_date).substring(0, 10) : ""}`);
            set_booked_events(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "getAllBookingsFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    // Get Only User Bookings API
    const handle_get_user_bookings = async (setState, userId) => {
        setAPIloading(true);
        try {
            const res = await axios.get(`/api/get_user_bookings?userId=${userId}`);
            setState(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "getUserBookingsFailure" });
        } finally {
            setAPIloading(false);
        }
    }

    // Get All Users Bookings API for Admin- view

    const [all_users_booking_admin_view, set_all_users_booking_admin_view] = useState([])
    const handle_get_all_user_bookings = async (userId) => {
        setAPIloading(true);
        try {
            const res = await axios.get(`/api/get_all_users_bookings?userId=${userId}`);
            set_all_users_booking_admin_view(res.data);
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "getAllBookingsFailure" });
        } finally {
            setAPIloading(false);
        }
    }

    // Delete User Bookings - Only Admin - API
    const [booking_delete_id, set_booking_delete_id] = useState("")
    const handle_delete_user_booking_admin = async (bookingId, userId) => {
        setAPIloading(true);
        try {
            const res = await axios.get(`/api/delete_user_booking?userId=${userId}&bookingId=${bookingId}`);
            toast.info(res.data.message, { ...toastConfig, toastId: "deleteUserBookingSuccess" });
            handle_get_all_user_bookings(cookieUser.id)
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "deleteUserBookingsFailure" });
        } finally {
            setAPIloading(false);
        }
    }

    // Creating and Validating Booking API
    const handle_create_booking = async (data, restriction) => {
        setAPIloading(true)
        try {
            const res = await axios.post(`/api/validate-booking`, data);

            if (res.data.status) {
                const res = await axios.post(`/api/create-event?restriction=${Boolean(restriction)}&requesterId=${cookieUser.id}`, data);
                if (res.data.status) {
                    handle_get_all_bookings(cookieUser.id, bay_field, booking_date);
                    return toast.success(res.data.message, { ...toastConfig, toastId: "createBookingSuccess" });
                }
                return set_snackbar_alert({
                    open: true,
                    message: res.data.message,
                });
            }
            return set_snackbar_alert({
                open: true,
                message: res.data.message,
            })
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "createBookingFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    // handle update guests fees
    const handle_update_guests_fees = async (id, data, create) => {
        setAPIloading(true)
        try {
            const res = await axios.post(`/api/update_guests_fees?userId=${id}&create=${create}`, data);
            set_fees_structure(res.data.data);
            toast.info(res.data.message, { ...toastConfig, toastId: "updateGuestsFees" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "updateGuestsFees" });
        } finally {
            setAPIloading(false);
        }
    }

    // handle get guests's fees
    const handle_get_guests_fees = async (userId, range_hour) => {
        setAPIloading(true)
        try {
            const res = await axios.get(`/api/get_guests_fees?userId=${userId}&range_hour=${range_hour}`);
            if (range_hour) {
                set_players_slots(res.data)
            } else {
                set_fees_structure(res.data);
            }
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "get_guests_fees_failure" });
        } finally {
            setAPIloading(false)
        }
    }


    // user subscription check
    const [subStatus, setSubStatus] = useState(false);
    const [restrictedEvent, setRestrictedEvent] = useState("");
    const handleSubscriptionVerify = async (preventLoop) => {
        setAPIloading(true);
        try {
            const res = await axios.post("/api/userSubscriptionVerification", { id: cookieUser.id });
            setSubStatus(res.data.message);
            if (res.data.updatedUser) {
                preventLoop(true);
                setCookieUser(res.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "userSusbscriptionVerifyFail" });
        } finally {
            setAPIloading(false);
        }

    }


    return (
        <StateContext.Provider
            value={{

                landing_page_form, handle_landing_page_form,

                handleSidebar, openSidebar, switchSidebarTabs, sidebarTabs,

                setSignupUser, signupUser, handleSignupAPI, sendVerifyCodeToMail, verificationCode, setVerificationCode,
                handleLoginAPI, handleUpdateUserAPI,

                handleSubscriptionVerify, subStatus, setSubStatus, restrictedEvent, setRestrictedEvent,

                APIloading, setAPIloading, setCookieUser, cookieUser,

                handleSendingMail,

                modals, openModal, closeModal,

                handle_update_guests_fees, handle_get_guests_fees, fees_structure, set_fees_structure, players_slots, handle_get_user_bookings,
                handle_get_all_user_bookings, handle_delete_user_booking_admin,
                booking_delete_id, set_booking_delete_id, all_users_booking_admin_view,


                selected_players, set_selected_players, booked_events,
                handle_create_booking, handle_get_all_bookings,
                set_booked_events, booking_date, set_booking_date,
                bay_field, set_bay_field, snackbar_alert, set_snackbar_alert,
                bay_field_for_admin, set_bay_field_for_admin, booking_date_for_admin, set_booking_date_for_admin



            }}
        >
            {children}
        </StateContext.Provider >
    )
}

const useStateContext = () => useContext(StateContext);
export default useStateContext;