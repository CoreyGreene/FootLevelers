var sentCount = 0;
var continuouslySendData = false;
var apiRunningTotalTime = 0;
var numberOfSuccessfulMessages = 0;
var numberOfFailedMessages = 0;

onSubmitButtonClick = () => {
    sentCount = 0;
    continuouslySendData = true;
    apiRunningTotalTime = 0;
    numberOfSuccessfulMessages = 0;
    numberOfFailedMessages = 0;

    document.getElementById("apiButton").textContent = "Reset Data";
    ShowSpecialMessagesDialog("")
    SendContinuousRequests();
}

SendContinuousRequests = async () => {

    while (continuouslySendData) {
        const message = GenerateRandom8DigitRandomNumber();
        try {
            var startTime = performance.now()
            const response = await fetch(`/api/Api/ping/${message}`, { method: 'GET' });

            if (response.ok) {
                const data = await response.json();
                if (data.message == message) {
                    numberOfSuccessfulMessages++;
                } else {
                    numberOfFailedMessages++;
                }

            } else {
                numberOfFailedMessages++;
            }

            var endTime = performance.now()
            var currentAPItime = endTime - startTime;
            apiRunningTotalTime += currentAPItime
            sentCount++;
            var average = apiRunningTotalTime / sentCount;

            UpdateUI(average);

        } catch (error) {
            ShowSpecialMessagesDialog("Something Went Horribly Wrong: " + error)
        }
    }
}

GenerateRandom8DigitRandomNumber = () => {
    const min = 10000000;
    const max = 99999999;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

UpdateUI = (average) => {
    document.getElementById("messagesCounter").textContent = sentCount;
    document.getElementById("requestTime").textContent = Math.round((average + Number.EPSILON) * 100) / 100;
    document.getElementById("numberOfSuccessfulMessages").textContent = numberOfSuccessfulMessages;
    document.getElementById("numberOfFAiledMessages").textContent = numberOfFailedMessages;

    ShowCompletelyIrrelevantMessages();
}

ShowCompletelyIrrelevantMessages = () => {
    if (sentCount > 500) {
        ShowSpecialMessagesDialog("Are you bored yet?")
    }

    if (sentCount > 1000) {
        ShowSpecialMessagesDialog("Yea, your're bored")
    }
}

ShowSpecialMessagesDialog = (message) => {
    document.getElementById("specialMessages").textContent = message;
}