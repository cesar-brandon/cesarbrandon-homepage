"use client";

import React from "react";
import { motion } from "framer-motion";

type User = {
  name: string;
  username: string;
};

type Message = {
  user: User;
  text: string;
  createdAt?: string;
};

const _messages = [
  {
    user: {
      name: "Jose Manual Alberto",
      username: "josealberto",
    },
    text: "Hello Martin, 😱",
    createdAt: "18:00",
  },
  {
    user: {
      name: "Martin Jose",
      username: "martinjose",
    },
    text: "Hello Jose, how are you?",
    createdAt: "18:01",
  },
  {
    user: {
      name: "Jose Manual Alberto",
      username: "josealberto",
    },
    text: "I'm fine, thank you! And you?",
    createdAt: "18:02",
  },
  {
    user: {
      name: "Martin Jose",
      username: "martinjose",
    },
    text: "I'm fine too, thanks for asking! lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    createdAt: "18:03",
  },
];

const currentUser = {
  name: "Martin Jose",
  username: "martinjose",
};

export function MessageBubbles() {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    const detectTyping = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setText(text.slice(0, -1));
      } else if (e.key === "Enter") {
        _messages.push({
          user: currentUser,
          text: text,
          createdAt: new Date().toLocaleTimeString().slice(0, -3),
        });
        setText("");
      } else if (e.key === "spacebar") {
        setText(text + " ");
      } else {
        setText(text + e.key);
      }
    };

    window.addEventListener("keydown", detectTyping);

    return () => window.removeEventListener("keydown", detectTyping);
  }, [text]);

  const convertToDate = (date: Date) => {
    const day = date.getDate();
    const monthString = date.toLocaleString("default", { month: "short" });
    return `${monthString} ${day}, ${date.getFullYear()}`;
  };

  return (
    <main className="rtl w-full h-full flex flex-col gap-2 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-background
        flex items-center justify-between p-4 text-foreground z-10"
      >
        {convertToDate(new Date())}.
      </div>
      <div className="w-full flex flex-col gap-3 p-4 overflow-y-auto scroll-m-inline scroll-ps-6">
        {_messages.map((message, index) => (
          <Bubble key={index} message={message} />
        ))}
      </div>
      <div className="w-full h-[10rem] flex items-center justify-center">
        <Bubble
          message={{
            user: currentUser,
            text: text,
          }}
        />
      </div>
    </main>
  );
}

function Bubble({ message }: { message: Message }) {
  const isUser = message.user.username === currentUser.username;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative flex items-center gap-2 ${
        isUser ? "flex-row-reverse pr-3" : "pl-3"
      }`}
    >
      <div
        className={`rounded-2xl p-3 bg-foreground text-background ${
          isUser ? "bg-primary" : "bg-foreground dark:bg-secondary"
        }`}
      >
        <div className="flex justify-between gap-2">
          <p className="font-light w-[8rem] line-clamp-1">
            {isUser ? "You" : message.user.name}
          </p>
          {message.createdAt && (
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className={`h-4 w-4 ${
                  isUser
                    ? "text-secondary"
                    : "text-secondary dark:text-background"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-light">{message.createdAt}</span>
            </div>
          )}
        </div>
        <p className="font-semibold max-w-[20rem] overflow-hidden text-wrap">
          {message.text}
        </p>
      </div>
      <svg
        width="21"
        height="30"
        viewBox="0 0 21 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 absolute -bottom-1 ${
          isUser
            ? "fill-primary stroke-primary right-0 transform scale-x-[-1]"
            : "fill-foreground stroke-foreground dark:fill-secondary dark:stroke-secondary left-0"
        }`}
      >
        <path d="M1 29C7.40929 19.3056 8.82486 13.0687 11.5 2L20 23.5C14.9512 27.3216 10.6487 29.4568 1 29Z" />
      </svg>
    </motion.div>
  );
}
