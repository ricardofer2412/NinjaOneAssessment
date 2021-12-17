import { Selector, fixture } from "testcafe";
import { getAllDevices } from "../../api";
import { DEV_CLIENT_URL } from "../../constants";

let devicesList = null;
//prettier-ignore
fixture`Check for elements in DOM are visible`
    .page`${DEV_CLIENT_URL}`
       .before( async t => {
           try {
            const res = await getAllDevices()
            devicesList = res
           } catch(e) {
             // NOTIFY DEVELOPER API BROKE
             throw new Error("API doesnt work" + e.message);
           }
    });
test("Check that device is rendered properly", async (t) => {
  const devices = Selector(".device-main-box");
  const numberOfDevices = await devices.count;
  let totalMatch = 0;

  for (let i = 0; i < numberOfDevices; i++) {
    const device = devices.nth(i);
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
  await t.expect(totalMatch).eql(numberOfDevices);
});

test("Check that each device has a edit and delete button", async (t) => {
  const devices = Selector(".device-main-box");
  const numberOfDevices = await devices.count;

  for (let i = 0; i < numberOfDevices; i++) {
    const device = devices.nth(i);
    const editButton = device.find(".device-edit");
    const deleteButton = device.find(".device-remove");
    await t.expect(editButton.visible).ok();
    await t.expect(deleteButton.visible).ok();
  }
});
