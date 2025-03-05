import eventEmitter from "./eventEmitter";

const VENDOR_ID_SONY = 0x054c;
const PRODUCT_ID_DUAL_SENSE = 0x0ce6;
const USAGE_PAGE_GENERIC_DESKTOP = 0x0001;
const USAGE_ID_GD_GAME_PAD = 0x0005;

const DUAL_SENSE_USB_INPUT_REPORT_0x01_SIZE = 63;
const DUAL_SENSE_BT_INPUT_REPORT_0x01_SIZE = 9;
const DUAL_SENSE_BT_INPUT_REPORT_0x31_SIZE = 77;

const hex8 = value => { return ('00' + (value >>> 0).toString(16)).substr(-2); };
const hex16 = value => { return ('0000' + (value >>> 0).toString(16)).substr(-4); };
const hex32 = value => { return ('00000000' + (value >>> 0).toString(16)).substr(-8); };

const parseHex = value => {
  if (value == '')
    return 0;

  return parseInt(value, 16);
};

const makeCRCTable = () => {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; ++n) {
      c = n;
      for (let k = 0; k < 8; ++k)
          c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
      crcTable[n] = (c >>> 0);
  }
  return crcTable;
};

// Compute CRC32 for `prefixBytes` concatenated with `dataView`.
const crc32 = (prefixBytes, dataView) => {
  if (window.crcTable === undefined)
    window.crcTable = makeCRCTable();
  let crc = (-1 >>> 0);
  for (const byte of prefixBytes)
      crc = (crc >>> 8) ^ window.crcTable[(crc ^ byte) & 0xFF];
  for (let i = 0; i < dataView.byteLength; ++i)
      crc = (crc >>> 8) ^ window.crcTable[(crc ^ dataView.getUint8(i)) & 0xFF];
  return (crc ^ (-1)) >>> 0;
};

// Given a DualSense Bluetooth output report with `reportId` and `reportData`,
// compute the CRC32 checksum and write it to the last four bytes of `reportData`.
const fillDualSenseChecksum = (reportId, reportData) => {
const crc = crc32([0xa2, reportId], new DataView(reportData.buffer, 0, reportData.byteLength - 4));
reportData[reportData.byteLength - 4] = (crc >>> 0) & 0xff;
reportData[reportData.byteLength - 3] = (crc >>> 8) & 0xff;
reportData[reportData.byteLength - 2] = (crc >>> 16) & 0xff;
reportData[reportData.byteLength - 1] = (crc >>> 24) & 0xff;
};
// Normalize a digital button value to the range [0, +1].
const normalizeButton = value => {
  return value ? 1.0 : 0.0;
};
const normalizeTriggerAxis = value => {
  return value / 100;
};

const normalizeThumbStickAxis = value => {
  return (2 * value / 0xFF) - 1.0;
};

class DualSenseHid {
  constructor(hidDevice) {
    this.device_ = hidDevice;
    this.connectionType_ = null;

    // UI controls that affect the output report.
    this.checkboxPlayerLeds_ = 0x00;
    this.sliderLightbarRed_ = 0xFF;
    this.sliderLightbarGreen_ = 0xFF;
    this.sliderLightbarBlue_ = 0xFF;

    // Output report state.
    this.outputSeq_ = 1;
    this.playerLeds_ = 0x00;
    this.muteLed_ = 0x00;
    this.motorLeft_ = 0x00;
    this.motorRight_ = 0x00;
    this.l2EffectMode_ = 0x26;
    this.l2EffectParam1_ = 0x90;
    this.l2EffectParam2_ = 0xA0;
    this.l2EffectParam3_ = 0xFF;
    this.l2EffectParam4_ = 0x00;
    this.l2EffectParam5_ = 0x00;
    this.l2EffectParam6_ = 0x00;
    this.l2EffectParam7_ = 0x00;
    this.r2EffectMode_ = 0x26;
    this.r2EffectParam1_ = 0x90;
    this.r2EffectParam2_ = 0xA0;
    this.r2EffectParam3_ = 0xFF;
    this.r2EffectParam4_ = 0x00;
    this.r2EffectParam5_ = 0x00;
    this.r2EffectParam6_ = 0x00;
    this.r2EffectParam7_ = 0x00;
    this.lightbarRed_ = 0xFF;
    this.lightbarGreen_ = 0xFF;
    this.lightbarBlue_ = 0xFF;

    // WebHID API doesn't indicate whether we are connected through the controller's
    // USB or Bluetooth interface. The protocol is different depending on the connection
    // type so we will try to detect it based on the collection information.
    this.connectionType_ = 'unknown';
    for (const c of this.device_.collections) {
      if (c.usagePage != USAGE_PAGE_GENERIC_DESKTOP || c.usage != USAGE_ID_GD_GAME_PAD)
        continue;

      // Compute the maximum input report byte length and compare against known values.
      let maxInputReportBytes = c.inputReports.reduce((max, report) => {
        return Math.max(max, report.items.reduce((sum, item) => { return sum + item.reportSize * item.reportCount; }, 0));
      }, 0);
      if (maxInputReportBytes == 504)
        this.connectionType_ = 'usb';
      else if (maxInputReportBytes == 616)
        this.connectionType_ = 'bluetooth';
    }
  }

  initialize() {
    this.device_.oninputreport = e => { this.onInputReport(e); }
  }
  
  async readFeatureReport05() {
  	// By default, bluetooth-connected DualSense only sends input report 0x01 which omits motion and touchpad data.
    // Reading feature report 0x05 causes it to start sending input report 0x31.
    //
    // Note: The Gamepad API will do this for us if it enumerates the gamepad.
    // Other applications like Steam may have also done this already.
    if (this.connectionType_ == 'bluetooth')
      await device.receiveFeatureReport(0x05);
  }

  onInputReport(event) {
    let reportId = event.reportId;
    let report = event.data;
    let reportString = hex8(reportId);
    for (let i = 0; i < report.byteLength; ++i)
      reportString += ' ' + hex8(report.getUint8(i));

    handleBluetoothInputReport31(report)


    
		// if (this.connectionType_ == 'usb') {
    //   if (reportId == 0x01){
    //     this.handleUsbInputReport01(report);
    //   }
    //   else
    //     return;
    // } else if (this.connectionType_ == 'bluetooth') {
    //   console.log("Porcoddio")
    //   if (reportId == 0x01){
    //     console.log("dfjkdv")
    //     handleBluetoothInputReport01(report);
    //   }
    //   else if (reportId == 0x31){
    //     console.log("Espresso macchiato")
    //     handleBluetoothInputReport31(report);
    //   }
    //   else
    //     return;
    // } else {
    //   return;
    // }
  }

  async sendOutputReport() {
    const pads = navigator.getGamepads();
    this.lightbarRed_ = this.sliderLightbarRed_;
    this.lightbarGreen_ = this.sliderLightbarGreen_;
    this.lightbarBlue_ = this.sliderLightbarBlue_;
    if (pads[0]) {
      this.motorLeft_ = pads[0].buttons[6].value * 0xFF;
      this.motorRight_ = pads[0].buttons[7].value * 0xFF;
      if (pads[0].buttons[0].pressed) {
        this.playerLeds_ = 0x04;
        this.lightbarRed_ = 124;
        this.lightbarGreen_ = 178;
        this.lightbarBlue_ = 232;
      } else if (pads[0].buttons[1].pressed) {
        this.playerLeds_ = 0x0a;
        this.lightbarRed_ = 255;
        this.lightbarGreen_ = 102;
        this.lightbarBlue_ = 102;
      } else if (pads[0].buttons[2].pressed) {
        this.playerLeds_ = 0x15;
        this.lightbarRed_ = 255;
        this.lightbarGreen_ = 105;
        this.lightbarBlue_ = 248;
      } else if (pads[0].buttons[3].pressed) {
        this.playerLeds_ = 0x1b;
        this.lightbarRed_ = 64;
        this.lightbarGreen_ = 226;
        this.lightbarBlue_ = 160;
      } else {
        this.playerLeds_ = this.checkboxPlayerLeds_;
      }
    }

    let reportId;
    let reportData;
    let common;
    let r2Effect;
    let l2Effect;
    if (this.connectionType_ == 'bluetooth') {
      reportId = 0x31;
      reportData = new Uint8Array(77);

      // seq_tag
      reportData[0] = (this.outputSeq_ << 4);
      if (++this.outputSeq_ == 16)
        this.outputSeq_ = 0;

      // tag
      reportData[1] = 0x10; // DS_OUTPUT_TAG

      common = new DataView(reportData.buffer, 2, 47);
      r2Effect = new DataView(common.buffer, 12, 8);
      l2Effect = new DataView(common.buffer, 23, 8);
    } else if (this.connectionType_ == 'usb') {
      reportId = 0x02;
      reportData = new Uint8Array(47);

      common = new DataView(reportData.buffer, 0, 47);
      r2Effect = new DataView(common.buffer, 10, 8);
      l2Effect = new DataView(common.buffer, 21, 8);
    }

    // valid_flag0
    // bit 0: COMPATIBLE_VIBRATION
    // bit 1: HAPTICS_SELECT
    common.setUint8(0, 0xff);

    // valid_flag1
    // bit 0: MIC_MUTE_LED_CONTROL_ENABLE
    // bit 1: POWER_SAVE_CONTROL_ENABLE
    // bit 2: LIGHTBAR_CONTROL_ENABLE
    // bit 3: RELEASE_LEDS
    // bit 4: PLAYER_INDICATOR_CONTROL_ENABLE
    common.setUint8(1, 0xf7);

    // DualShock 4 compatibility mode.
    common.setUint8(2, this.motorRight_);
    common.setUint8(3, this.motorLeft_);

    // mute_button_led
    // 0: mute LED off
    // 1: mute LED on
    common.setUint8(8, this.muteLed_);

    // power_save_control
    // bit 4: POWER_SAVE_CONTROL_MIC_MUTE
    common.setUint8(9, this.muteLed_ ? 0x00 : 0x10);

    // Right trigger effect
    // Mode
    // 0x00: off
    // 0x01: mode1
    // 0x02: mode2
    // 0x05: mode1 + mode4
    // 0x06: mode2 + mode4
    // 0x21: mode1 + mode20
    // 0x25: mode1 + mode4 + mode20
    // 0x26: mode2 + mode4 + mode20
    // 0xFC: calibration
    r2Effect.setUint8(0, this.r2EffectMode_);

    // Effect parameter 1
    // start of resistance section
    r2Effect.setUint8(1, this.r2EffectParam1_);

    // Effect parameter 2
    // mode1: amount of force exerted
    // mode2: end of resistance section
    // mode4 + mode20: flags
    //   bit 2: do not pause effect when fully pressed
    r2Effect.setUint8(2, this.r2EffectParam2_);

    // Effect parameter 3
    // mode2: force exerted
    r2Effect.setUint8(3, this.r2EffectParam3_);

    // Effect effect parameter 4
    // mode4 + mode20: strength near release state
    r2Effect.setUint8(4, this.r2EffectParam4_);

    // Effect parameter 5
    // mode4 + mode20: strength near middle
    r2Effect.setUint8(5, this.r2EffectParam5_);

    // Effect parameter 6
    // mode4 + mode20: at pressed state
    r2Effect.setUint8(6, this.r2EffectParam6_);

    // Effect parameter 7
    // mode4 + mode20: effect actuation frequency in Hz
    r2Effect.setUint8(7, this.r2EffectParam7_);

    // Left trigger effect
    // Mode
    // 0x00: off
    // 0x01: mode1
    // 0x02: mode2
    // 0x05: mode1 + mode4
    // 0x06: mode2 + mode4
    // 0x21: mode1 + mode20
    // 0x25: mode1 + mode4 + mode20
    // 0x26: mode2 + mode4 + mode20
    // 0xFC: calibration
    l2Effect.setUint8(0, this.l2EffectMode_);

    // Effect parameter 1
    // start of resistance section
    l2Effect.setUint8(1, this.l2EffectParam1_);

    // Effect parameter 2
    // mode1: amount of force exerted
    // mode2: end of resistance section
    // mode4 + mode20: flags
    //   bit 2: do not pause effect when fully pressed
    l2Effect.setUint8(2, this.l2EffectParam2_);

    // Effect parameter 3
    // mode2: force exerted
    l2Effect.setUint8(3, this.l2EffectParam3_);

    // Effect effect parameter 4
    // mode4 + mode20: strength near release state
    l2Effect.setUint8(4, this.l2EffectParam4_);

    // Effect parameter 5
    // mode4 + mode20: strength near middle
    l2Effect.setUint8(5, this.l2EffectParam5_);

    // Effect parameter 6
    // mode4 + mode20: at pressed state
    l2Effect.setUint8(6, this.l2EffectParam6_);

    // Effect parameter 7
    // mode4 + mode20: effect actuation frequency in Hz
    l2Effect.setUint8(7, this.l2EffectParam7_);

    // valid_flag2
    // bit 1: LIGHTBAR_SETUP_CONTROL_ENABLE
    common.setUint8(39, 0x02);

    // lightbar_setup
    // 1: Disable LEDs
    // 2: Enable LEDs
    common.setUint8(41, 0x02);

    // player_leds
    common.setUint8(43, this.playerLeds_);

    // Lightbar RGB
    common.setUint8(44, this.lightbarRed_);
    common.setUint8(45, this.lightbarGreen_);
    common.setUint8(46, this.lightbarBlue_);

    // fill CRC32
    if (this.connectionType_ == 'bluetooth') {
      fillDualSenseChecksum(reportId, reportData);
    }

    // Send output report
    try {
      await this.device_.sendReport(reportId, reportData);
    } catch (error) {
      console.log('Failed to write DualSense output report');
      return false;
    }

    return true;
  }
}

export function handleBluetoothInputReport01(report) {
  if (report.byteLength != DUAL_SENSE_BT_INPUT_REPORT_0x01_SIZE)
  {
    return ;    
  }
  let axes0 = report.getUint8(0);
  let axes1 = report.getUint8(1);
  let axes2 = report.getUint8(2);
  let axes3 = report.getUint8(3);
  let buttons0 = report.getUint8(4);
  let buttons1 = report.getUint8(5);
  let buttons2 = report.getUint8(6);
  let axes4 = report.getUint8(7);
  let axes5 = report.getUint8(8);

  let dpad = buttons0 & 0x0f;
  let up = normalizeButton(dpad == 0 || dpad == 1 || dpad == 7);
  let down = normalizeButton(dpad == 3 || dpad == 4 || dpad == 5);
  let left = normalizeButton(dpad == 5 || dpad == 6 || dpad == 7);
  let right = normalizeButton(dpad == 1 || dpad == 2 || dpad == 3);
  let square = normalizeButton(buttons0 & 0x10);
  let cross = normalizeButton(buttons0 & 0x20);
  let circle = normalizeButton(buttons0 & 0x40);
  let triangle = normalizeButton(buttons0 & 0x80);
  let l1 = normalizeButton(buttons1 & 0x01);
  let r1 = normalizeButton(buttons1 & 0x02);
  let l2 = normalizeTriggerAxis(buttons1 & 0x04);
  let r2 = normalizeTriggerAxis(buttons1 & 0x08);
  let create = normalizeButton(buttons1 & 0x10);
  let options = normalizeButton(buttons1 & 0x20);
  let l3 = normalizeButton(buttons1 & 0x40);
  let r3 = normalizeButton(buttons1 & 0x80);
  let ps = normalizeButton(buttons2 & 0x01);
  let touchpad = normalizeButton(buttons2 & 0x02);

  const reportData = {
    axes: [axes0, axes1, axes2, axes3, axes4, axes5],
    buttons: {square, cross, circle, triangle, l1, r1, create, options, l3, r3, ps, touchpad },
    directional: {dpad,up,down,left,right},
    trigger:{l2,r2},
  };

  eventEmitter.emit("bluetoothData", reportData);
  console.log(reportData);
  
}

export function handleBluetoothInputReport31(report) {

  if (report.byteLength !== DUAL_SENSE_BT_INPUT_REPORT_0x31_SIZE) {
    return;
  }

  // Leggi i dati dal report
  let axes0 = report.getUint8(1);
  let axes1 = report.getUint8(2);
  let axes2 = report.getUint8(3);
  let axes3 = report.getUint8(4);
  let axes4 = report.getUint8(5);
  let axes5 = report.getUint8(6);
  let buttons0 = report.getUint8(8);
  let buttons1 = report.getUint8(9);
  let buttons2 = report.getUint8(10);

  let lsx = normalizeThumbStickAxis(axes0);
	let lsy = normalizeThumbStickAxis(axes1);
	let rsx = normalizeThumbStickAxis(axes2);
	let rsy = normalizeThumbStickAxis(axes3);
  let l2axis = normalizeTriggerAxis(axes4);
  let r2axis = normalizeTriggerAxis(axes5);

  let dpad = buttons0 & 0x0f;
  let up = normalizeButton(dpad == 0 || dpad == 1 || dpad == 7);
  let down = normalizeButton(dpad == 3 || dpad == 4 || dpad == 5);
  let left = normalizeButton(dpad == 5 || dpad == 6 || dpad == 7);
  let right = normalizeButton(dpad == 1 || dpad == 2 || dpad == 3);
  let square = normalizeButton(buttons0 & 0x10);
  let cross = normalizeButton(buttons0 & 0x20);
  let circle = normalizeButton(buttons0 & 0x40);
  let triangle = normalizeButton(buttons0 & 0x80);
  let l1 = normalizeButton(buttons1 & 0x01);
  let r1 = normalizeButton(buttons1 & 0x02);
  let l2 = normalizeButton(buttons1 & 0x04);
  let r2 = normalizeButton(buttons1 & 0x08);
  let create = normalizeButton(buttons1 & 0x10);
  let options = normalizeButton(buttons1 & 0x20);
  let l3 = normalizeButton(buttons1 & 0x40);
  let r3 = normalizeButton(buttons1 & 0x80);
  let ps = normalizeButton(buttons2 & 0x01);
  let touchpad = normalizeButton(buttons2 & 0x02);

  const reportData = {
    axes: [lsx, lsy, rsx, rsy, l2axis, r2axis],
    buttons: { square, cross, circle, triangle, l1, r1, create, options, l3, r3, ps, touchpad },
    directional: { dpad, up, down, left, right },
    trigger: { l2, r2 },
  };

  // console.log("📡 Emitting bluetoothData:", reportData);
  eventEmitter.emit("bluetoothData", reportData);  
  // let touch0active = !(touch00 & 0x80);
  // let touch0id = (touch00 & 0x7F);
  // let touch0x = ((touch02 & 0x0F) << 8) | touch01;
  // let touch0y = (touch03 << 4) | ((touch02 & 0xF0) >> 4);
  // let touch1active = !(touch10 & 0x80);
  // let touch1id = (touch10 & 0x7F);
  // let touch1x = ((touch12 & 0x0F) << 8) | touch11;
  // let touch1y = (touch13 << 4) | ((touch12 & 0xF0) >> 4);

  // let gyrox = (gyroX1 << 8) | gyroX0;
  // if (gyrox > 0x7FFF) gyrox -= 0x10000;
  // let gyroy = (gyroY1 << 8) | gyroY0;
  // if (gyroy > 0x7FFF) gyroy -= 0x10000;
  // let gyroz = (gyroZ1 << 8) | gyroZ0;
  // if (gyroz > 0x7FFF) gyroz -= 0x10000;
  // let accelx = (accelX1 << 8) | accelX0;
  // if (accelx > 0x7FFF) accelx -= 0x10000;
  // let accely = (accelY1 << 8) | accelY0;
  // if (accely > 0x7FFF) accely -= 0x10000;
  // let accelz = (accelZ1 << 8) | accelZ0;
  // if (accelz > 0x7FFF) accelz -= 0x10000;

  // let batteryLevelPercent = (battery0 & 0x0f) * 100 / 8;
  // let batteryFull = !!(battery0 & 0x20);
  // let batteryCharging = !!(battery1 & 0x08);
}

export const requestDevice = async (setIsLinked) => {
    let requestOptions = {
      filters: [
        { vendorId: VENDOR_ID_SONY, productId: PRODUCT_ID_DUAL_SENSE,
          usagePage: USAGE_PAGE_GENERIC_DESKTOP, usage: USAGE_ID_GD_GAME_PAD },
      ]
    };
    let device;
    try {
      let devices = await navigator.hid.requestDevice(requestOptions);
      device = devices[0];
    } catch(e) {}
  
    if (!device)
      return;
  
    if (!device.opened) {
      await device.open();
      if (!device.opened) {
        console.log('Failed to open ' + device.productName);
        return;
      }
    }
    setIsLinked(true);
    console.log('Opened DualSense');
    window.dshid = new DualSenseHid(device);
    window.dshid.initialize();
  }
  