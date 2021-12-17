import { Selector, fixture } from "testcafe";
import { getAllDevices, updateDevice } from "../../api";
import { DEV_CLIENT_URL } from "../../constants";

let devicesList = null;
let cleanUpDevice = null;

//prettier-ignore
fixture`Modify Device from List`
    .page`${DEV_CLIENT_URL}`
      .before( async t => {
           try {
            const res = await getAllDevices();
            devicesList = res
           } catch(e) {
             // NOTIFY DEVELOPER API BROKE
             throw new Error("API doesnt work");
           }
      })
      .after(async t => {
        if (!cleanUpDevice) {
          throw new Error("NO clean up device was found... check edit device test");
        }

        try {
          await updateDevice(cleanUpDevice);
        } catch(e) {
          throw new Error("Unable toupdate device for clean up: " + e.message);
        }
      })

test("Edit first device", async (t) => {
  const devices = Selector(".device-main-box");
  const numberOfDevices = await devices.count;

  let totalMatch = 0;
  const firstDevice = devicesList[0];
  const newDevice = { ...firstDevice, ["system_name"]: "Renamed Device" };

  try {
    await updateDevice(newDevice);
  } catch (e) {
    throw new Error("API for renaming device is not working: " + e.message);
  }

  await t.eval(() => location.reload(true));

  for (let i = 0; i < numberOfDevices; i++) {
    const device = devices.nth(i);

    const deviceName = await device.find(".device-name").innerText;
    const deviceType = await device.find(".device-type").innerText;
    const deviceCap = await device.find(".device-capacity").innerText;

    if (
      deviceName === newDevice.system_name &&
      deviceType === newDevice.type &&
      deviceCap === newDevice.hdd_capacity + " GB"
    ) {
      totalMatch += 1;
    }
  }

  cleanUpDevice = firstDevice;

  await t.expect(1).eql(totalMatch);
});
