import { Selector, fixture } from "testcafe";
import Form from "../../page-objects/components/DeviceForm";
import List from "../../page-objects/components/DevicesList";
//prettier-ignore
fixture`Check for elements in DOM are visible`
 .page`http://localhost:3001/`

test("Create a new device", async (t) => {
  const name = "test-" + Date.now();
  const cap = "1000";
  const type = "MAC";

  await t.click(List.addDeviceButton);
  await Form.fillingForm(name, type, cap);

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
  const name = null;
  const cap = "1000";
  const type = "MAC";

  await t.click(List.addDeviceButton);
  await Form.fillingForm(name, type, cap);

  const errorMessage = Selector("span").withText("NO EMPTY FIELDS ALLOWED!");
  await t.expect(errorMessage.exists).ok();
});

test("Test missing System Capacity Input", async (t) => {
  const name = "test-" + Date.now();
  const type = "MAC";
  const cap = null;

  await t.click(List.addDeviceButton);
  await Form.fillingForm(name, type, cap);

  await t.expect(Form.errorMessage.visible).ok();
});

test("Check if capacity input is a number", async (t) => {
  const name = "test-" + Date.now();
  const type = "MAC";
  const cap = "Hello I am a string";

  await t.click(List.addDeviceButton);
  await Form.fillingForm(name, type, cap);

  await t.expect(Form.errorMessage.visible).ok();
});
