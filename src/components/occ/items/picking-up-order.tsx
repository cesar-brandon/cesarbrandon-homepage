"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";

export function PickingUpOrder() {
  const [isCalling, setIsCalling] = useState(false);
  const [isMessaging, setIsMessaging] = useState(false);

  const handleCall = () => {
    setIsCalling(!isCalling);
    setIsMessaging(false);
  };

  const handleMessage = () => {
    setIsMessaging(!isMessaging);
    setIsCalling(false);
  };

  return (
    <div className="relative flex flex-col h-52 min-[430px]:h-40 w-[80%] bg-background border rounded-3xl p-5 mt-10">
      <div className="flex flex-col justify-center gap-4">
        <p className="text-sm text-primary">Picking up order</p>
        <DeliveryProgressBar />
        <div className="flex  flex-col min-[430px]:flex-row justify-between items-center gap-4">
          <div className="flex w-full items-center">
            <img
              src="https://randomuser.me/api/portraits/women/63.jpg"
              alt="user"
              className="w-7 h-7 rounded-full"
            />
            <p className="text-xs ml-2">Sara Doe</p>
          </div>
          <div className="flex items-center w-full gap-4">
            <button
              className={`group/occ flex items-center justify-center w-full h-8 rounded-full ${
                isCalling
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-secondary dark:bg-muted"
              }`}
              onClick={handleCall}
              name="call"
            >
              <PhoneIcon isCalling={isCalling} />
            </button>
            <button
              className="group/occ flex items-center justify-center w-full h-8 rounded-full bg-secondary dark:bg-muted"
              onClick={handleMessage}
              name="message"
            >
              <ChatBubbleIcon isMessaging={isMessaging} />
            </button>
          </div>
        </div>
      </div>
      <DeliveryCall isCalling={isCalling} />
      <DeliveryChat isMessaging={isMessaging} />
    </div>
  );
}

export function DeliveryProgressBar() {
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev === 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-between w-full">
      <div className="absolute left-1 w-[98%] bg-primary-muted rounded-full z-[1]">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="w-7 h-7 rounded-full bg-primary p-1 z-[2]">
        <BoxIcon className="fill-white stroke-primary" />
      </div>
      <div
        className={`relative w-7 h-7 rounded-full p-1 z-[2] overflow-hidden transition-colors duration-300 ${
          progress > 48 ? "bg-primary" : "bg-primary-muted"
        }`}
      >
        <CarIcon
          className={`transition-colors duration-300 ${
            progress > 48
              ? "fill-white stroke-primary"
              : "fill-primary stroke-primary-muted"
          }`}
        />
      </div>
      <div
        className={`w-7 h-7 rounded-full p-[0.3rem] z-[2] overflow-hidden transition-colors duration-300 ${
          progress > 95 ? "bg-primary" : "bg-primary-muted"
        }`}
      >
        <HomeIcon
          className={`transition-colors duration-300 ${
            progress > 95 ? "fill-white" : "fill-primary"
          }`}
        />
      </div>
    </div>
  );
}

export function DeliveryCall({ isCalling }: { isCalling: boolean }) {
  const [callingTime, setCallingTime] = useState(0);

  useEffect(() => {
    if (isCalling) {
      const interval = setInterval(() => {
        setCallingTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCalling]);

  const timer = `${Math.floor(callingTime / 60)}:${
    callingTime % 60 < 10 ? `0${callingTime % 60}` : callingTime % 60
  }`;

  return (
    <motion.div
      animate={{
        y: isCalling ? 90 : 0,
        zIndex: isCalling ? 1 : -1,
      }}
      className="absolute bottom-0 left-0 flex items-center justify-between gap-4 h-20
      w-full bg-background border rounded-3xl p-5 z-[-1]"
    >
      <AudioSpectrum />
      <span className="w-1/2 text-sm text-foreground dark:text-secondary text-center">
        {timer}
      </span>
    </motion.div>
  );
}

export function DeliveryChat({ isMessaging }: { isMessaging: boolean }) {
  const [message, setMessage] = useState({
    text: "",
    isSent: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage({ text: e.target.value, isSent: false });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage({ ...message, isSent: true });
    setTimeout(() => {
      setMessage({ text: "", isSent: false });
    }, 1000);
  };

  return (
    <motion.div
      animate={{
        y: isMessaging ? 90 : 0,
        zIndex: isMessaging ? 1 : -1,
      }}
      className="absolute bottom-0 left-0 flex flex-col justify-center gap-4 h-20 w-full bg-background border rounded-3xl p-5 z-[-1]"
    >
      <form onSubmit={handleSubmit} className="flex justify-between gap-4">
        <input
          type="text"
          value={message.isSent ? "" : message.text}
          className="w-3/4 h-8 p-2 rounded-lg bg-background border-b text-sm text-foreground dark:text-secondary placeholder:text-sm outline-none"
          onChange={handleChange}
          placeholder="Type a message"
          disabled={message.isSent}
        />
        <button
          className={`flex items-center justify-center w-28 h-8 rounded-full transition-colors duration-300 ${
            message.text.length > 0 ? "bg-primary" : "bg-input"
          }`}
          type="submit"
          disabled={message.text.length === 0}
        >
          <SendIcon text={message.text} />
        </button>
      </form>

      <motion.span
        animate={{
          opacity: message.isSent ? 1 : 0,
        }}
        className="absolute opacity-0 -bottom-10 text-xs text-foreground/60 dark:text-secondary"
      >
        Message sent · {message.text.length} characters
      </motion.span>
    </motion.div>
  );
}

export const BoxIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

export const CarIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

export const HomeIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
  </svg>
);

export const PhoneIcon = ({ isCalling }: { isCalling: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-5 h-5 transition-fill duration-150 ${
      isCalling
        ? "fill-background dark:fill-foreground"
        : "fill-foreground/40 group-hover/occ:fill-foreground dark:group-hover/occ:fill-accent"
    }`}
  >
    <path
      fillRule="evenodd"
      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export const ChatBubbleIcon = ({ isMessaging }: { isMessaging: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-5 h-5 transition-fill duration-150 ${
      isMessaging
        ? "fill-foreground dark:fill-secondary"
        : "group-hover/occ:fill-foreground fill-foreground/40 dark:group-hover/occ:fill-accent"
    }`}
  >
    <path
      fillRule="evenodd"
      d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
      clipRule="evenodd"
    />
  </svg>
);

export const SendIcon = ({ text }: { text: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 transition-colors duration-300 ${
      text.length > 0 ? "fill-white" : "fill-foreground/40"
    }`}
  >
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

export const AudioSpectrum = () => {
  const container = {
    up: { height: "28px" },
    down: { height: "4px" },
  };

  const renderMotionSpan = (delay: number) => (
    <motion.span
      variants={container}
      initial="down"
      animate="up"
      transition={{
        delay: delay,
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="w-2 h-5 bg-primary rounded-sm"
    />
  );

  const elements = [0, 0.3, 0.45, 0, 0.3, 0.45];

  return (
    <div className="relative flex items-center gap-2 mx-auto">
      {elements.map((element, index) => (
        <React.Fragment key={index}>{renderMotionSpan(element)}</React.Fragment>
      ))}
    </div>
  );
};
