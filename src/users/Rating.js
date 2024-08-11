import "./Styles.css";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Rating() {
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);

  let navigate = useNavigate();
  const [review, setReview] = useState({
    name: "",
    feedback: "",
  });
  const { name, feedback } = review;

  const handleTextareaChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    console.log("Submitting feedback:", review); // Debugging step

    // Trigger success message immediately
    Swal.fire({
      title: "Thanks for the feedback!",
      imageUrl: "https://embed-ssl.wistia.com/deliveries/e04f3efb18f04eda277fc8f90fbfa0327eb3f4f0.jpg?image_crop_resized=640x360",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image"
    }).then(function(){
      Swal.fire({
        title: "Feedback submitted successfully!",
        icon: "success"
      }).then(function(){
        window.location.href = "/search";
      });
    });

    // Proceed with the request without caring about the outcome
    axios.post("http://localhost:8080/review", review)
      .catch(error => console.error("Error submitting feedback:", error));
  };

  const handleText = () => {
    switch (number || hoverStar) {
      case 0:
        return "FeedBack";
      case 1:
        return "Dissatisfaction";
      case 2:
        return "Unsatisfied";
      case 3:
        return "Normal";
      case 4:
        return "Satisfied";
      case 5:
        return "Very Satisfied";
      default:
        return "FeedBack";
    }
  };

  const handlePlaceHolder = () => {
    switch (number || hoverStar) {
      case 0:
        return "Comment here...";
      case 1:
      case 2:
      case 3:
      case 4:
        return "What is your problem?";
      case 5:
        return "We love to hear your comment?";
      default:
        return "Comment here...";
    }
  };

  return (
    <div className="App">
      <div className="popup">
        <div className="content">
          <div className="product"></div>
          <div>
            <h1>{handleText()}</h1>
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar
                    key={index}
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    key={index}
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                )
              )}
          </div>

          <pre></pre>
          <br></br>
          <input
            type="text"
            className="form-control-name"
            id="name"
            placeholder="name"
            name="name"
            value={name}
            onChange={handleTextareaChange}
          />
          <br></br>
          <textarea
            placeholder={handlePlaceHolder()}
            value={feedback}
            name="feedback"
            onChange={handleTextareaChange}
          ></textarea>

          <button
            className={`${!number && "disabled"}`}
            id="ten"
            onClick={(e) => onClick(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
