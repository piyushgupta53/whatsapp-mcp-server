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

export async function getChatHistory(
  instanceId: string,
  apiTokenInstance: string,
  chatId: string,
  count = 10
) {
  const url = `https://api.green-api.com/waInstance${instanceId}/getChatHistory/${apiTokenInstance}`;

  const res = await axios.post(url, { chatId, count });
  return res.data;
}

export async function sendFileByUrl(
  instanceId: string,
  apiTokenInstance: string,
  chatId: string,
  fileUrl: string,
  fileName: string,
  caption?: string
) {
  const url = `https://api.green-api.com/waInstance${instanceId}/sendFileByUrl/${apiTokenInstance}`;

  const payload = {
    chatId,
    urlFile: fileUrl,
    fileName: fileName || "file",
    caption: caption || "",
  };

  const res = await axios.post(url, payload);

  return res.data;
}

export async function addGroupParticipant(
  instanceId: string,
  apiTokenInstance: string,
  groupId: string,
  participantChatId: string
) {
  const url = `https://api.green-api.com/waInstance${instanceId}/addGroupParticipant/${apiTokenInstance}`;
  const res = await axios.post(url, { groupId, participantChatId });
  return res.data;
}

export async function removeGroupParticipant(
  instanceId: string,
  apiTokenInstance: string,
  groupId: string,
  participantChatId: string
) {
  const url = `https://api.green-api.com/waInstance${instanceId}/removeGroupParticipant/${apiTokenInstance}`;
  const res = await axios.post(url, { groupId, participantChatId });
  return res.data;
}
