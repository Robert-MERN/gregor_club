import Head from 'next/head'
import Navbar from '@/components/utilities/Navbar'
import styles from '@/styles/Home.module.css'
import Landing_page from '@/components/Landing_page'






export default function Home() {
  return (
    <div className={`w-screen h-fit relative ${styles.container}`} >
      <Head>
        <title>Gregor Private Club - GPC Golf</title>
        <meta name="description" content="Gregor Private Club - GPC Golf" />
        <link rel="icon" href="/images/icon_logo.png" />
      </Head>
      <Navbar />
      <Landing_page  />
    </div>
  )
}


