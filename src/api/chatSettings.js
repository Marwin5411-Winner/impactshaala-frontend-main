import { axiosAuthInstance } from "../utilities/axios"

export const chatSettingconfigOptions = async () => {
	return axiosAuthInstance.get("/chats-settings/chat-setting-config-options")
}

export const listMyChatSettings = async () => {
	return axiosAuthInstance.get("/chats-settings/list-my-chat-settings")
}

export const updateChatSettings = async (data) => {
	return axiosAuthInstance.put("/chats-settings/update-my-chat-settings", data)
}