import axios from "axios";
import { DEV_SERVER_URL } from "../constants";

const axiosInstance = axios.create({
  baseURL: DEV_SERVER_URL,
});

export async function deleteDevice(deviceId) {
  try {
    const response = await axiosInstance.delete("/devices/" + deviceId);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function getAllDevices() {
  try {
    const response = await axiosInstance.get("/devices");

    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function createDevice(device) {
  try {
    const response = await axiosInstance.post("/devices", device);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function updateDevice(newDevice) {
  try {
    const response = await axiosInstance.put(
      "/devices/" + newDevice.id,
      newDevice
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}
