
let questionId = ""
async function getQuestion() {
    try {
        let answers = []
        const res = await axios.get("http://localhost:8000/question")
        const data = res.data
        document.getElementById("questionText").textContent = data.questionText
        answers = data.answer
        questionId = data._id
        const selectedAnswer = document.getElementById("selectedAnswer")
        answers.map((item) => {
            const template = 
            `
            <option value="${item._id}">${item.text}</option>
            `
             selectedAnswer.insertAdjacentHTML("beforeend", template)
        })
        
        let time = 30000
        const timer = setInterval(() => {
            if(time <= 0) {
                clearInterval(timer)
                alert("Hết thời gian")
                const userCorrectWrapper = document.getElementById("userCorrect")
                const userCorrectFastestWrapper = document.getElementById("userCorrectFastest")
                let userCorrects = []
                let userCorrectFastes = []
                async function getWinner() {
                    const res = await axios.get(`http://localhost:8000/winner/${questionId}`)
                    const data = res.data;
                    userCorrects = data.userCorrects
                    userCorrectFastes = data.userFastest
                    if(userCorrectFastes) {
                        const template = 
                            `
                             <p>${userCorrectFastes.username}</p>
                             `
                    userCorrectFastestWrapper.insertAdjacentHTML("beforeend", template)
                        
                    }else{
                        const template = "Không có ai trả lời đúng :("
                        userCorrectFastestWrapper.insertAdjacentHTML("beforeend", template)
                    }
                }
                getWinner()
                setTimeout(() => {
                    const confirm = window.confirm("Bạn muốn chơi tiếp?")
                    if(confirm) {
                    window.location = "http://127.0.0.1:5500/fronend/index.html"
                    }
                }, 5000)
            }else{
                const totalSecond = time / 1000
                const minute = Math.floor(totalSecond / 60);
                const second = Math.floor(totalSecond % 60);
                document.getElementById("time-remaining").textContent = `${minute} phút ${second} giây`
                time = time - 1000;
            }
        }, 1000)
}
     catch (error) {
    }
}

const button = document.querySelector(".button")
button.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
        
        const username = document.getElementById("username")
        const selectedAnswer = document.getElementById("selectedAnswer")
        const prediction = document.getElementById("prediction")
        if(username.value === "") {
            alert("Vui lòng nhập tên")
            return
        }
        if(selectedAnswer.value === "") {
            alert("Vui lòng nhập tên")
            return
        }
        if(prediction.value === "") {
            alert("Vui lòng nhập tên")
            return
        }
        
        const data = {
            question: questionId,
            username: username.value,
            selectedAnswer: selectedAnswer.value,
            prediction: prediction.value
        }
        console.log(data)
        const res = await axios.post("http://localhost:8000/userAnswer",data)
        if(res.data) {
            alert(res.data)
        }
    } catch (error) {
        alert(error.response.data.message)
    }
})
getQuestion()







