import { Selector, fixture } from "testcafe";
import axios from "axios";
import DeviceListComponent from "../../page-objects/components/DevicesList";

let devicesList = null;
//prettier-ignore
fixture`Check for elements in DOM are visible`
    .page`http://localhost:3001/`
       .beforeEach( async t => {
       const res = await axios.get("http://localhost:3000/devices")
       devicesList = res.data
    });
test("Check that device is rendered properly", async (t) => {
  //  const devices = Selector(".device-main-box");
  //  const numberOfDevices = await devices.count;

  //  let totalMatch = 0;

  //  for (let i = 0; i < numberOfDevices; i++) {
  //    const device = devices.nth(i);

  //    const deviceName = await device.find(".device-name").innerText;
  //    const deviceType = await device.find(".device-type").innerText;
  //    const deviceCap = await device.find(".device-capacity").innerText;

  //    const deviceRenderedCorrectly = devicesList.find((item) => {
  //      return (
  //        item.system_name === deviceName &&
  //        item.type === deviceType &&
  //        item.hdd_capacity + " GB" === deviceCap
  //      );
  //    });

  //    if (deviceRenderedCorrectly) {
  //      totalMatch += 1;
  //    }
  //  }
  //  await t.expect(totalMatch).eql(numberOfDevices);
  const count = await DeviceListComponent.devicesBox.count;
  console.log("Number", count);
  for (let i = 0; i < count; i++) {
    const device = DeviceListComponent.devicesBox.nth(i);
    const deviceName = await device.find(DeviceListComponent.deviceName)
      .innerText;
    console.log(deviceName);
    // const deviceName = await device.find(DeviceListComponent.deviceName)
    //   .innerText;
  }

  // await DeviceListComponent.findMatches();
});

test("Check that each device has a edit and delete button", async (t) => {
  const devices = Selector(".device-main-box");
  const numberOfDevices = await devices.count;

  for (let i = 0; i < numberOfDevices; i++) {
    const device = devices.nth(i);
    const editButton = device.find(".device-edit");
    const deleteButton = device.find(".device-remove");
    await t.expect(editButton.exists).ok();
    await t.expect(deleteButton.exists).ok();
  }
});