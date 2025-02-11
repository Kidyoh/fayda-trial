"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import ShowResult from "../show_result";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../../../../../lib/tokenManager";

export default function AssessmentQuestions({ params }: any) {
  const accessToken = getAccessToken();

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [totalQuestionCounts, setTotalQuestionsCounts] = useState("");

  //const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [onExam, setOnExam] = useState(true);
  const [resultText, setResultText] = useState("");
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [questions, setQuestions] = useState<any>([]);

  //const [videoLocation, setVideoLocation] = useState("");
  // const params = useParams();
  //console.log(params);
  const AssessmentId = params.assessment_id;

  const countNullValues = (arr: any[]): number => {
    let count = 0;
    for (const value of arr) {
      if (value === undefined) {
        count++;
      }
    }
    return count;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("print from submit");
    console.log("selected answers: " + selectedAnswers.length);
    console.log("total q: " + totalQuestionCounts);
    console.log("check: " + selectedAnswers[1]);
    console.log("count: " + countNullValues(selectedAnswers));

    if (
      parseInt(totalQuestionCounts) == selectedAnswers.length &&
      countNullValues(selectedAnswers) == 0
    ) {
      try {
        const response = await axios.post(
          `${apiUrl}/assesments/submit-answers/${AssessmentId}`,
          {
            answers: selectedAnswers,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
            },
          }
        );
        const responseData = response.data; // Extract the response data
        console.log("Response message:", responseData.message);
        // Access the message property
        // console.log("response: " + response.message);
        if (response.status === 200) {
          // Handle successful submission
          setResultText(responseData.message);
          setOnExam(false);
          setIncorrectQuestions(responseData.incorrectQuestionNumbers);
          console.log("Assessment answers submitted successfully!");
          // Clear answers, display feedback, etc.
        } else {
          // Handle error
          console.error("Submission failed:", response.statusText);
          // Display error message to the user
        }
        // Handle successful submission (e.g., clear answers, display feedback)
      } catch (error) {
        // Handle errors
      }
    } else {
      toast({
        title: `Faild!`,
        description: `There are questions remaining!`,
      });
    }
  };

  const automaticSubmit = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/assesments/submit-answers/${AssessmentId}`,
        {
          answers: selectedAnswers,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
          },
        }
      );
      const responseData = response.data; // Extract the response data
      console.log("Response message:", responseData.message);
      // Access the message property
      // console.log("response: " + response.message);
      if (response.status === 200) {
        // Handle successful submission
        setResultText(responseData.message);
        setOnExam(false);
        console.log("Assessment answers submitted successfully!");
        // Clear answers, display feedback, etc.
      } else {
        // Handle error
        console.error("Submission failed:", response.statusText);
        // Display error message to the user
      }
      // Handle successful submission (e.g., clear answers, display feedback)
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `${apiUrl}/purchaselist/specificStudentSingleAssessment/${AssessmentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
            Authorization: `Bearer ${accessToken}`,
            //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0MGQ3N2Q1LTBhNmItNDBiZS1hNGM4LWE4YTc1Y2VkYmNlMiIsImlhdCI6MTczOTE5NjMzNX0.uRKepGAgauqigF6aUV8ye8Fyq0DMh5JQgavicGYYeQE
          },
        }
      )
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
          console.log("Data: " + jsonData);
          setSeconds(jsonData[0].duration * 60);
          setTotalQuestionsCounts(jsonData[0].question.length);
          setQuestions(jsonData[0].question);

          //  setVideoLocation(jsonData[0].location);
          //  console.log(jsonData[0].Courses.materials);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    let timerId: any; // Store the timer ID

    timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    const formattedTime = formatTime(seconds);
    if (formattedTime === "00:01") {
      console.log("Countdown reached 00:00!");
      {
        automaticSubmit();
      }
      clearInterval(timerId); // Stop the timer
    }

    // Cleanup on unmount (only clears if still running)
    return () => clearInterval(timerId);
  }, [seconds]);

  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // const handleAnswerSelection = (questionIndex: any, answerId: any) => {
  //   console.log("first print");
  //   setSelectedAnswers((prevAnswers): any => [
  //     ...prevAnswers.slice(0, questionIndex),
  //     answerId,
  //     ...prevAnswers.slice(questionIndex + 1),
  //   ]);
  // };

  const handleAnswerSelection = (questionIndex: number, answerId: any) => {
    setSelectedAnswers((prevAnswers: any[]): any[] => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answerId;
      return newAnswers;
    });
  };

  // <h1>{data[0]?.id}</h1>
  //  <h1>{data[0]?.question[3]?.id}</h1>

  return (
    <div className="my-6">
      {onExam && (
        <div className="mx-3">
          <div>
            {/* <h1>{`${apiUrl}/purchaselist/specificStudentSingleAssessment/${AssessmentId}`}</h1>
            <h1>{accessToken}</h1> */}
            <h1>Questions</h1>
            <h1>Total Questions : {totalQuestionCounts}</h1>
            <h1>Answerd Questions: {selectedAnswers.length}</h1>
            <h1>Note: You should finish and submit your answer. </h1>
          </div>
          <div className="bg-primaryColor text-white flex justify-end mx-5 px-5 my-4">
            <div className="justify-end">
              <h1>Countdown Timer</h1>
              <h2>
                Time Remaining:{" "}
                <span className="text-blue-300">{formatTime(seconds)}</span>
              </h2>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div>
                {data[0]?.question.map((question: any, index: any) => (
                  <div key={question?.id} className="py-5">
                    <div className="gap-2">
                      {index + 1}
                      {`)`}
                      {question?.question}
                    </div>

                    <div>
                      <h1
                        onClick={() => handleAnswerSelection(index, "a")}
                        style={{
                          backgroundColor:
                            selectedAnswers[index] === "a"
                              ? "lightblue"
                              : "white",
                        }}
                        className="cursor-pointer"
                      >
                        A {question.choiseA}
                      </h1>
                    </div>
                    <div>
                      <h1
                        onClick={() => handleAnswerSelection(index, "b")}
                        style={{
                          backgroundColor:
                            selectedAnswers[index] === "b"
                              ? "lightblue"
                              : "white",
                        }}
                        className="cursor-pointer"
                      >
                        B {question.choiseB}
                      </h1>
                    </div>
                    <div>
                      <h1
                        onClick={() => handleAnswerSelection(index, "c")}
                        style={{
                          backgroundColor:
                            selectedAnswers[index] === "c"
                              ? "lightblue"
                              : "white",
                        }}
                        className="cursor-pointer"
                      >
                        C {question.choiseC}
                      </h1>
                    </div>
                    <div>
                      <h1
                        onClick={() => handleAnswerSelection(index, "d")}
                        style={{
                          backgroundColor:
                            selectedAnswers[index] === "d"
                              ? "lightblue"
                              : "white",
                        }}
                        className="cursor-pointer"
                      >
                        D {question.choiseD}
                      </h1>
                    </div>
                  </div>
                ))}
                <button
                  className="bg-primaryColor px-2 py-1 text-white rounded"
                  type="submit"
                >
                  Submit Answers
                </button>
              </div>
            </form>
          </div>

          {/* <div className="mx-5">
        <button className="px-2 py-1 bg-blue-600 text-white rounded-md">
          Submit
        </button>
      </div> */}
        </div>
      )}

      {!onExam && (
        <div>
          <ShowResult
            reslultText={resultText}
            incorrectquestions={incorrectQuestions}
            questions={questions}
          />
        </div>
      )}
    </div>
  );
}
