var numberOfRequestsSent = 0;
var continuouslySendData = false;
var apiTimeRunningTotal = 0;
var numberOfSuccessfulResponses = 0;
var numberOfFailedResponses = 0;

onSubmitButtonClick = () => {
  numberOfRequestsSent = 0;
  continuouslySendData = true;
  apiTimeRunningTotal = 0;
  numberOfSuccessfulResponses = 0;
  numberOfFailedResponses = 0;

  document.getElementById("apiButton").textContent = "Reset Data";
  ShowSpecialMessagesDialog("");
  SendContinuousRequests();
};

SendContinuousRequests = async () => {
  while (continuouslySendData) {
    const randomNumber = GenerateRandom8DigitRandomNumber();

    try {
      var startTime = performance.now();
      const response = await fetch(`/api/Api/ping/${randomNumber}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message == randomNumber && data.response === "pong") {
          numberOfSuccessfulResponses++;
        } else {
          numberOfFailedResponses++;
        }
      } else {
        numberOfFailedResponses++;
      }

      var endTime = performance.now();
      var currentAPItime = endTime - startTime;
      apiTimeRunningTotal += currentAPItime;
      numberOfRequestsSent++;
      var average = apiTimeRunningTotal / numberOfRequestsSent;

      UpdateUI(average);
    } catch (error) {
      ShowSpecialMessagesDialog("Something Went Horribly Wrong: " + error);
    }
  }
};

GenerateRandom8DigitRandomNumber = () => {
  const min = 10000000;
  const max = 99999999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

UpdateUI = (average) => {
  document.getElementById("apiCounter").textContent = numberOfRequestsSent;
  document.getElementById("requestTime").textContent =
    Math.round((average + Number.EPSILON) * 100) / 100;
  document.getElementById("numberOfSuccessfulResponses").textContent =
    numberOfSuccessfulResponses;
  document.getElementById("numberOfFailedResponses").textContent =
    numberOfFailedResponses;

  ShowCompletelyIrrelevantMessages();
};

ShowCompletelyIrrelevantMessages = () => {
  if (numberOfRequestsSent > 500) {
    ShowSpecialMessagesDialog("Are you bored yet?");
  }

  if (numberOfRequestsSent > 1000) {
    ShowSpecialMessagesDialog("Yea, you're bored");
  }
};

ShowSpecialMessagesDialog = (phrase) => {
  document.getElementById("specialMessages").textContent = phrase;
};
