import axiosClient from "./axiosClient";

const chatBox = {
    callApi: (userMessage) => {
        return axiosClient.post('/Chat/ask', { 
            userMessage: userMessage 
        });
    }
}

export default chatBox;