import React from "react";

const Message = ({
    from = "meMessage",
    date = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text,
    color,
}) => {
    console.log(from)
    let cssProperties = {};
    if (color) cssProperties["--bubble-color"] = color;

    return (
        <div className="message">
        <div
            style={cssProperties}
            className={from === "meMessage" ? "myMessage" : "fromThem"}
            data-date={date}
        >
            <p>{text}</p>
            <span>
            {" "}
            {from === "meMessage" ? "You: " : `${from}: `} {date}{" "}
            </span>
        </div>
        </div>
    );
};

export default Message;