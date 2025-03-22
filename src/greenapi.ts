import axios from "axios";

export async function sendMessageToWhatsapp(
  instanceId: string,
  apiTokenInstance: string,
  chatId: string,
  message: string
) {
  const url = `https://api.green-api.com/waInstance${instanceId}/sendMessage/${apiTokenInstance}`;

  const payload = {
    chatId,
    message,
  };

  const res = await axios.post(url, payload);

  return res.data;
}
