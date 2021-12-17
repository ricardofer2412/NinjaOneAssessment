import { Selector, fixture } from "testcafe";
import { createDevice, deleteDevice, getAllDevices } from "../../api";
import { DEV_CLIENT_URL } from "../../constants";

let devicesList = null;
let cleanUpDevice = null;

//prettier-ignore
fixture`Delete Last Device from List`
    .page`${DEV_CLIENT_URL}`
      .before( async t => {
           try {
            const res = await getAllDevices()
            devicesList = res
           } catch(e) {
             // NOTIFY DEVELOPER API BROKE
             throw new Error("API doesnt work");
           }
      })
      .after(async t => {
        if (!cleanUpDevice) {
          throw new Error("No clean up device was found. Check this deleteUserTest");
        }

        try  {
          await createDevice(cleanUpDevice)
        } catch(e) {
          throw new Error("Error creating device for clean up: " + e.message);
        }
      })

test("Delete Device From List", async (t) => {
  const devices = Selector(".device-main-box");
  const numberOfDevices = await devices.count;

  const lastDevice = devicesList[devicesList.length - 1];
  try {
    await deleteDevice(lastDevice.id);
  } catch (e) {
    throw new Error("Unable to delete device: " + e.message);
  }

  cleanUpDevice = lastDevice;

  await t.eval(() => location.reload(true));

  const newDevices = Selector(".device-main-box");
  const newNumberOfDevices = await newDevices.count;

  await t.expect(newNumberOfDevices).eql(numberOfDevices - 1);

  let totalMatch = 0;

  for (let i = 0; i < newNumberOfDevices; i++) {
    const device = newDevices.nth(i);

    const deviceName = await device.find(".device-name").innerText;
    const deviceType = await device.find(".device-type").innerText;
    const deviceCap = await device.find(".device-capacity").innerText;

    if (
      deviceName === lastDevice.system_name &&
      deviceType === lastDevice.type &&
      deviceCap === lastDevice.hdd_capacity + " GB"
    ) {
      totalMatch += 1;
    }
  }
  await t.expect(0).eql(totalMatch);
});
