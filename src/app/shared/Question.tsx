'use client';
import { useEffect, useState, type ChangeEvent } from 'react';

// Define the User interface (matching your AuthContext)
interface User {
    id: number;
    name: string;
    school?: string;
    isAdmin: boolean;
}

// Define the Question data structure
interface QuestionData {
    ID: number;
    Question: string;
    number_answers: number;
    Answer?: number;
}

interface QuestionProps {
    qid: number;
    user: User;
    debug: boolean;
    phase: number;
}

function Question({ qid, user, debug, phase }: QuestionProps) {
    const [question, setQuestion] = useState<QuestionData | null>(null);
    const [answer, setAnswer] = useState<number | null>(null);
    const [sent, setSent] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(true);

    useEffect(() => {
        if (qid === -1) {
            setQuestion(null);
        } else {
            const fetchData = async () => {
                try {
                    // Logic for fetching question from server would go here
                    // const data: QuestionData = await request(`questions/${user.id}`, debug);
                    // setQuestion(data);
                    // setAnswer(data.Answer ?? null);
                    // setSaved(false);
                } catch (err) {
                    if (debug) console.error("Fetch error:", err);
                }
            };
            fetchData().then(() => {
                if (debug) console.log("Fetch done");
            });
        }
    }, [qid, user.id, debug]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (sent) {
            timer = setTimeout(() => { setSent(false); }, 2000);
        }
        return () => clearTimeout(timer);
    }, [sent]);

    // Automatically send a answer when phase changes from 4 (Active) to 3 (Get Ready/Paused)
    useEffect(() => {
        if (phase === 3 && !saved) {
            console.log("Sending answer after time done");
            sendAnswer();
        }
    }, [phase, saved]);

    const sendAnswer = async () => {
        if (answer === null) return;
        try {
            // const questionData = { uid: user.id, answer: answer };
            // await request(`Answer`, debug, false, questionData);
            setSent(true);
            setSaved(true);
        } catch (err) {
            if (debug) console.error("Send error:", err);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(parseInt(e.target.value));
        setSaved(false);
    };

    if (!question) return null;

    const startLetter = "A";

    if (phase === 4) {
        return (
            <div className="align-items-center center-self">
                {/* Note: In Next.js/TS, ensure the path to images is handled correctly via public folder or imports */}
                <img
                    alt="Question Task"
                    className="center-self question"
                    src={`/images/${question.Question}`}
                    key={question.ID}
                />
                {!user.isAdmin && (
                    <>
                        <div className="answer-container w-75">
                            {Array.from({ length: question.number_answers }, (_, i) => (
                                <label key={i}>
                                    {String.fromCharCode(startLetter.charCodeAt(0) + i)}){" "}
                                    <input
                                        type="radio"
                                        name="Answer"
                                        value={i}
                                        checked={answer === i}
                                        onChange={handleChange}
                                    />
                                </label>
                            ))}
                        </div>
                        <div>
                            {sent && <p>Answer Saved.</p>}
                            <button
                                className="btn center-self btn-success text-black mb-3 w-75"
                                disabled={answer === null}
                                onClick={sendAnswer}
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    if (phase === 3) {
        return (
            <h2 className="mx-auto text-center fs-lg-6 fs-md-5 w-lg-75">
                {user.isAdmin ? "Press next to proceed" : "Get Ready for next question"}
            </h2>
        );
    }

    return null;
}

export default Question;