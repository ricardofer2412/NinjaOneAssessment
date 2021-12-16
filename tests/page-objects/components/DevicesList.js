import { Selector, t } from "testcafe";

class List {
  constructor() {
    this.devicesBox = Selector(".device-main-box");
    this.deviceName = Selector("#device-name");
    this.deviceType = Selector("#device-type");
    this.deviceCapacity = Selector("#device-capacity");
    this.anyButton = Selector(".submitButton");
    this.addDeviceButton = Selector("a").withText("ADD DEVICE");
  }

  async getList(devicesList) {
    const numberOfDevices = await this.devicesBox.count;
    let totalMatch = 0;
    for (let i = 0; i < numberOfDevices; i++) {
      const device = this.devicesBox.nth(i);

      const deviceName = await device.find(".device-name").innerText;
      const deviceType = await device.find(".device-type").innerText;
      const deviceCap = await device.find(".device-capacity").innerText;

      const deviceRenderedCorrectly = devicesList.find((item) => {
        return (
          item.system_name === deviceName &&
          item.type === deviceType &&
          item.hdd_capacity + " GB" === deviceCap
        );
      });

      if (deviceRenderedCorrectly) {
        totalMatch += 1;
      }
    }
    return totalMatches;
  }
}

export default new List();
