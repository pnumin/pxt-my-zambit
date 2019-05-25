// 여기에 코드를 추가하세요.
//% color=#222222 weight=110 icon="\uf121" block="zambit"
//% groups="['others', 'Fruits', 'Veggies']"

namespace zambit {
    //Registers (command) for MAX7219
    const _NOOP = 0 // no-op (do nothing, doesn't change current status)
    const _DIGIT = [1, 2, 3, 4, 5, 6, 7, 8] // digit (LED column)
    const _DECODEMODE = 9 // decode mode (1=on, 0-off; for 7-segment display on MAX7219, no usage here)
    const _INTENSITY = 10 // intensity (LED brightness level, 0-15)
    const _SCANLIMIT = 11 // scan limit (number of scanned digits)
    const _SHUTDOWN = 12 // turn on (1) or off (0)
    const _DISPLAYTEST = 15 // force all LEDs light up, no usage here

    let _pinCS = DigitalPin.P16 // LOAD pin, 0=ready to receive command, 1=command take effect
    let _matrixNum = 1 // number of MAX7219 matrix linked in the chain
    let _displayArray: number[] = [] // display array to show accross all matrixs
    let _rotation = 0 // rotate matrixs display for 4-in-1 modules
    let _reversed = false // reverse matrixs display order for 4-in-1 modules


    /**
    * Setup/reset MAX7219s. If you are using 4-in-1 module you'll need to set rotation as true. If your chain are consisted of single modules set it as false (default).
    */
    //% block="Setup MAX7219:|Number of matrixs $num|CS(LOAD) = $cs|MOSI(DIN) = $mosi|MISO(not used) = $miso|SCK(CLK) = $sck"
    //% num.min=1 num.defl=1 cs.defl=DigitalPin.P16 mosi.defl=DigitalPin.P15 miso.defl=DigitalPin.P14 sck.defl=DigitalPin.P13 rotate.defl=false group="1. Setup"
    export function setup(num: number, cs: DigitalPin, mosi: DigitalPin, miso: DigitalPin, sck: DigitalPin) {
        // set internal variables        
        _pinCS = cs
        _matrixNum = num
        // prepare display array (for displaying texts; add extra 8 columns at each side as buffers)
        for (let i = 0; i < (num + 2) * 8; i++)  _displayArray.push(0)
        // set micro:bit SPI
        pins.spiPins(mosi, miso, sck)
        pins.spiFormat(8, 3)
        pins.spiFrequency(1000000)
        // initialize MAX7219s
        _registerAll(_SHUTDOWN, 0) // turn off
        _registerAll(_DISPLAYTEST, 0) // test mode off
        _registerAll(_DECODEMODE, 0) // decode mode off
        _registerAll(_SCANLIMIT, 7) // set scan limit to 7 (column 0-7)
        _registerAll(_INTENSITY, 15) // set brightness to 15
        _registerAll(_SHUTDOWN, 1) // turn on
        clearAll() // clear screen on all MAX7219s
    }

    /**
    * (internal function) write command and data to all MAX7219s
    */
    function _registerAll(addressCode: number, data: number) {
        pins.digitalWritePin(_pinCS, 0) // LOAD=LOW, start to receive commands
        for (let i = 0; i < _matrixNum; i++) {
            // when a MAX7219 received a new command/data set
            // the previous one would be pushed to the next matrix along the chain via DOUT
            pins.spiWrite(addressCode) // command (8 bits)
            pins.spiWrite(data) //data (8 bits)
        }
        pins.digitalWritePin(_pinCS, 1) // LOAD=HIGH, commands take effect
    }

    /**
    * Turn off LEDs on all MAX7219s
    */
    //% block="Clear all LEDs" group="3. Basic light control"
    export function clearAll() {
        for (let i = 0; i < 8; i++) _registerAll(_DIGIT[i], 0)
    }



    //% block="zamPin x = $x"
    export function zamLed(x: string) {

        for (let idx = 0; idx < x.length; idx++) {
            if (x.charAt(idx) == '가') {
                zamLedShow(0);
            }
            else if (x.charAt(idx) == '나') {
                zamLedShow(1);
            }
            else if (x.charAt(idx) == '다') {
                zamLedShow(2);
            }
            basic.pause(1000)
            basic.clearScreen()
        }


    }

    function zamLedShow(x: number) {
        const matrix: number[][] = [[1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0]];
        let i = 0;
        let j = 0;

        for (let idx = 0; idx < 25; idx++) {
            if (matrix[x][idx] == 1) led.plot(i, j);
            i = i + 1;
            if (i % 5 == 0) {
                i = 0;
                j = j + 1;
            }
        }
    }

    //% block="zamPin x = $x"
    export function zamPin(x: number) {
        if (x == 4) {
            pins.digitalWritePin(DigitalPin.P4, 1)
        }
        else if (x == 5) {
            pins.digitalWritePin(DigitalPin.P5, 1)
        }
        else if (x == 6) {
            pins.digitalWritePin(DigitalPin.P6, 1)
        }
    }
    //% block="zamPinCheck x = $x"
    export function zamPinCheck(x: number): boolean {
        if (x == 4 && pins.digitalReadPin(DigitalPin.P4)) {
            return true
        }
        else if (x == 5 && pins.digitalReadPin(DigitalPin.P5)) {
            return true
        }
        else if (x == 6 && pins.digitalReadPin(DigitalPin.P6)) {
            return true
        }
        else return false


    }

    //% block
    export function helloZambit() {

        input.onButtonPressed(Button.A, function () {
            basic.showString("Zam")
        })

        input.onButtonPressed(Button.B, function () {
            basic.showString("bit")
        })

        input.onGesture(Gesture.Shake, function () {
            basic.showIcon(IconNames.Heart)
        })
    }

    //% block="helloZambitNum x = $x"
    export function helloZambitNum(x: number) {
        for (let i = 1; i <= x; i++) {
            basic.showString("Z" + i.toString())
        }
    }

}