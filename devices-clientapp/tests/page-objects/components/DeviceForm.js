import { Selector, t } from "testcafe";

class DeviceForm {
  constructor() {
    this.systemName = Selector("#system_name");
    this.systemCap = Selector("#hdd_capacity");
    this.systemType = Selector("#type");
    this.systemTypeOptions = this.systemType.find("option");
    this.submitButton = Selector(".submitButton");
  }

  async fillingForm(name, type, cap) {
    console.log(name, type, cap);
    await t.typeText(this.systemName, name, { paste: true });

    await t
      .click(this.systemType)
      .click(this.systemTypeOptions.withText(type))
      .expect(this.systemType.value)
      .eql(type);
    await t.wait(1000);
    await t.typeText(this.systemCap, cap, { paste: true });
    await t.wait(1000);
    await t.click(this.submitButton);
  }
}

export default DeviceForm;
