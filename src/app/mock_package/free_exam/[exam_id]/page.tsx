"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import ShowResult from "@/app/packages_access/assessment_questions/show_result";
import useSelectedMockPackageStore from "@/app/store/selectedmockpackageStore";
import useTemporaryPhonenumberStore from "@/app/store/temporaryphonenumberStore";
import { useRouter } from "next/navigation";

function AssessmentQuestions({ params }: any) {
  const { push } = useRouter();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [totalQuestionCounts, setTotalQuestionsCounts] = useState("");

  //const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [questions, setQuestions] = useState<any>([]);
  const [onExam, setOnExam] = useState(true);
  const [resultText, setResultText] = useState("");

  const MockPackage = useSelectedMockPackageStore((state) => state.mockpackage);
  const PhoneNumber = useTemporaryPhonenumberStore(
    (state) => state.phoneNumber
  );

  function formatTextToHTML(text: any) {
    if (!text) {
      return ""; // Return an empty string if text is null or undefined
    }

    const formattedText = text
      .replace(/\^(.*?)\^/g, "<sup>$1</sup>") // Matches ^^superscript^^
      .replace(/\*\*\*(.*?)\*\*\*/g, "<sub>$1</sub>") // Matches ***subscript***
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Matches **bold**
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Matches *italic*
      .replace(/_(.*?)_/g, "<u>$1</u>")
      .replace(/&&8/g, "∞") // &&8  // infinity
      .replace(/&&f/g, "ƒ")
      .replace(/&&arf/g, "→")
      .replace(/&&arb/g, "←")
      .replace(/&&aru/g, "↑")
      .replace(/&&ard/g, "↓") // &&f   // function f
      .replace(/&&.*?pi/g, "π")
      .replace(/&&sqrt/g, "√")
      .replace(/&&noteq/g, "≠")
      .replace(/&&empty/g, "∅")
      .replace(/&&integ/g, "∫")
      .replace(/&&triangle/g, "△")
      .replace(/&&imp/g, "⇒")
      .replace(/&&bimp/g, "⇔")
      .replace(/&&invv/g, "∧")
      .replace(/&&rarw&([^&]*)&&/g, function (_: any, text: any) {
        return text + " \u2192";
      })
      .replace(
        /(\d+)\/(\d+)/g,
        '<span class="fraction"><sup class="numerator">$1</sup><sub class="denominator">$2</sub></span>'
      ) // Matches _underline_

      .replace(/&&st(\d+)&&end(\d+)/g, function (_: any, start: any, end: any) {
        return start + "<sub>" + end + "</sub>";
      });

    const renderedHTML = (
      <div dangerouslySetInnerHTML={{ __html: formattedText }} />
    );
    return renderedHTML;
  }

  useEffect(() => {
    if (MockPackage.id == undefined) {
      // push("/mock_package");
      push("/mock_package/selectmainfolder");
    }
  }, []); // The empty dependency array ensures the effect runs only once

  //const [videoLocation, setVideoLocation] = useState("");
  // const params = useParams();
  //console.log(params);
  const AssessmentId = params.exam_id;

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
          `${apiUrl}/assesments/submit-exam-answers/${AssessmentId}`,
          {
            answers: selectedAnswers,
          },
          {
            withCredentials: true,
          }
        );
        const responseData = response.data; // Extract the response data
        console.log("Response message:", responseData.message);
        console.log(
          "Incorrect numbers: " + responseData.incorrectQuestionNumbers
        );
        // Access the message property
        // console.log("response: " + response.message);
        if (response.status === 200) {
          // Handle successful submission
          setResultText(responseData.message);
          setIncorrectQuestions(responseData.incorrectQuestionNumbers);
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
        `${apiUrl}/assesments/submit-exam-answers/${AssessmentId}`,
        {
          answers: selectedAnswers,
        },
        {
          withCredentials: true,
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
        `${apiUrl}/mockexampackagepurchase/accessexam/${PhoneNumber}/${MockPackage?.id}/${AssessmentId}`,
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
          console.log("Json Data: " + JSON.stringify(jsonData));
          setSeconds(jsonData.duration * 60);
          setTotalQuestionsCounts(jsonData.question.length);
          setQuestions(jsonData.question);

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
    <div className="my-5">
      {onExam && (
        <div className="mx-3">
          <div className="py-4">
            {/* <h1>Questions : {AssessmentId}</h1> */}
            <h1>
              <span className="text-primaryColor">Total Questions</span> :{" "}
              {totalQuestionCounts}
            </h1>
            <h1>
              <span className="text-primaryColor"> Answerd Questions:</span>{" "}
              {selectedAnswers.length}
            </h1>
            <h1 className="">
              <span className="text-primaryColor font-semibold"> Note:</span>{" "}
              <span className="underline">
                {" "}
                You need to answer all the questions to submit your answer.
              </span>{" "}
            </h1>
          </div>
          <div className="bg-primaryColor text-white flex justify-end mx-5 px-5 py-3">
            <div className="justify-end">
              <h2>
                Time Remaining:{" "}
                <span className="text-thirdColor">{formatTime(seconds)}</span>
              </h2>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="md:mx-6">
                {data?.question?.map((ques: any, index: any) => (
                  <div key={ques?.id} className="my-10">
                    <h2 className="flex gap-2 py-2">
                      <span className=" w-fit font-semibold  text-primaryColor">
                        {index + 1 + `)`}
                      </span>{" "}
                      {formatTextToHTML(ques?.question)}
                    </h2>
                    <div>
                      {/* <h1>{ques?.questionImage}</h1> */}
                      {ques?.questionImage && (
                        <img
                          // src={`${apiUrl}/upload_assets/images/question_images/${ques.questionImage}`}
                          src={ques?.questionImageUrl}
                          alt="ThumbNail Image"
                          className="  rounded-lg"
                        />
                      )}
                    </div>

                    <div>
                      <h1
                        onClick={() => handleAnswerSelection(index, "A")}
                        style={{
                          backgroundColor:
                            selectedAnswers[index] === "A"
                              ? "lightblue"
                              : "white",
                        }}
                        className="cursor-pointer flex gap-2"
                      >
                        A {formatTextToHTML(ques.choiseA)}
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
                        className="cursor-pointer flex gap-2"
                      >
                        B {formatTextToHTML(ques.choiseB)}
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
                        className="cursor-pointer flex gap-2"
                      >
                        C {formatTextToHTML(ques.choiseC)}
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
                        className="cursor-pointer flex gap-2"
                      >
                        D {formatTextToHTML(ques.choiseD)}
                      </h1>
                    </div>
                  </div>
                ))}
                <button
                  className="bg-primaryColor px-2 my-3 cursor-pointer hover:bg-opacity-80 rounded text-white"
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
export default AssessmentQuestions;
