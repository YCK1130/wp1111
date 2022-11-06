import { useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import styled, { css, keyframes } from "styled-components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "../hooks";
import axios from "../api";
import { useScoreCard } from "../hooks/useScoreCard";
import MyTable from "./MyTable";
import MyTab from "./MyTab";
const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
    min-width: 120px;
`;

const ContentPaper = styled(Paper)`
    height: 300px;
    padding: 1em;
    overflow: auto;
    animation: 1s ease-in;
    // width: 100%;
`;
const WrappedPaper = styled(Paper)`
    display: flex;
    flex-direction: row;
`;

const Title = styled(Paper)`
    padding: 0.5em;
    border-bottom: 5em;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;
const colorChange = (props) => keyframes`
    
    0% {color: black;opacity:0}
    25% {color: black;opacity:1}
    100% { color : ${props._color}}
    
`;
const MessageText = styled(Typography)(
    ({ _color }) => css`
        color: ${_color};
        animation: ${colorChange(_color)} 0.5s;
        // animation-delay: 0.25s;
    `
);
const Body = ({ studentData, setStudentData }) => {
    const classes = useStyles();

    const { messages, addCardMessage, addErrorMessage } = useScoreCard();

    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [score, setScore] = useState(0);

    const [queryType, setQueryType] = useState("Name");
    const [queryString, setQueryString] = useState("");
    const handleChange = (func) => (event) => {
        func(event.target.value);
    };

    const handleAdd = async () => {
        const {
            data: { message, card },
        } = await axios.post("/card", {
            name,
            subject,
            score,
        });
        console.log(message, card);
        if (!card) addErrorMessage(message);
        else addCardMessage(message);
        const {
            data: { dataSet },
        } = await axios.get("/student/data", {
            params: { queryString: name, query: "Name" },
        });
        console.log(dataSet);
        setStudentData(dataSet);
    };

    const handleQuery = async () => {
        console.log(queryType, queryString);
        // const {
        //     data: { messages, message },
        // } = await axios.get("/cards", {
        //     params: {
        //         type: queryType,
        //         queryString,
        //     },
        // });
        // if (!messages) addErrorMessage(message);
        // else addRegularMessage(...messages);

        const {
            data: { dataSet, message: msg },
        } = await axios.get("/student/data", {
            params: { queryString, query: queryType },
        });
        console.log(dataSet);
        if (msg) addErrorMessage(msg);
        setStudentData(dataSet);
    };

    return (
        <Wrapper>
            <MyTab titles={["Add", "Query"]}>
                <>
                    <Row>
                        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
                        <TextField
                            className={classes.input}
                            placeholder="Name"
                            value={name}
                            onChange={handleChange(setName)}
                        />
                        <TextField
                            className={classes.input}
                            placeholder="Subject"
                            style={{ width: 160 }}
                            value={subject}
                            onChange={handleChange(setSubject)}
                        />
                        <TextField
                            className={classes.input}
                            placeholder="Score"
                            value={score}
                            onChange={handleChange(setScore)}
                            type="number"
                        />
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            disabled={!name || !subject}
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </Row>
                    <WrappedPaper>
                        {studentData.length !== 0 ? (
                            <ContentPaper variant="outlined">
                                <MyTable
                                    titles={["Name", "Subject", "Score"]}
                                    dataSet={studentData}
                                ></MyTable>
                            </ContentPaper>
                        ) : null}
                        <ContentPaper
                            variant="outlined"
                            style={
                                studentData.length !== 0
                                    ? {}
                                    : { width: "100%" }
                            }
                        >
                            <Title>Message Console</Title>
                            {/* {messages.map((m, i) =>
                                i === messages.length - 1 ? null : (
                                    <Typography
                                        variant="body2"
                                        key={m + i}
                                        style={{ color: m.color }}
                                    >
                                        {m.message}
                                    </Typography>
                                )
                            )}
                            {messages[messages.length - 1] ? (
                                <MessageText
                                    variant="body2"
                                    key={messages[messages.length - 1]}
                                    _color={messages[messages.length - 1].color}
                                >
                                    {messages[messages.length - 1].message}
                                </MessageText>
                            ) : null} */}
                            {messages.map((m, i) => (
                                <Typography
                                    variant="body2"
                                    key={m + i}
                                    style={{ color: m.color }}
                                >
                                    {m.message}
                                </Typography>
                            ))}
                        </ContentPaper>
                    </WrappedPaper>
                </>
                <>
                    <Row>
                        <StyledFormControl>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    value={queryType}
                                    onChange={handleChange(setQueryType)}
                                >
                                    <FormControlLabel
                                        value="Name"
                                        control={<Radio color="primary" />}
                                        label="Name"
                                    />
                                    <FormControlLabel
                                        value="Subject"
                                        control={<Radio color="primary" />}
                                        label="Subject"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </StyledFormControl>
                        <TextField
                            placeholder="Query string..."
                            value={queryString}
                            onChange={handleChange(setQueryString)}
                            style={{ flex: 1, width: "370px" }}
                        />
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            disabled={!queryString}
                            onClick={handleQuery}
                        >
                            Query
                        </Button>
                    </Row>
                    <WrappedPaper>
                        {studentData.length !== 0 ? (
                            <ContentPaper variant="outlined">
                                <MyTable
                                    titles={["Name", "Subject", "Score"]}
                                    dataSet={studentData}
                                ></MyTable>
                            </ContentPaper>
                        ) : null}
                        <ContentPaper
                            variant="outlined"
                            style={
                                studentData.length !== 0
                                    ? {}
                                    : { width: "100%" }
                            }
                        >
                            <Title>Message Console</Title>
                            {messages.map((m, i) => (
                                <Typography
                                    variant="body2"
                                    key={m + i}
                                    style={{ color: m.color }}
                                >
                                    {m.message}
                                </Typography>
                            ))}
                        </ContentPaper>
                    </WrappedPaper>
                </>
            </MyTab>
        </Wrapper>
    );
};

export default Body;
