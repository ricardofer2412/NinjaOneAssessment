import { Selector, t } from "testcafe";

class DeviceListComponent {
  constructor() {
    this.devicesBox = Selector(".device-main-box");

    this.deviceName = Selector("#device-name");
    this.deviceType = Selector("#device-type");
    this.deviceCapacity = Selector("#device-capacity");
    this.anyButton = Selector(".submitButton");
  }
}

export default new DeviceListComponent();
