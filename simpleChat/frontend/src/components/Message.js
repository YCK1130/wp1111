import styled from "styled-components";
import { Tag } from "antd";
const MsgDIV = styled.p``;
const Message = ({ name, body, user }) => {
    const hi = name === user ? console.log(`${user},${name}`) : null;
    return (
        <MsgDIV>
            <Tag
                color="blue"
                style={name === user ? { alignSelf: "self-end" } : {}}
            >
                {name}
            </Tag>{" "}
            {body}
        </MsgDIV>
    );
};
export default Message;
