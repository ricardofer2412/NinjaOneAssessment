import { Selector, t } from "testcafe";

class Form {
  constructor() {
    this.systemName = Selector("#system_name");
    this.systemCap = Selector("#hdd_capacity");
    this.systemType = Selector("#type");
    this.systemTypeOptions = this.systemType.find("option");
    this.addDeviceButton = Selector("button").withText("SAVE");
  }

  async fillingForm(name, type, cap) {
    await t.typeText(this.systemName, name, { paste: true });

    await t
      .click(this.systemType)
      .click(this.systemTypeOptions.withText(type))
      .expect(this.systemType.value)
      .eql(type);
    await t.typeText(this.systemCap, cap, { paste: true });
  }
}

export default new Form();
