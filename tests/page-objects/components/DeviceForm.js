import { Selector, t } from "testcafe";

class Form {
  constructor() {
    this.systemName = Selector("#system_name");
    this.systemCap = Selector("#hdd_capacity");
    this.systemType = Selector("#type");
    this.systemTypeOptions = this.systemType.find("option");
    this.addDeviceButton = Selector("button").withText("SAVE");
    this.errorMessage = Selector("span").withText("NO EMPTY FIELDS ALLOWED!");
  }

  async fillingForm(name, type, cap) {
    if (name === null) {
      await t.click(this.systemName);
    } else {
      await t.typeText(this.systemName, name, { paste: true });
    }
    if (cap === null) {
      await t.click(this.systemCap);
    } else {
      await t.typeText(this.systemCap, cap, { paste: true });
    }
    await t
      .click(this.systemType)
      .click(this.systemTypeOptions.withText(type))
      .expect(this.systemType.value)
      .eql(type);

    await t.click(this.addDeviceButton);
  }
}

export default new Form();
