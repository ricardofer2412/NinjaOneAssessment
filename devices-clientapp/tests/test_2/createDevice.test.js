import { Selector, fixture } from "testcafe";
import xPathToCss from "xpath-to-css";
//prettier-ignore

fixture`Check for elements in DOM are visible`
 .page`http://localhost:3001/`

test("Create a new device", async (t) => {
  const addButton = Selector(".submitButton");
  const systemName = Selector("#system_name");
  const systemCap = Selector("#hdd_capacity");
  const systemType = Selector("#type");
  const systemTypeOptions = systemType.find("option");

  const name = "test-" + Date.now();
  const cap = "1000";
  const type = "MAC";

  await t.click(addButton);
  await t.typeText(systemName, name, { paste: true });
  await t
    .click(systemType)
    .click(systemTypeOptions.withText(type))
    .expect(systemType.value)
    .eql("MAC");
  await t.typeText(systemCap, cap, { paste: true });
  await t.click(".submitButton");

  const devices = Selector(".device-main-box");
  const numberOfDevices = await devices.count;

  let totalMatch = 0;

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

test("Test missing System Name Input", async (t) => {
  const addButton = Selector(".submitButton");
  const systemCap = Selector("#hdd_capacity");
  const systemType = Selector("#type");
  const systemTypeOptions = systemType.find("option");
  const cap = "1000";
  const type = "MAC";

  await t.click(addButton);
  await t
    .click(systemType)
    .click(systemTypeOptions.withText(type))
    .expect(systemType.value)
    .eql("MAC");
  await t.typeText(systemCap, cap, { paste: true });
  await t.click(".submitButton");

  const devices = Selector(".device-main-box");

  await t.expect(devices.exists).notOk();
});

test("Test missing System Capacity Input", async (t) => {
  const addButton = Selector(".submitButton");
  const systemName = Selector("#system_name");
  const systemType = Selector("#type");
  const systemTypeOptions = systemType.find("option");
  const name = "test-" + Date.now();
  const type = "MAC";

  await t.click(addButton);
  await t.typeText(systemName, name, { paste: true });
  await t
    .click(systemType)
    .click(systemTypeOptions.withText(type))
    .expect(systemType.value)
    .eql("MAC");

  await t.click(".submitButton");

  const devices = Selector(".device-main-box");

  await t.expect(devices.exists).notOk();
});

test("Check if capacity input is a string.", async (t) => {
  const addButton = Selector(".submitButton");
  const systemName = Selector("#system_name");
  const systemType = Selector("#type");
  const systemCap = Selector("#hdd_capacity");
  const systemTypeOptions = systemType.find("option");
  const name = "test-" + Date.now();
  const type = "MAC";
  const cap = "Hello I am a string";

  await t.click(addButton);
  await t.typeText(systemName, name, { paste: true });
  await t
    .click(systemType)
    .click(systemTypeOptions.withText(type))
    .expect(systemType.value)
    .eql("MAC");
  await t.typeText(systemCap, cap, { paste: true });

  await t.click(".submitButton");

  const devices = Selector(".device-main-box");

  await t.expect(devices.exists).notOk();
});
