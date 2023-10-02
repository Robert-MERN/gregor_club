import Head from 'next/head'
import Navbar from '@/components/utilities/Navbar'
import styles from '@/styles/Home.module.css'
import { getCookie } from "cookies-next"
import Signup_auth from '@/components/auth_pages/forms_auth/Signup_auth'






export default function Home({ CJS_KEY }) {
    return (
        <div className={`w-screen h-fit relative ${styles.container}`} >
            <Head>
                <title>Gregor Private Club - GPC Golf</title>
                <meta name="description" content="Gregor Private Club - GPC Golf" />
                <link rel="icon" href="/images/icon_logo.png" />
            </Head>
            <Navbar />
            <Signup_auth CJS_KEY={CJS_KEY} />
        </div>
    )
}


export const getServerSideProps = async function ({ req, res }) {
    const userToken = getCookie("userAccountToken", { req, res });
    if (userToken) {
        return {
            redirect: {
                destination: '/home',
                permanent: true,
            },
        }
    }
    return { props: { message: "not signed up", CJS_KEY: process.env.CJS_KEY } }

}