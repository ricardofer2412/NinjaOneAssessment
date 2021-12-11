import { Selector, fixture } from "testcafe";

//prettier-ignore
fixture`Modify Device from List`
    .page`http://localhost:3001/`

test("Edit first device", async (t) => {
  const devices = Selector(".device-main-box");
  const numberOfDevices = await devices.count;
  const systemName = Selector("#system_name");
  const systemCap = Selector("#hdd_capacity");
  const systemType = Selector("#type");
  const systemTypeOptions = systemType.find("option");
  const name = "test-" + Date.now();
  const cap = "1000";
  const type = "MAC";
  let totalMatch = 0;

  await t.click(devices.nth(0).find(".device-edit"));

  await t.typeText(systemName, name, { replace: true });
  await t
    .click(systemType)
    .click(systemTypeOptions.withText(type))
    .expect(systemType.value)
    .eql("MAC");
  await t.typeText(systemCap, cap, { replace: true });
  await t.click(".submitButton");

  for (let i = 0; i < numberOfDevices; i++) {
    const device = devices.nth(i);

    const deviceName = await device.find(".device-name").innerText;
    const deviceType = await device.find(".device-type").innerText;
    const deviceCap = await device.find(".device-capacity").innerText;

    if (
      deviceName === name &&
      deviceType === type &&
      deviceCap === cap + " GB"
    ) {
      totalMatch += 1;
    }
  }
  await t.expect(1).eql(totalMatch);
});
