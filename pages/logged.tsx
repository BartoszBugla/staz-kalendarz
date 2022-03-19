import type { NextPage } from "next";
import Head from "next/head";
import Calendar from "../components/calendar/calendar";
import LoginButton from "../components/loginButton";
import Modal from "../components/modal/modal";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Kalendarz</title>
      </Head>
      <Calendar />
      <Modal />
      <LoginButton init={true} />
    </div>
  );
};

export default Home;
