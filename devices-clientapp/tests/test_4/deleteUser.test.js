import { Selector, fixture } from "testcafe";

//prettier-ignore
fixture`Delete Last User from List`
    .page`http://localhost:3001/`;

test("Delete User From List", async (t) => {
  const devices = Selector(".device-main-box");
  const numberOfDevices = await devices.count;
  const count = await devices.count;
  const lastElement = count - 1;
  const lastDeviceName = await devices.nth(lastElement).find(".device-name")
    .innerText;
  const lastDeviceType = await devices.nth(lastElement).find(".device-type")
    .innerText;
  const lastDeviceCap = await devices.nth(lastElement).find(".device-capacity")
    .innerText;

  await t.click(devices.nth(lastElement).find(".device-remove"));

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
      deviceName === lastDeviceName &&
      deviceType === lastDeviceType &&
      deviceCap === lastDeviceCap + " GB"
    ) {
      totalMatch += 1;
    }
  }
  await t.expect(0).eql(totalMatch);
});
