//% color=#222222 weight=110 icon="\uf121" block="zambit"
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

}