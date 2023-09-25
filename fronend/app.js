let questionId = "";
let timeUntilNextQuestion = "";
async function getQuestion() {
  try {
    let answers = [];
    const res = await axios.get("http://localhost:8000/question");
    const data = res.data;
    const winner = await axios.get("http://localhost:8000/winner");
    const winners = winner.data;
    console.log(data);
    document.getElementById("questionText").textContent =
      data.question.questionText;
    answers = data.question.answer;
    questionId = data.question._id;
    timeUntilNextQuestion = data.timeUntilNextQuestion;
    const listA = document.getElementById("listA");
    const selectedAnswer = document.getElementById("selectedAnswer");
    answers.map((item) => {
      const template = `
            <option value="${item._id}">${item.text}</option>
            `;
      selectedAnswer.insertAdjacentHTML("beforeend", template);
    });
    winners.map((item) => {
      const template = ` <p>${item._id} -  ${item.userCorrect}</p> `;
      listA.insertAdjacentHTML("beforeend", template);
    });

    const timer = setInterval(() => {
      if (timeUntilNextQuestion <= 0) {
        clearInterval(timer);
        alert("Hết thời gian");
        const userCorrectWrapper = document.getElementById("userCorrect");
        const userCorrectFastestWrapper =
          document.getElementById("userCorrectFastest");
        let userCorrects = [];
        let userCorrectFastes = [];
        async function getWinner() {
          const res = await axios.get(
            `http://localhost:8000/winner/${questionId}`
          );
          const data = res.data;
          userCorrects = data.userCorrects;
          userCorrectFastes = data.userFastest;
          if (userCorrectFastes) {
            const template = ` <p>${userCorrectFastes.username}</p> `;
            userCorrectFastestWrapper.insertAdjacentHTML("beforeend", template);
          } else {
            const template = "Không có ai trả lời đúng :(";
            userCorrectFastestWrapper.insertAdjacentHTML("beforeend", template);
          }
        }
        getWinner();
        window.location = "http://127.0.0.1:5500/fronend/index.html";
      } else {
        const totalSecond = timeUntilNextQuestion / 1000;
        const minute = Math.floor(totalSecond / 60);
        const second = Math.floor(totalSecond % 60);
        document.getElementById(
          "time-remaining"
        ).textContent = `${minute} phút ${second} giây`;
        timeUntilNextQuestion = timeUntilNextQuestion - 1000;
      }
    }, 1000);
  } catch (error) {}
}

const button = document.querySelector(".button");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const username = document.getElementById("username");
    const selectedAnswer = document.getElementById("selectedAnswer");
    const prediction = document.getElementById("prediction");
    if (username.value === "") {
      alert("Vui lòng nhập tên");
      return;
    }
    if (selectedAnswer.value === "") {
      alert("Vui lòng nhập tên");
      return;
    }
    if (prediction.value === "") {
      alert("Vui lòng nhập tên");
      return;
    }

    const data = {
      question: questionId,
      username: username.value,
      selectedAnswer: selectedAnswer.value,
      prediction: prediction.value,
    };
    console.log(data);
    const res = await axios.post("http://localhost:8000/userAnswer", data);
    if (res.data) {
      alert(res.data);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
});
getQuestion();
